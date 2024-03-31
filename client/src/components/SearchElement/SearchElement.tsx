import SearchIcon from "../../imgs/SearchIcon.svg";
import Style from "./SearchElement.module.css";

type Props = {
  inputTitle: string;
  inputValue: string;
  onChangeInput: (value: string) => void;
  onSubmitInput: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const SearchElement = ({
  inputTitle,
  inputValue,
  onChangeInput,
  onSubmitInput,
}: Props) => {
  return (
    <form onSubmit={onSubmitInput} className={Style.form}>
      <input
        value={inputValue}
        onChange={(value) => onChangeInput(value.target.value)}
        className={Style.input}
        type="text"
        placeholder={inputTitle}
      />
      <button className={Style.button}>
        <img src={SearchIcon} alt="Search" className="search-icon" />
      </button>
    </form>
  );
};
