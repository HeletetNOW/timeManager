import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import { registerAuth } from "../../store/auth/ActionCreators";

import Style from "./RegisterForm.module.css";

import ShowPassword from "../../imgs/showPassword.svg";
import NoShowPassword from "../../imgs/NoShowPassword.svg";
import { Loader } from "../../components/Loader/Loader";

type FormValue = {
  email: string;
  password: string;
  name: string;
  surname: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const [isVisibleLoader, setVisibleLoader] = useState(true);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { userInfo, isFetching } = useAppSelector((state) => state.authReducer);
  const stateError = useAppSelector((state) => state.authReducer.error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValue>({ mode: "onBlur" });

  if (userInfo) {
    return <Navigate to="/" />;
  }

  const password = watch("password");

  const onSubmit = async (data: FormValue) => {
    try {
      const response = await dispatch(
        registerAuth(data.name, data.surname, data.email, data.password)
      );

      if (response?.status === 200) {
        navigate("/");
      }

      setError(response?.data.message);
    } catch (error: any) {
      setError(error.data.message);
    }
  };

  return isVisibleLoader ? (
    <Loader
      isFetching={isFetching}
      setVisible={setVisibleLoader}
      isVisible={isVisibleLoader}
    />
  ) : (
    <div className={Style.container}>
      <div className={Style.header}>
        <div className={Style.logo}>logo</div>
        <div className={Style.link}>
          Уже есть аккаунт? <Link to="/login">Войдите</Link>
        </div>
      </div>
      <form className={Style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={Style.title}>Регистрация</div>
        <div className={Style.wrapperInput}>
          <div className={Style.input}>
            <input
              id="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Введите имя",
                },
              })}
              placeholder="Введите имя"
              type="text"
            />
          </div>
          <div className={Style.wrapperError}>
            {errors && errors.name && errors.name.message}
          </div>
        </div>
        <div className={Style.wrapperInput}>
          <div className={Style.input}>
            <input
              id="surname"
              {...register("surname", {
                required: {
                  value: true,
                  message: "Введите фамилию",
                },
              })}
              placeholder="Введите фамилию"
              type="text"
            />
          </div>
          <div className={Style.wrapperError}>
            {errors && errors.surname && errors.surname.message}
          </div>
        </div>
        <div className={Style.wrapperInput}>
          <div className={Style.input}>
            <input
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Введите email",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Неверный формат email",
                },
              })}
              placeholder="Введите email"
              type="text"
            />
          </div>
          <div className={Style.wrapperError}>
            {errors && errors.email && errors.email.message}
          </div>
        </div>
        <div className={Style.wrapperInput}>
          <div className={Style.input}>
            <input
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Введите пароль",
                },
              })}
              placeholder="Введите пароль"
              type={showPassword ? "text" : "password"}
            />
            <div onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <img src={ShowPassword} alt="" />
              ) : (
                <img src={NoShowPassword} alt="" />
              )}
            </div>
          </div>
          <div className={Style.wrapperError}>
            {errors && errors.password && errors.password.message}
          </div>
        </div>
        <div className={Style.wrapperInput}>
          <div className={Style.input}>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Подтвердите пароль",
                },
                validate: (value) =>
                  value === password || "Пароли должны совпадать",
              })}
              placeholder="Подтвердите пароль"
              type={showConfirmPassword ? "text" : "password"}
            />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <img src={ShowPassword} alt="" />
              ) : (
                <img src={NoShowPassword} alt="" />
              )}
            </div>
          </div>
          <div className={Style.wrapperError}>
            {errors && errors.confirmPassword && errors.confirmPassword.message}
          </div>
        </div>
        <div className={Style.wrapperButton}>
          <button className={Style.button} type="submit">
            Зарегистрироваться
          </button>
        </div>
        <div className={Style.error}>{error || stateError}</div>
      </form>
    </div>
  );
};
