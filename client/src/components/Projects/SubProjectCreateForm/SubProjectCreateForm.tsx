import Style from "./SubProjectCreateForm.module.css";

type Props = {
  formTitle: string;
  formText: string;
  setFormText: (value: string) => void;
  setFormTitle: (value: string) => void;
  onSubmit: () => void;
};

export const SubProjectCreateForm = ({
  formTitle,
  formText,
  setFormTitle,
  onSubmit,
  setFormText,
}: Props) => {
  return (
    <div className={Style.form}>
      <input
        placeholder="Введите название подзадачи"
        value={formTitle}
        className={Style.input}
        onChange={(value) => setFormTitle(value.target.value)}
      />
      <textarea
        placeholder="Введите описание подзадачи"
        className={Style.textarea}
        value={formText}
        onChange={(event) => setFormText(event.currentTarget.value)}
      ></textarea>
      <button className={Style.button} onClick={onSubmit}>
        Создать
      </button>
    </div>
  );
};
