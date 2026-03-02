'use server';

import { endOfDay, startOfDay } from 'date-fns';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { prisma } from '@/lib/prisma';
import { calculatePeriod, formatDateTime } from '@/utils';

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
    const hour = formatDateTime(scheduleAt);
    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

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

    return { error: 'Error when creating appointment. Try again.' };
  }
}

export async function updateAppointment(id: string, data: AppointmentSchema) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;
    const hour = formatDateTime(scheduleAt);
    const { isMorning, isAfternoon, isEvening } = calculatePeriod(hour);

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Appointments can only be done between 9h and 12h, 13h and 18h, 19h and 21h',
      };
    }

    const appointmentExists = await prisma.appointment.findFirst({
      where: { scheduleAt, id: { not: id } },
    });

    if (appointmentExists) {
      return { error: 'Sorry, this appointment is already reserved' };
    }

    await prisma.appointment.update({ where: { id }, data: { ...parsedData } });

    revalidatePath('/');
  } catch (error) {
    console.error(error);

    return { error: 'Error when updating appointment. Try again.' };
  }
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);

    return { error: 'Error when deleting appointment. Try again.' };
  }
}

export async function findAppointmentsByDate(selectedDate: Date) {
  try {
    return await prisma.appointment.findMany({
      where: {
        scheduleAt: {
          gte: startOfDay(selectedDate),
          lte: endOfDay(selectedDate),
        },
      },
      orderBy: {
        scheduleAt: 'asc',
      },
    });
  } catch (error) {
    console.error(error);

    return [];
  }
}
