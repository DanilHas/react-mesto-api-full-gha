import { Route, Routes } from 'react-router-dom';
import MainPageHeader from './MainPageHeader';
import InitialHeader from './InitialHeader';

function Header({ userData, setLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/signin"
        element={<InitialHeader linkTo="/signup" linkTitle="Регистрация" />}
      />
      <Route
        path="/signup"
        element={<InitialHeader linkTo="/signin" linkTitle="Войти" />}
      />
      <Route
        path="/"
        element={
          <MainPageHeader userData={userData} setLoggedIn={setLoggedIn} />
        }
      />
    </Routes>
  );
}

export default Header;
