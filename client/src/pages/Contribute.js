import React, { Component } from 'react';
import cx from 'classnames';
import PageHeader from '../components/PageHeader';
import Container from '../components/Container';
// import { open as openCheckout } from '../utils/stripe';
import '../styles/pages/Contribute.scss';

const OPTION_TYPE_MONTHLY = 1;
const OPTION_TYPE_ONE_TIME = 2;

class Contribute extends Component {
  state = { selectedOption: null };

  renderAmount() {
    return (
      <div className="Contribute-section">
        <div className="Contribute-message">
          Awesome! How much would you like to give?
        </div>
        <div className="Contribute-options">
          <div className="Contribute-amount">
            <div className="Contribute-amountInput">
              <input className="Contribute-amountInput-input" type="text"  placeholder="Amount" />
            </div>
          </div>
          <button className="Contribute-submit">Submit</button>
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
          onClick={() => this.setState({ selectedOption: type })}
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
