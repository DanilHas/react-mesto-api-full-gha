import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth';
import useCheckValidation from '../hooks/useCheckValidation';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function Register({ setInfoTooltipOpen, setInfoTooltipData }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [isLoadingRegister, setLoadingRegister] = useState(false);

  const navigate = useNavigate();

  const { email, password } = formValues;

  const [validation, handleValidation] = useCheckValidation();

  const { isInputValid, errorMessage, isValid } = validation;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingRegister(true);

    auth
      .register(email, password)
      .then((res) => {
        setFormValues({
          email: '',
          password: '',
        });
        setInfoTooltipOpen(true);
        setInfoTooltipData({
          src: success,
          alt: 'Изображение успешной аутентификации',
          title: 'Вы успешно зарегистрировались!',
        });
        navigate('/signin', { replace: true });
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setInfoTooltipData({
          src: fail,
          alt: 'Изображение ошибки при аутентификации',
          title: 'Что-то пошло не так! Попробуйте еще раз.',
        });
        console.error(`${err} ${err.message}`);
      })
      .finally(() => setLoadingRegister(false));
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form
          className="form form_type_auth"
          noValidate
          onSubmit={handleSubmit}
          onChange={handleValidation}
        >
          <fieldset className="form__user-data form__user-data_type_auth">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="form__input form__input_type_auth"
              id="email-input"
              onChange={handleChange}
              value={email}
            />
            <span
              className={`form__input-error ${
                !isInputValid.email ? 'form__input-error_visible' : ''
              }`}
            >
              {errorMessage.email}
            </span>
            <input
              type="password"
              name="password"
              required
              placeholder="Пароль"
              className="form__input form__input_type_auth"
              id="password-input"
              onChange={handleChange}
              value={password}
              minLength={6}
            />
            <span
              className={`form__input-error ${
                !isInputValid.password ? 'form__input-error_visible' : ''
              }`}
            >
              {errorMessage.password}
            </span>
          </fieldset>
          <button
            type="submit"
            className={`form__submit-button form__submit-button_type_auth ${
              !isValid ? 'form__submit-button_disabled' : ''
            }`}
            disabled={!isValid}
            aria-label="регистрации пользователя"
          >
            <span
              className={
                isLoadingRegister
                  ? 'form__spinner form__spinner_type_auth'
                  : 'form__spinner_hide'
              }
            ></span>
            {isLoadingRegister ? '' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className="auth__text">
          Уже зарегистрированы?{' '}
          <Link className="link link_place_register" to="/signin">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
