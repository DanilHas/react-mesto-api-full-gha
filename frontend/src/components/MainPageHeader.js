import { Link, useNavigate } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';
import { useState } from 'react';

function MainPageHeader({ userData, setLoggedIn }) {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBurgerButtonClick = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/signin', { replace: true });
  };

  return (
    <header className={`header ${isBurgerMenuOpen ? 'header_active' : ''}`}>
      <Link to="/">
        <img
          className="header__logo"
          src={headerLogo}
          id="logo"
          alt="Логотип 'Место'"
        />
      </Link>
      <div
        className={`header__container ${
          isBurgerMenuOpen ? 'header__container_active' : ''
        }`}
      >
        <p className="header__user-data">{userData}</p>
        <Link className="link link_place_main-page" onClick={handleSignOut}>
          Выйти
        </Link>
      </div>
      <button
        className={`header__burger ${
          isBurgerMenuOpen ? 'header__burger_active' : ''
        }`}
        aria-label="Открыть меню"
        aria-expanded="false"
        onClick={handleBurgerButtonClick}
      >
        <span
          className={`header__burger-line ${
            isBurgerMenuOpen ? 'header__burger-line_active' : ''
          }`}
        ></span>
      </button>
    </header>
  );
}

export default MainPageHeader;
