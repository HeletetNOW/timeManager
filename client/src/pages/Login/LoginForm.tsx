import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import { loginAuth } from "../../store/auth/ActionCreators";

import Style from "./LoginForm.module.css";

import ShowPassword from "../../imgs/showPassword.svg";
import NoShowPassword from "../../imgs/NoShowPassword.svg";

import logo from "../../imgs/logo.png";

type FormValue = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.authReducer);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur" });

  if (userInfo) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data: FormValue) => {
    try {
      const response = await dispatch(loginAuth(data.email, data.password));

      if (response?.status === 200) {
        navigate("/");
      } else {
        setError(response?.data.message);
      }
    } catch (error: any) {
      setError(error.data.message);
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <div className={Style.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={Style.link}>
          Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </div>
      </div>
      <form className={Style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={Style.title}>Вход</div>
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
          <div className={Style.error}>
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
          <div className={Style.error}>
            {errors && errors.password && errors.password.message}
          </div>
        </div>
        <div className={Style.wrapperButton}>
          <button className={Style.button} type="submit">
            Войти
          </button>
        </div>
        {error}
      </form>
    </div>
  );
};
