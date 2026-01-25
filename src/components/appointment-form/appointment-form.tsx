import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const AppointmentForm = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="brand">New appointment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book an appointment</DialogTitle>
          <DialogDescription>
            Fill up the user data to create an appointment
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
