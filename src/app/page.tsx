import { PeriodSection } from '@/components/period-section';

const appointments = [
  {
    id: '1',
    petName: 'Buddy',
    tutorName: 'John Doe',
    phone: '1234567890',
    description: 'Regular check-up',
    scheduleAt: new Date('2026-02-23T10:00:00'),
  },
  {
    id: '2',
    petName: 'Billy',
    tutorName: 'Jane Cesar',
    phone: '1234567890',
    description: 'Vaccination',
    scheduleAt: new Date('2026-02-23T11:00:00'),
  },
  {
    id: '3',
    petName: 'Bella',
    tutorName: 'Maria Smith',
    phone: '1234567890',
    description: 'Dental cleaning',
    scheduleAt: new Date('2026-02-23T14:00:00'),
  },
  {
    id: '4',
    petName: 'Max',
    tutorName: 'John Smith',
    phone: '1234567890',
    description: 'Dental cleaning',
    scheduleAt: new Date('2026-02-23T19:00:00'),
  },
];

export default function Home() {
  return (
    <div className='bg-background-primary p-6'>
      <div className='flex items-center justify-between md:m-8'>
        <div>
          <h1 className='text-title text-content-primary mb-2'>Your Agenda</h1>
          <p className='text-paragraph-small text-content-secondary'>
            Here you can see all the clients and services scheduled for today.
          </p>
        </div>
      </div>
      <PeriodSection period={{ type: 'morning', title: 'Morning' }} />
      <PeriodSection period={{ type: 'afternoon', title: 'Afternoon' }} />
      <PeriodSection period={{ type: 'evening', title: 'Evening' }} />
    </div>
  );
}
