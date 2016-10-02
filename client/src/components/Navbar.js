import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import Container from './Container';
import '../styles/components/Navbar.scss';

const NAV_ITEMS = [
  { title: 'Events', to: '/events' },
  { title: 'About', to: '/about' },
  { title: 'Contribute', to: '/contribute' }
];

const renderNavItem = ({ title, to }) => (
  <Link to={to} key={to} activeOnlyWhenExact className="Navbar-navItem">{title}</Link>
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
