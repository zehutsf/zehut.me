import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import Container from './Container';
import '../styles/components/Navbar.scss';

const NAV_ITEMS = [
  // { title: 'Events', to: '/events' },
  // { title: 'About', to: '/about' },
  { title: 'Contribute', to: '/contribute', highlight: true }
];

const renderNavItem = ({ title, to, highlight }) => (
  <Link 
    to={to} 
    key={to}
    className={cx(
      'Navbar-navItem',
      highlight ? 'Navbar-navItem--highlight' : ''
    )}>
    <div className='Navbar-navItem-inner'>
      {title}
    </div>
  </Link>
);

const renderNav = () => (
  <div className="Navbar-nav">
    {NAV_ITEMS.map(renderNavItem)}
  </div>
);

const Navbar = ({ home }) => (
  <div className={cx({
    'Navbar-bar': true,
    'Navbar-bar--home': home
  })}>
    <Container size="lg">
      <Link to="/" className="Navbar-logo">Zehut!</Link>
      {renderNav()}
    </Container>
  </div>
);

export default Navbar;
