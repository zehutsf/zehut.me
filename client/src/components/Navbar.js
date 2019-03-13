import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import cx from 'classnames';
import { Link } from 'react-router';
import Container from './Container';
import VCContainer from './VCContainer';

import '../styles/components/Navbar.scss';

let NAV_ITEMS = null;
const _constructNavItems = () => {
  NAV_ITEMS = [
    // { title: 'Events', to: '/events' },
    { title: 'About', to: '/about' },
    // { title: 'Live', to: '/academy' },
    { title: 'Connect', key: 'connect', href: getConfig().MAILCHIMP_URL }
  ];
};

const CONTRIBUTE_ITEM = { 
  title: 'Contribute', 
  to: '/contribute', 
  highlight: true,
};

const NavItem = ({ title, key, to, href, highlight, onClick }) => {
  const NavType = to ? Link : 'a';
  return (
    <NavType 
      to={to} 
      href={href}
      key={key || to}
      onClick={onClick}
      className={cx(
        'Navbar-navItem',
        highlight ? 'Navbar-navItem--highlight' : ''
      )}>
      <div className="Navbar-navItem-inner">
        {title}
      </div>
    </NavType>
  );
};

class Navbar extends Component {
  static propTypes = {
    home: PropTypes.bool
  };

  constructor() {
    super();
    this.state = { menuOpen: false };
  }

  onToggle = (event) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  renderModalMenu() {
    if (!this.state.menuOpen) {
      return;
    }

    return (
      <Modal
        isOpen
        onRequestClose={this.onToggle}
        overlayClassName="Navbar-modalOverlay"
        className='Navbar-modalContent'>
        <VCContainer>
          <div className="Navbar-modalNav">
            {NAV_ITEMS.map(item => (
              <NavItem {...item} onClick={this.onItemClick}/>
            ))}
            <NavItem {...CONTRIBUTE_ITEM} onClick={this.onItemClick} />
          </div>
        </VCContainer>
        <div>
          <Link to="/" className="Navbar-logo">Zehut!</Link>
          <div className="Navbar-navClose">
            <NavItem onClick={this.onToggle} href="#" title="CLOSE" />
          </div>
        </div>
      </Modal>
    );
  }

  onItemClick = () => {
    this.setState({ menuOpen: false });
  }

  renderNav() {
    return (
      <div className="Navbar-nav" >
        <div className="Navbar-navItems">
          {NAV_ITEMS.map(item => <NavItem {...item}/>)}
          <NavItem {...CONTRIBUTE_ITEM}/>
        </div>
        <div className="Navbar-navToggle">
          <NavItem href="#" onClick={this.onToggle} title="MENU"/>
          <NavItem {...CONTRIBUTE_ITEM} onClick={this.onItemClick}/>
        </div>
      </div>
    );
  }

  render() {
    const { home } = this.props;
    return (
      <div className={cx({
        'Navbar-bar': true,
        'Navbar-bar--home': home
      })}>
        <Container size="lg">
          {/*<Link to="/" className="Navbar-logo">Zehut!</Link>*/}
          {this.renderNav()}
        </Container>
        {this.renderModalMenu()}
      </div>
    );
  }
}

export default Navbar;
