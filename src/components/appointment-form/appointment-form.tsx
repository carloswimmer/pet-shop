'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Dog, Loader2, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createAppointment } from '@/app/actions';
import {
  DateField,
  MaskedField,
  SelectField,
  TextareaField,
  TextField,
} from '@/components/fields';
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
import { generateTimeOptions } from '@/utils/generate-time-options';

export const AppointmentForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
      scheduleAt: undefined,
      time: '',
    },
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    const [hour, minutes] = data.time.split(':');
    const scheduleAtWithTime = new Date(data.scheduleAt);
    scheduleAtWithTime.setHours(Number(hour), Number(minutes), 0, 0);

    const result = await createAppointment({
      ...data,
      scheduleAt: scheduleAtWithTime,
    });
    console.log('RETURNED ON CREATE', result);

    setOpen(false);
    toast.success('Appointment succesfully booked!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <DateField
                form={form}
                name="scheduleAt"
                label="Date"
                input={{ placeholder: 'Select a date' }}
              />

              <SelectField
                form={form}
                name="time"
                label="Time"
                icon={<Clock className="h-4 w-4" />}
                input={{ placeholder: '--:-- --' }}
                options={TIME_OPTIONS}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="brand"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Book
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const TIME_OPTIONS = generateTimeOptions(9, 21, { start: 12, end: 13 });
