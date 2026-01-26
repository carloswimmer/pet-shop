import { AppointmentForm } from '@/components/appointment-form';
import { PeriodSection } from '@/components/period-section';
import { prisma } from '@/lib/prisma';
import { APPOINTMENTS_MOCK_DATA, groupAppointmentsByPeriod } from '@/utils';

export default async function Home() {
  const appointments = await prisma.appointment.findMany();
  console.log('IN DB', appointments);

  const periods = groupAppointmentsByPeriod(APPOINTMENTS_MOCK_DATA);
  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title text-content-primary mb-2">Your Agenda</h1>
          <p className="text-paragraph-small text-content-secondary">
            Here you can see all the clients and services scheduled for today.
          </p>
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period) => (
          <PeriodSection key={period.type} period={period} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-background-tertiary py-[18px] px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm />
      </div>
    </div>
  );
}
