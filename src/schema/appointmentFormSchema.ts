import z from 'zod';

export const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'The tutor name is required'),
  petName: z.string().min(3, 'The pet name is required'),
  phone: z.string().min(10, 'The phone number is required'),
  description: z.string().min(3, 'The service description is required'),
});
