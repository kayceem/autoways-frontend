import { toast } from 'react-hot-toast';

const handleError = (error) => {
  if (error.response && error.response.data.status_code === 404) {
    const errorMessage = error.response.data.status_message;
    toast.error(errorMessage);
  } else if (error.response && error.response.data.status_code === 500) {
    const errorMessage = error.response.data.status_message;
    toast.error(errorMessage);
  } else {
    toast.error("Error fetching data");
  }
};

export default handleError;