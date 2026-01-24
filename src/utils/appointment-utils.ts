import type { Appointment } from '@prisma/client';
import type { Period } from '@/types/appointment';

const getPeriod = (hour: number): Period => {
  if (hour >= 9 && hour < 12) {
    return 'morning';
  }
  if (hour >= 13 && hour < 18) {
    return 'afternoon';
  }
  return 'evening';
};

export const groupAppointmentsByPeriod = (appointments: Appointment[]) => {
  const transformedAppointments = appointments.map(
    (appointment: Appointment) => ({
      ...appointment,
      time: appointment.scheduleAt.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      service: appointment.description,
      period: getPeriod(appointment.scheduleAt.getHours()),
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
