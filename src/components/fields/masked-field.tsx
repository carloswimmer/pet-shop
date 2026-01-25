import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type {
  AppointmentFormKeys,
  AppointmentFormValues,
} from '@/schema/appointmentFormSchema';

type MaskedFieldProps = {
  form: UseFormReturn<AppointmentFormValues, any, AppointmentFormValues>;
  name: AppointmentFormKeys;
  label: string;
  icon: ReactNode;
  input: { placeholder: string; mask: string; autoComplete?: string };
};

export const MaskedField = ({
  form,
  name,
  label,
  icon,
  input,
}: MaskedFieldProps) => (
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
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand">
              {icon}
            </div>
            <IMaskInput
              placeholder={input.placeholder}
              mask={input.mask}
              className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
              value={typeof field.value === 'string' ? field.value : ''}
              unmask={true}
              onAccept={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              autoComplete={input.autoComplete}
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
