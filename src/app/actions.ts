'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';
import { prisma } from '@/lib/prisma';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentSchema = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentSchema) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();
    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Appointments can only be done between 9h and 12h, 13h and 18h, 19h and 21h',
      };
    }

    const appointmentExists = await prisma.appointment.findFirst({
      where: { scheduleAt },
    });

    if (appointmentExists) {
      return { error: 'Sorry, this appointment is already reserved' };
    }

    await prisma.appointment.create({ data: { ...parsedData } });

    revalidatePath('/');
  } catch (error) {
    console.error(error);
  }
}
