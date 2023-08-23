import { useEffect, useState } from 'react';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import Header from './Header';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingConfirmPopup, setLoadingConfirmPopup] = useState(false);
  const [isLoadingEditProfilePopup, setLoadingEditProfilePopup] =
    useState(false);
  const [isLoadingEditAvatarPopup, setLoadingEditAvatarPopup] = useState(false);
  const [isLoadingAddPlacePopup, setLoadingAddPlacePopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipData, setInfoTooltipData] = useState({
    src: '',
    alt: '',
    title: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.error(`${err} ${err.message}`);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .renderInitialData()
        .then((result) => {
          const [initialUserInfo, initialCards] = result;

          setCurrentUser(initialUserInfo);
          setCards(initialCards);
        })
        .catch((err) => console.error(`${err} ${err.message}`));
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (item) => {
    setSelectedCard(item);
    setImagePopupOpen(true);
  };

  const handleConfirmClick = (item) => {
    setSelectedCard(item);
    setConfirmPopupOpen(true);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(`${err} ${err.message}`));
  };

  const handleCardDelete = (card) => {
    setLoadingConfirmPopup(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoadingConfirmPopup(false));
  };

  const handleUpdateUser = (newUserInfo) => {
    setLoadingEditProfilePopup(true);
    api
      .setUserInfo(newUserInfo)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoadingEditProfilePopup(false));
  };

  const handleUpdateAvatar = (newAvatar) => {
    setLoadingEditAvatarPopup(true);
    api
      .changeAvatar(newAvatar.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoadingEditAvatarPopup(false));
  };

  const handleAddPlaceSubmit = (newPlace) => {
    setLoadingAddPlacePopup(true);
    api
      .addNewCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`${err} ${err.message}`))
      .finally(() => setLoadingAddPlacePopup(false));
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userData={userEmail} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onConfirm={handleConfirmClick}
                  cards={cards}
                />
              }
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              setInfoTooltipOpen={setInfoTooltipOpen}
              setInfoTooltipData={setInfoTooltipData}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              handleLogin={handleLogin}
              setInfoTooltipOpen={setInfoTooltipOpen}
              setInfoTooltipData={setInfoTooltipData}
              setUserEmail={setUserEmail}
            />
          }
        />
        <Route
          path="*"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoadingEditProfilePopup}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoadingAddPlacePopup}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoadingEditAvatarPopup}
      />
      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
        onCardDelete={handleCardDelete}
        isLoading={isLoadingConfirmPopup}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        data={infoTooltipData}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
