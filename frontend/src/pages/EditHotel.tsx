import { useParams } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/manageHotelForm/ManageHotelForm';

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery({
    queryKey: ['fetchMyHotelById'],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ''),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['fetchMyHotelById'],
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  );
};

export default EditHotel;
