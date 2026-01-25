'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  type AppointmentFormValues,
  appointmentFormSchema,
} from '@/schema/appointmentFormSchema';
import { DateField, MaskedField, TextareaField, TextField } from '../fields';

export const AppointmentForm = () => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
      scheduleAt: undefined,
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">New appointment</Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">Book an appointment</DialogTitle>
          <DialogDescription size="modal">
            Fill up the user data to create an appointment
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              form={form}
              name="tutorName"
              label="Tutor name"
              icon={<User size={20} />}
              input={{ placeholder: 'Tutor name', autoComplete: 'name' }}
            />

            <TextField
              form={form}
              name="petName"
              label="Pet name"
              icon={<Dog size={20} />}
              input={{ placeholder: 'Pet name' }}
            />

            <MaskedField
              form={form}
              name="phone"
              label="Phone number"
              icon={<Phone size={20} />}
              input={{
                placeholder: '(999) 999-9999',
                mask: '(000) 000-0000',
                autoComplete: 'tel',
              }}
            />

            <TextareaField
              form={form}
              name="description"
              label="Service description"
              input={{ placeholder: 'Service description' }}
            />

            <DateField
              form={form}
              name="scheduleAt"
              label="Date"
              input={{ placeholder: 'Select a date' }}
            />

            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
