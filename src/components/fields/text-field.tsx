import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type {
  AppointmentFormKeys,
  AppointmentFormValues,
} from '@/schema/appointmentFormSchema';

type TextFieldProps = {
  form: UseFormReturn<AppointmentFormValues, any, AppointmentFormValues>;
  name: AppointmentFormKeys;
  label: string;
  icon: ReactNode;
  input: { placeholder: string; autoComplete?: string };
};

export const TextField = ({
  form,
  name,
  label,
  icon,
  input,
}: TextFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="tex   t-label-medium-size text-content-primary">
          {label}
        </FormLabel>
        <FormControl>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand">
              {icon}
            </div>

            <Input
              placeholder={input.placeholder}
              className="pl-10"
              autoComplete={input.autoComplete}
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
