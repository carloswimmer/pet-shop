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
    </div>
  );
}
