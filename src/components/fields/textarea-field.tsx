import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type {
  AppointmentFormKeys,
  AppointmentFormValues,
} from '@/schema/appointmentFormSchema';

type TextareaFieldProps = {
  form: UseFormReturn<AppointmentFormValues, any, AppointmentFormValues>;
  name: AppointmentFormKeys;
  label: string;
  input: { placeholder: string; autoComplete?: string };
};

export const TextareaField = ({
  form,
  name,
  label,
  input,
}: TextareaFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-label-medium-size text-content-primary">
          {label}
        </FormLabel>
        <FormControl>
          <div className="relative">
            <Textarea
              placeholder={input.placeholder}
              className="resize-none"
              {...field}
              value={typeof field.value === 'string' ? field.value : ''}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
