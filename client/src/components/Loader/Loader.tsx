import { useEffect, useState } from "react";

import logo from "../../imgs/logo.svg";
import Style from "./Loader.module.css";

type Props = {
  isFetching: boolean;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
};

export const Loader = ({ isFetching, setVisible, isVisible }: Props) => {
  const [isAnimate, setAnimate] = useState(isFetching);

  useEffect(() => {
    setAnimate(isFetching);
  }, [isFetching]);
  let loaderStyle = ` ${isAnimate ? Style.infAnimate : Style.oneAnimate} ${
    Style.loader
  }`;

  const handlerEndAnimation = () => {
    setVisible(false);
  };

  return isVisible ? (
    <div className={Style.container} onAnimationEnd={handlerEndAnimation}>
      <div className={loaderStyle}>
        <img src={logo} alt="" />
      </div>
    </div>
  ) : (
    <></>
  );
};
