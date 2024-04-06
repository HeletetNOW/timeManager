import Style from "./DropElement.module.css";

type Props = {
  handlerSetSelected: (value: boolean) => void;
  name: string;
  isConnected: boolean;
};

export const DropElementForProjectsOrTags = ({
  handlerSetSelected,
  name,
  isConnected,
}: Props) => {
  return (
    <div className={Style.item}>
      <div>
        <input
          type="checkbox"
          defaultChecked={isConnected}
          onChange={() => handlerSetSelected(!isConnected)}
        />
        {name}
      </div>
    </div>
  );
};
