import { useForm } from 'react-hook-form';
import {
  PaymentIntentResponse,
  UserType,
} from '../../../backend/src/shared/types';

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  return <div>BookingForm</div>;
};

export default BookingForm;
