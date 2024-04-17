import Style from "./DropListForCreateForm.module.css";

import tagIcon from "../../../../imgs/tag.svg";
import projectIcon from "../../../../imgs/project.svg";

import { useCallback, useState } from "react";
import { projectType, tagType } from "../../../../types/types";
import { useAppDispatch } from "../../../../hooks/hooks";
import { getProjects } from "../../../../store/projects/ActionCreators";
import { getTags } from "../../../../store/tags/ActionCreators";
import { DropElementForProjectsOrTags } from "../../DropElement/DropElementForProjectsOrTags";

type Props = {
  setSelectedDate: (date: number[]) => void;
  setShow: (value: boolean) => void;
  selectedDate: number[];
  isShow: boolean;
  dataType: "tags" | "projects";
};

export const DropListForCreateForm = ({
  dataType,
  isShow,
  selectedDate,
  setSelectedDate,
  setShow,
}: Props) => {
  const [data, setData] = useState<
    ((tagType | projectType) & { isChecked: boolean })[]
  >([]);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();

  const requestData = useCallback(
    async (dataType: string, searchValue: string) => {
      if (dataType === "projects") {
        return (await dispatch(getProjects(undefined))).data;
      } else if (dataType === "tags") {
        return (await dispatch(getTags(searchValue))).data;
      }
    },
    [dispatch]
  );

  const handlerSetDate = async (dateId: number, isChecked: boolean) => {
    if (!isChecked) {
      const updatedData = data.map((dateItem) =>
        dateItem.id === dateId ? { ...dateItem, isChecked: true } : dateItem
      );
      setData(updatedData);
      setSelectedDate([...selectedDate, dateId]);
    } else if (isChecked) {
      let filteredNumbers = selectedDate.filter(
        (dateItem) => dateItem !== dateId
      );
      setSelectedDate([...filteredNumbers]);
    }
  };

  const handlerRequestData = useCallback(async () => {
    const allData = await requestData(dataType, searchValue);

    selectedDate.sort((a: number, b: number) => (a > b ? -1 : 1));

    let result: ((projectType | tagType) & { isChecked: boolean })[] = [];

    const localSelectedDate = [...selectedDate];

    allData.forEach((item: projectType | tagType) => {
      const itemWithChecked: Partial<projectType | tagType> & {
        isChecked: boolean;
      } = {
        ...item,
        isChecked: false,
      };

      if (
        localSelectedDate.length > 0 &&
        item.id === localSelectedDate[localSelectedDate.length - 1]
      ) {
        itemWithChecked.isChecked = true;
        localSelectedDate.pop();
      }
      result.push(
        itemWithChecked as (projectType | tagType) & { isChecked: boolean }
      );
    });
    setData(result);
  }, [requestData, searchValue, selectedDate, dataType]);

  const handlerGetDate = async () => {
    if (isShow) {
      setShow(false);
    } else if (!isShow) {
      setShow(true);
      handlerRequestData();
    }
  };

  let emptyDataPlaceholder = "";

  let inputPlaceholder = "Введите название ";
  if (dataType === "projects") {
    emptyDataPlaceholder = "Проектов пока нет";
    inputPlaceholder += "проекта";
  } else if (dataType === "tags") {
    emptyDataPlaceholder = "Тегов пока нет";
    inputPlaceholder += "тега";
  }

  return (
    <div className={Style.container}>
      <button className={Style.button} onClick={handlerGetDate}>
        <img
          className={Style.icon}
          src={dataType === "projects" ? projectIcon : tagIcon}
          alt=""
        />
      </button>
      {isShow ? (
        <div className={Style.main}>
          <div className={Style.info}>
            <form onSubmit={(event) => event.preventDefault()}>
              <input
                type="text"
                placeholder={inputPlaceholder}
                value={searchValue}
                onChange={(value) => setSearchValue(value.target.value)}
              />
            </form>
            <div className={Style.projects}>
              {data.length > 0 ? (
                data.map((item) => (
                  <DropElementForProjectsOrTags
                    key={item.id}
                    name={
                      dataType === "projects"
                        ? (item as projectType).projectName
                        : (item as tagType).tagName
                    }
                    isConnected={item.isChecked}
                    handlerSetSelected={() => {
                      handlerSetDate(item.id, item.isChecked);
                    }}
                  />
                ))
              ) : (
                <div className={Style.emptyData}>{emptyDataPlaceholder}</div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
