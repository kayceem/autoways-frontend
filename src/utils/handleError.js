import { toast } from 'react-hot-toast';

const handleError = (error) => {
  if (error.response && error.response.data.status_code === 404) {
    const errorMessage = error.response.data.status_message;
    toast.error(errorMessage);
    console.warn('Resource not found:', errorMessage);
  } else if (error.response && error.response.data.status_code === 500) {
    const errorMessage = error.response.data.status_message;
    console.error('Server error:', errorMessage);
    toast.error(errorMessage);
  } else {
    if (typeof error === 'string') {
      toast.error(error);
      console.error('Error:', error);
    } else {
      toast.error(' Please try again later.');
    }
  }
};

export default handleError;