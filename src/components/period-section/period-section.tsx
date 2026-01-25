import { Cloudy, Moon, Sun } from 'lucide-react';
import type { ReactNode } from 'react';
import type { AppointmentPeriod, Period } from '@/types/appointment';
import { AppointmentCard } from '../appointment-card';

type PeriodSectionProps = {
  period: AppointmentPeriod;
};

const periodIcons: Record<Period, ReactNode> = {
  morning: <Sun className='text-accent-blue' />,
  afternoon: <Cloudy className='text-accent-orange' />,
  evening: <Moon className='text-accent-yellow' />,
};

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  return (
    <section className='mb-8 bg-background-tertiary rounded-xl'>
      <div className='flex items-center justify-between px-5 py-3 border-b border-border-tertiary'>
        <div className='flex items-center gap-2'>
          {periodIcons[period.type]}
          <h2 className='text-label-large-size text-content-primary'>
            {period.title}
          </h2>
        </div>
        <span className='text-label-large-size text-content-secondary'>
          {period.timeRange}
        </span>
      </div>

      {period.appointments.length > 0 ? (
        <div className='px-5'>
          <div>
            {period.appointments.map((appointment, index) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                isFirstInSection={index === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No appointments for this period</p>
      )}
    </section>
  );
};
