import { useEffect } from 'react';

function PopupWithForm({
  name,
  title,
  submitButtonTitle,
  submitButtonDescription,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoading,
  onChange,
  isValid,
}) {
  const closePopupByClickOnEsc = (event) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  const closePopupByClickOutside = (event) => {
    if (event.target.classList.contains('popup_opened') && isOpen) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closePopupByClickOnEsc);

      return () =>
        document.removeEventListener('keydown', closePopupByClickOnEsc);
    }
  }, [isOpen]);

  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ''} `}
      onMouseDown={closePopupByClickOutside}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрытия модального окна"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className="form"
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
          onChange={onChange}
        >
          {children}
          <button
            type="submit"
            className={`form__submit-button ${
              !isValid ? 'form__submit-button_disabled' : ''
            }`}
            disabled={!isValid}
            aria-label={submitButtonDescription}
          >
            <span
              className={isLoading ? 'form__spinner' : 'form__spinner_hide'}
            ></span>
            {isLoading ? '' : submitButtonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
