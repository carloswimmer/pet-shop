'use client';

import { PopoverTrigger } from '@radix-ui/react-popover';
import { addDays, format, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent } from '../ui/popover';

export const DatePicker = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const searchedDate = dateParam ? parseISO(dateParam) : new Date();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleNavigationDay = (numberOfDays: number) => {
    const newDate = addDays(searchedDate, numberOfDays);
    updateURL(newDate);
  };

  const updateURL = (newDate: Date) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('date', format(newDate, 'yyyy-MM-dd'));
    router.push(`${pathName}?${newParams.toString()}`);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    updateURL(date);
    setIsDatePickerOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleNavigationDay(-1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-content-brand" />
              {format(searchedDate, 'P', { locale: enGB })}
            </div>

            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={searchedDate}
            onSelect={(date) => handleDateSelect(date)}
            autoFocus
            locale={enGB}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" onClick={() => handleNavigationDay(1)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
