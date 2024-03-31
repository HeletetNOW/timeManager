import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./pages/Login/LoginForm";
import { RegisterForm } from "./pages/Register/RegisterForm";
import { MainPage } from "./pages/MainPage/MainPage";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect } from "react";
import { currentAuth } from "./store/auth/ActionCreators";

export const App = () => {
  const { isFetching } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentAuth());
  }, [dispatch]);

  if (isFetching) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </div>
  );
};
