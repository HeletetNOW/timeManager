import { useAppDispatch } from "../../../hooks/hooks";
import { getTags, setOrder } from "../../../store/tags/ActionCreators";
import Style from "./TagsTable.module.css";

import sortArrowUp from "../../../imgs/sortArrowUp.svg";
import sortArrowDown from "../../../imgs/sortArrowDown.svg";
import { SearchElement } from "../../SearchElement/SearchElement";
import { tagsSlice } from "../../../store/tags/TagsSlice";
import React from "react";

type Props = {
  order: "desc" | "asc";
  currentSearchTag: string;
};

export const TagsTable = React.memo(({ order, currentSearchTag }: Props) => {
  const dispatch = useAppDispatch();

  const setInputValue = (value: string) => {
    dispatch(tagsSlice.actions.setCurrentSearchTag(value));
  };

  const onSubmitInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.blur();
    dispatch(getTags());
  };

  const toggleSortOrder = () => {
    dispatch(setOrder());
  };
  return (
    <div className={Style.container}>
      <div className={Style.content}>
        <div className={Style.sortForm} onClick={toggleSortOrder}>
          <div className={Style.title}>Название</div>
          <img src={order === "asc" ? sortArrowDown : sortArrowUp} alt="" />
        </div>
        <div className={Style.search}>
          <SearchElement
            inputTitle="Введите название тега"
            onChangeInput={setInputValue}
            inputValue={currentSearchTag}
            onSubmitInput={onSubmitInput}
          />
        </div>
      </div>
    </div>
  );
});
