import Style from "./DropElement.module.css";

type Props = {
  handlerSetSelected: (value: boolean) => void;
  name: string;
  isConnected: boolean;
};

export const DropElement = ({
  handlerSetSelected,
  name,
  isConnected,
}: Props) => {
  return (
    <div className={Style.item}>
      <input
        type="checkbox"
        defaultChecked={isConnected}
        onChange={() => handlerSetSelected(!isConnected)}
      />
      <div>{name}</div>
    </div>
  );
};
