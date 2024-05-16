type Props = {
  sumTime: number;
};

export const TimersCount = ({ sumTime }: Props) => {
  let hours = Math.floor(sumTime / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((sumTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let seconds = Math.floor(sumTime % 60)
    .toString()
    .padStart(2, "0");
  return (
    <div>
      {hours}:{minutes}:{seconds}
    </div>
  );
};
