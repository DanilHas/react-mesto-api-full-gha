import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, card, onCardDelete, isLoading }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    onCardDelete(card);
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      submitButtonTitle="Да"
      submitButtonDescription="подтверждения действия"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={true}
    />
  );
}

export default ConfirmPopup;
