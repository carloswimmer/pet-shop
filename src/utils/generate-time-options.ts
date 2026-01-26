export const generateTimeOptions = (
  startHour: number,
  endHour: number,
  interval?: { start: number; end: number },
): string[] => {
  const times: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    if (!!interval && hour >= interval.start && hour < interval.end) continue;

    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === endHour && minute > 0) break;

      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      times.push(timeString);
    }
  }

  return times;
};
