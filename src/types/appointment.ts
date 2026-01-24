export type Period = 'morning' | 'afternoon' | 'evening';

export type Appointment = {
  id: string;
  petName: string;
  tutorName: string;
  phone: string;
  description: string;
  scheduleAt: Date;
  time: string;
  service: string;
  period: Period;
};

export type AppointmentPeriod = {
  title: string;
  type: Period;
  timeRange: string;
  appointments: Appointment[];
};
