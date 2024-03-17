import { toast } from "react-toastify";



const errorHandler = (error) => {
  toast.error(`An error occurred: ${error.message}`, {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
  });
};
export default errorHandler;
