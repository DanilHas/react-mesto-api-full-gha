import { Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function InitialHeader({ linkTo, linkTitle }) {
  return (
    <header className="header">
      <Link to="/signin">
        <img
          className="header__logo"
          src={headerLogo}
          id="logo"
          alt="Логотип 'Место'"
        />
      </Link>
      <Link className="link" to={linkTo}>
        {linkTitle}
      </Link>
    </header>
  );
}

export default InitialHeader;
