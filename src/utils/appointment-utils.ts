import type { Appointment } from '@prisma/client';
import type { Period } from '@/types/appointment';

const getPeriod = (time: string): Period => {
  const hour = time.split(':')[0];
  if (hour >= '09' && hour < '12') {
    return 'morning';
  }
  if (hour >= '13' && hour < '18') {
    return 'afternoon';
  }
  return 'evening';
};

export const groupAppointmentsByPeriod = (appointments: Appointment[]) => {
  const transformedAppointments = appointments.map(
    (appointment: Appointment) => ({
      ...appointment,
      time: formatDateTime(appointment.scheduleAt),
      service: appointment.description,
      period: getPeriod(formatDateTime(appointment.scheduleAt)),
    }),
  );

  const morningAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === 'morning',
  );
  const afternoonAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === 'afternoon',
  );
  const eveningAppointments = transformedAppointments.filter(
    (appointment) => appointment.period === 'evening',
  );

  return [
    {
      title: 'Morning',
      type: 'morning' as Period,
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Afternoon',
      type: 'afternoon' as Period,
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Evening',
      type: 'evening' as Period,
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
};

export const calculatePeriod = (time: string) => {
  const hour = time.split(':')[0];
  console.log(hour);
  const isMorning = hour >= '09' && hour < '12';
  const isAfternoon = hour >= '13' && hour < '18';
  const isEvening = hour >= '19' && hour < '21';

  return {
    isMorning,
    isAfternoon,
    isEvening,
  };
};

export const formatDateTime = (date: Date) => {
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Berlin',
  });
};
