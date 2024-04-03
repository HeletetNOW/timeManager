import Style from "./NavBar.module.css";
import tagIcon from "../../imgs/tag.svg";
import watchIcon from "../../imgs/watch.svg";
import projectIcon from "../../imgs/project.svg";
import settingIcon from "../../imgs/setting.svg";
import calendarIcon from "../../imgs/calendar.svg";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/timers", icon: watchIcon, name: "Таймеры" },
  { path: "/calendar", icon: calendarIcon, name: "Календарь" },
  { path: "/projects", icon: projectIcon, name: "Задачи" },
  { path: "/tags", icon: tagIcon, name: "Теги" },
  { path: "/settings", icon: settingIcon, name: "Настройки" },
];

type Props = {
  burgerForm: boolean;
  setBurgerForm: () => void;
};

export const NavBar = ({ burgerForm, setBurgerForm }: Props) => {
  const location = useLocation();

  return (
    <div
      className={
        burgerForm ? `${Style.navBar} ${Style.navBarActive}` : Style.navBar
      }
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          tabIndex={-1}
          className={`${Style.item} ${
            location.pathname === item.path ? Style.active : ""
          }`}
          onClick={setBurgerForm}
        >
          <div
            className={`${Style.link} ${
              location.pathname === item.path ? Style.active : ""
            }`}
            tabIndex={-1}
          >
            <img src={item.icon} alt="" />
          </div>
          {burgerForm ? <div className={Style.title}>{item.name}</div> : null}
        </Link>
      ))}
    </div>
  );
};
