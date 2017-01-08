import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import Container from './Container';
import '../styles/components/Navbar.scss';

const NAV_ITEMS = [
  // { title: 'Events', to: '/events' },
  // { title: 'About', to: '/about' },
  { title: 'Contact', href: 'mailto:rabbi@zehut.me' },
  { title: 'Live', to: '/academy' },
  { title: 'Contribute', to: '/contribute', highlight: true }
];

const renderNavItem = ({ title, to, href, highlight }) => {
  const NavType = href ? 'a' : Link;
  return (
    <NavType 
      to={to} 
      href={href}
      key={to}
      className={cx(
        'Navbar-navItem',
        highlight ? 'Navbar-navItem--highlight' : ''
      )}>
      <div className='Navbar-navItem-inner'>
        {title}
      </div>
    </NavType>
  );
};

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
