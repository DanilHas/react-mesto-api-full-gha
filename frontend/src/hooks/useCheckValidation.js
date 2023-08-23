import { useState } from 'react';

function useCheckValidation() {
  const [isInputValid, setInputValid] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [isValid, setValid] = useState(false);

  const handleCheckValidation = (e) => {
    const valid = e.target.validity.valid;
    const error = e.target.validationMessage;
    const form = e.target.form;
    const name = e.target.name;

    setInputValid((prevState) => ({ ...prevState, [name]: valid }));
    setErrorMessage((prevState) => ({ ...prevState, [name]: error }));
    setValid(form.checkValidity());
  };

  return [
    { isInputValid, errorMessage, isValid },
    handleCheckValidation,
    setErrorMessage,
    setValid,
  ];
}

export default useCheckValidation;
