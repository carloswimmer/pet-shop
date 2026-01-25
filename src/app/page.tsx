import { AppointmentForm } from '@/components/appointment-form';
import { PeriodSection } from '@/components/period-section';
import { APPOINTMENTS_MOCK_DATA, groupAppointmentsByPeriod } from '@/utils';

export default async function Home() {
  // const appointment = await prisma.appointment.findMany();
  // console.log(appointment);

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

      <AppointmentForm />
    </div>
  );
}
