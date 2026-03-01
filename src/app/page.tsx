import { parseISO } from 'date-fns';
import { AppointmentForm } from '@/components/appointment-form';
import { DatePicker } from '@/components/date-picker';
import { PeriodSection } from '@/components/period-section';
import { Button } from '@/components/ui/button';
import { groupAppointmentsByPeriod } from '@/utils';
import { findAppointmentsByDate } from './actions';

type DateParam = {
  date?: string;
};
type HomeProps = {
  searchParams: Promise<DateParam>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { date } = await searchParams;
  const selectedDate = date ? parseISO(date) : new Date();
  const appointments = await findAppointmentsByDate(selectedDate);
  const periods = groupAppointmentsByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-8">
        <div>
          <h1 className="text-title text-content-primary mb-2">Your Agenda</h1>
          <p className="text-paragraph-small text-content-secondary">
            Here you can see all the clients and services scheduled for today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <DatePicker />
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period) => (
          <PeriodSection key={period.type} period={period} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-background-tertiary py-[18px] px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">New appointment</Button>
        </AppointmentForm>
      </div>
    </div>
  );
}
