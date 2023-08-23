import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useCheckValidation from '../hooks/useCheckValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [validation, handleValidation, setErrorMessage, setValid] =
    useCheckValidation();

  const { isInputValid, errorMessage, isValid } = validation;

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({
      name,
      link,
    });
  };

  useEffect(() => {
    setName('');
    setLink('');
    setErrorMessage({});
    setValid(false);
  }, [isOpen, setErrorMessage, setValid]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeLink = (event) => {
    setLink(event.target.value);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      submitButtonTitle="Создать"
      submitButtonDescription="создания новой карточки"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onChange={handleValidation}
      isValid={isValid}
    >
      <fieldset className="form__user-data">
        <input
          type="text"
          name="name"
          required
          placeholder="Название"
          className="form__input form__input_name_place"
          id="place-input"
          minLength={2}
          maxLength={30}
          onChange={handleChangeName}
          value={name}
        />
        <span
          className={`form__input-error ${
            !isInputValid.name ? 'form__input-error_visible' : ''
          }`}
        >
          {errorMessage.name}
        </span>
        <input
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          className="form__input form__input_name_image-link"
          id="image-link-input"
          onChange={handleChangeLink}
          value={link}
        />
        <span
          className={`form__input-error ${
            !isInputValid.link ? 'form__input-error_visible' : ''
          }`}
        >
          {errorMessage.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
