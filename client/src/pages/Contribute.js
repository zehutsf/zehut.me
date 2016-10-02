import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import animatedScrollTo from 'animated-scrollto';
import PageHeader from '../components/PageHeader';
import Container from '../components/Container';
import VCContainer from '../components/VCContainer';
import LoadingAnimation from '../components/LoadingAnimation';
import { open as openCheckout } from '../utils/stripe';
import postJSON from '../utils/postJSON';
import '../styles/pages/Contribute.scss';

const OPTION_TYPE_MONTHLY = 'monthly';
const OPTION_TYPE_ONE_TIME = 'one-time';
const DESCRIPTIONS = {
  [OPTION_TYPE_MONTHLY]: 'Monthly contribution',
  [OPTION_TYPE_ONE_TIME]: 'One-time contribution'
};

// Given text input value, return value in cents (or null if invalid)
const sanitizeAmount = (amount) => {
  let sanitizedAmount = parseFloat(amount);
  if (isNaN(sanitizedAmount)) {
    return null;
  }

  return sanitizedAmount * 100;
};

class Contribute extends Component {
  state = { 
    selectedOption: null, 
    amount: '', 
    submitEnabled: false,
    isSubmitting: false,
    complete: false
  };

  onAmountChange = (event) => {
    const amount = event.target.value;
    const submitEnabled = !!sanitizeAmount(amount);
    this.setState({ amount, submitEnabled });
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { amount, selectedOption, submitEnabled } = this.state;

    if (!submitEnabled) {
      return;
    }

    const sanitizedAmount = sanitizeAmount(amount);
    if (!sanitizedAmount) {
      return;
    }    

    const stripeResult = await openCheckout({
      amount: sanitizedAmount,
      name: 'Zehut!',
      description: DESCRIPTIONS[selectedOption]
    });

    // Closed
    if (!stripeResult) {
      this.setState({ isSubmitting: false });
      return;
    }

    this.setState({ isSubmitting: true });

    try {
      const result = await postJSON(
        '/api/contribute', {
          amount: sanitizedAmount,
          type: selectedOption,
          token: { id: stripeResult.id, email: stripeResult.email }
      });

      this.setState({ complete: !!result.success, isSubmitting: false });
      
    } catch (err) {
      this.setState({ isSubmitting: false });
    }
  }

  animateToAndFocusInput = () => {
    // This clamping should really be built in to the scroll library!
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const submitTop = this._submitRef.getBoundingClientRect().top;
    const targetScroll = Math.min(submitTop, maxScrollTop);
    const inputNode = findDOMNode(this._inputRef);

    if (Math.abs(document.body.scrollTop - targetScroll) < 10) {
      // Immediately focus input if already scrolled to bottom
      inputNode.focus();
    } else {
      animatedScrollTo(document.body, targetScroll, 750, () => inputNode.focus());
    }
  }

  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption });
    setTimeout(this.animateToAndFocusInput, 0);
  }

  renderSubmit() {
    const { submitEnabled, isSubmitting } = this.state;
    const submitInner = isSubmitting ? (
      <LoadingAnimation light />
    ) : 'Submit';

    return (
      <button 
        className={cx(
          'Contribute-submit',
          !submitEnabled ? 'Contribute-submit--disabled' : ''
        )}
        ref={(el) => this._submitRef = el}
        onClick={this.onSubmit}>
        {submitInner}
      </button>
    );
  }

  renderAmount() {
    const { amount } = this.state;
    return (
      <div className="Contribute-section">
        <div className="Contribute-message">
          Awesome! How much would you like to give?
        </div>
        <div className="Contribute-amount">
          <div className="Contribute-amountInput">
            <input 
              ref={(el) => this._inputRef = el}
              value={amount}
              onChange={this.onAmountChange}
              className="Contribute-amountInput-input" 
              type="text" 
              placeholder="Amount" />
          </div>
        </div>
        {this.renderSubmit()}
      </div>
    );
  }

  renderOption(text, type) {
    return (
      <button 
          className={cx(
            'Contribute-optionItem', 
            type === this.state.selectedOption ? 'Contribute-optionItem--selected' : null
          )}
          onClick={() => this.onSelectOption(type)}
          >
          <div className="Contribute-optionItem-inner">{text}</div>
      </button>
    );
  }

  renderComplete() {
    return (
      <div className="Contribute-complete">
        <VCContainer>
          <Container size="md">
            <h2 className="Contribute-complete-headline">Amazing.</h2>
            <p className="Contribute-complete-text">
              Thank you so much for your contribution. If you have any questions, please get in touch at&nbsp;
              <a href="mailto:peretz@zehut.me">peretz@zehut.me</a>.
            </p>
          </Container>
        </VCContainer>
      </div>
    )
  }

  render() {
    const { isSubmitting, complete } = this.state;

    if (complete) {
      return this.renderComplete();
    }

    return (
      <div>
        <PageHeader 
          headline="Contribute" 
          text="Zehut is funded entirely by its community. Thanks for contributing to SF’s Jewish future."
        />
        <Container size="md" className={isSubmitting ? 'Contribute--isSubmitting' : ''}>
          <div className="Contribute-content">
            <div className="Contribute-section">
              <div className="Contribute-message">
                What kind of contribution would you like to make?
              </div>
              <div className="Contribute-options">
                {this.renderOption('Monthly', OPTION_TYPE_MONTHLY)}
                {this.renderOption('One-time', OPTION_TYPE_ONE_TIME)}
              </div>
            </div>
            {this.state.selectedOption && this.renderAmount()}
          </div>
        </Container>
        <div className="Contribute-overlay"/>
      </div>
    );
  }
}

export default Contribute;
