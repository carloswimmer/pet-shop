import { format, startOfToday } from 'date-fns';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import type {
  AppointmentFormKeys,
  AppointmentFormValues,
} from '@/schema/appointmentFormSchema';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type DateFieldProps = {
  form: UseFormReturn<AppointmentFormValues, any, AppointmentFormValues>;
  name: AppointmentFormKeys;
  label: string;
  input: { placeholder: string };
};

export const DateField = ({ form, name, label, input }: DateFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel className="text-label-medium-size text-content-primary">
          {label}
        </FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                  !field.value && 'text-content-secondary',
                )}
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-content-brand" size={20} />
                  {field.value ? (
                    format(field.value, 'dd/MM/yyyy')
                  ) : (
                    <span>{input.placeholder}</span>
                  )}
                </div>
                <ChevronDownIcon className="opacity-90 h-4 w-4" />
              </Button>
            </FormControl>
          </PopoverTrigger>

          <PopoverContent className="w-quto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value instanceof Date ? field.value : undefined}
              onSelect={field.onChange}
              disabled={(date) => date < startOfToday()}
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    )}
  />
);
