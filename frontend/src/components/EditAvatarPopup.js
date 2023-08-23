import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useCheckValidation from '../hooks/useCheckValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef();

  const [validation, handleValidation, setErrorMessage, setValid] =
    useCheckValidation();

  const { isInputValid, errorMessage, isValid } = validation;

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  useEffect(() => {
    inputRef.current.value = '';
    setErrorMessage({});
    setValid(false);
  }, [isOpen, setErrorMessage, setValid]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      submitButtonTitle="Сохранить"
      submitButtonDescription="сохранения аватара"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onChange={handleValidation}
      isValid={isValid}
    >
      <fieldset className="form__user-data">
        <input
          type="url"
          name="avatar"
          required
          placeholder="Ссылка на картинку"
          className="form__input form__input_name_avatar-link"
          id="avatar-link-input"
          ref={inputRef}
        />
        <span
          className={`form__input-error ${
            !isInputValid.avatar ? 'form__input-error_visible' : ''
          }`}
        >
          {errorMessage.avatar}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
