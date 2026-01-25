export const generateTimeOptions = (
  startHour: number,
  endHour: number,
): string[] => {
  const times: string[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Evita adicionar o último horário se for 21:30 por exemplo
      if (hour === endHour && minute > 0) break;

      const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      times.push(timeString);
    }
  }

  return times;
};
