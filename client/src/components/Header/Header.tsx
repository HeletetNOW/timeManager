import { ReactNode, useState } from "react";
import Style from "./Header.module.css";
import { NavBar } from "../NavBar/NavBar";
import { authAPI } from "../../app/api/authAPI";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { currentAuth } from "../../store/auth/ActionCreators";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const Header = ({ children }: Props) => {
  const [burgerForm, setBurgerForm] = useState(false);
  const { userInfo } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const burgerStye = burgerForm
    ? `${Style.burger} ${Style.burger_active}`
    : `${Style.burger}`;

  const windowWidth = window.innerWidth;

  const logoutButton = async () => {
    await authAPI.logout();
    dispatch(currentAuth());
  };

  if (userInfo === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <div onClick={() => setBurgerForm(!burgerForm)} className={burgerStye}>
          <span className={Style.burger_lines}></span>
        </div>
        <div onClick={logoutButton} className={Style.logout}>
          Выйти
        </div>
      </div>
      <div className={Style.main}>
        <NavBar
          burgerForm={burgerForm}
          setBurgerForm={
            windowWidth > 1000 ? () => {} : () => setBurgerForm(false)
          }
        />
        <div className={Style.children}>{children}</div>
      </div>
    </div>
  );
};
