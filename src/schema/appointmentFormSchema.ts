import { startOfToday } from 'date-fns';
import z from 'zod';
import { validateTime } from '@/utils/validate-time';

export const appointmentFormSchema = z
  .object({
    tutorName: z.string().min(3, 'The tutor name is required'),
    petName: z.string().min(3, 'The pet name is required'),
    phone: z.string().min(10, 'The phone number is required'),
    description: z.string().min(3, 'The service description is required'),
    scheduleAt: z
      .date({
        error: 'The date is required',
      })
      .min(startOfToday(), {
        message: 'The date can not be in the past',
      }),
    time: z.string().min(1, 'The time is required'),
  })
  .refine((data) => validateTime(data), {
    path: ['time'],
    error: 'The time can not be in the past',
  });

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

export type AppointmentFormKeys = keyof AppointmentFormValues;
