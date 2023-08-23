import { useEffect } from 'react';

function InfoTooltip({ isOpen, onClose, data }) {
  const { src, alt, title } = data;

  const closePopupByClickOutside = (event) => {
    if (event.target.classList.contains('popup_opened') && isOpen) {
      onClose();
    }
  };

  const closePopupByClickOnEsc = (event) => {
    if (event.key === 'Escape' && isOpen) {
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
      className={`popup ${isOpen ? `popup_opened` : ''} `}
      onMouseDown={closePopupByClickOutside}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="закрытия модального окна"
          onClick={onClose}
        />
        <img src={src} alt={alt} className="popup__auth-image" />
        <h2 className="popup__title popup__title_place_auth">{title}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
