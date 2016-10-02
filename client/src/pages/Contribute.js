import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import animatedScrollTo from 'animated-scrollto';
import PageHeader from '../components/PageHeader';
import Container from '../components/Container';
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
    submitEnabled: false
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
      return;
    }

    try {
      const result = await postJSON(
        '/api/contribute', {
          amount: sanitizedAmount,
          type: selectedOption,
          token: { id: stripeResult.id, email: stripeResult.email }
      });

      if (result.success) {
        // TODO:
      }
    } catch (err) {
      // TODO:
    }
  }

  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      // This clamping should really be built in to the scroll library!
      const maxScrollTop = document.body.scrollHeight - window.innerHeight;
      const submitTop = this._submitRef.getBoundingClientRect().top;
      const targetScroll = Math.min(submitTop, maxScrollTop);

      animatedScrollTo(document.body, targetScroll, 1000, () => {
        findDOMNode(this._inputRef).focus();
      });
    });
  }

  renderAmount() {
    const { amount, submitEnabled } = this.state;
    return (
      <div className="Contribute-section">
        <div className="Contribute-message">
          Awesome! How much would you like to give?
        </div>
        <div className="Contribute-options">
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
          <button 
            className={cx(
              'Contribute-submit',
              !submitEnabled ? 'Contribute-submit--disabled' : ''
            )}
            ref={(el) => this._submitRef = el}
            onClick={this.onSubmit}>
            Submit
          </button>
        </div>
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

  render() {
    return (
      <div>
        <PageHeader 
          headline="Contribute" 
          text="Zehut is funded entirely by its community. Thanks for contributing to SF’s jewish future."
        />
        <Container size="md">
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
        </Container>
      </div>
    );
  }
}

export default Contribute;
