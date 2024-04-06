type Props = {
  hours: string;
  minutes: string;
  seconds: string;
};

export const TimersCount = ({ hours, minutes, seconds }: Props) => {
  return (
    <div>
      {hours}:{minutes}:{seconds}
    </div>
  );
};
