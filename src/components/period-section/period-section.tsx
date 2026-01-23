import { Cloudy, Moon, Sun } from 'lucide-react';
import type { ReactNode } from 'react';

type PeriodSectionProps = {
  period: any;
};

const periodIcons: Record<string, ReactNode> = {
  morning: <Sun className='text-accent-blue' />,
  afternoon: <Cloudy className='text-accent-orange' />,
  evening: <Moon className='text-accent-yellow' />,
};

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  return (
    <section>
      <div className='mb-8 bg-background-tertiary rounded-xl'>
        <div className='flex items-center justify-between px-5 py-3 border-b border-border-tertiary'>
          {periodIcons[period?.type]}
          <h2 className='text-label-large-size text-content-primary'>
            {period?.title}
          </h2>
        </div>
      </div>
    </section>
  );
};
