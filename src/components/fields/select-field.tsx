import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  AppointmentFormKeys,
  AppointmentFormValues,
} from '@/schema/appointmentFormSchema';

type SelectFieldProps = {
  form: UseFormReturn<AppointmentFormValues, any, AppointmentFormValues>;
  name: AppointmentFormKeys;
  label: string;
  icon: ReactNode;
  input: { placeholder: string };
  options: string[];
};

export const SelectField = ({
  form,
  name,
  label,
  icon,
  input,
  options,
}: SelectFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="tex   t-label-medium-size text-content-primary">
          {label}
        </FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            value={typeof field.value === 'string' ? field.value : ''}
          >
            <SelectTrigger>
              <div className="text-content-brand">{icon}</div>
              <SelectValue placeholder={input.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
