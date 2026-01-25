import { setHours, setMinutes } from 'date-fns';

export const validateTime = (data: {
  time: string;
  scheduleAt: Date;
}): boolean => {
  const [hour, minutes] = data.time.split(':');
  const scheduleDateTime = setMinutes(
    setHours(data.scheduleAt, Number(hour)),
    Number(minutes),
  );
  return scheduleDateTime > new Date();
};
