import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../../shared/interfaces/apiResponse";
import { apiService } from "../../../shared/services/axios";

export type UserRegistration = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const useRegister = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (values: UserRegistration) => {
    console.log(values);
    const request = await apiService.post<ApiResponse<null>>("/auth/register", values);
    console.log(request);
    navigate('/login')
  };

  return {
    //Properties
    //Methods
    handleSubmit,
    //Getters

    //Mutations
  };
};