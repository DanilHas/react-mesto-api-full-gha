import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onConfirm,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  const listItems = cards.map((card) => {
    return (
      <li className="card" key={card._id}>
        <Card
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onConfirm={onConfirm}
        />
      </li>
    );
  });

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-info-container">
            <button
              type="button"
              className="profile__avatar-button"
              aria-label="изменения аватара"
              onClick={onEditAvatar}
            >
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="Аватар пользователя"
              />
            </button>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="редактирования профиля"
                onClick={onEditProfile}
              />
              <p className="profile__about-yourself">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавления фотографии"
            onClick={onAddPlace}
          />
        </section>
        <section className="cards" aria-label="Фотографии пользователя">
          <ul className="cards__list">{listItems}</ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Main;
