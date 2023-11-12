import { Grid, Typography } from "@mui/material";
import Logo from "../../../assets/svg-deepstocked (1).svg";
import SVG from "../../../assets/create-user.svg";
import { Link } from "react-router-dom";
import { useValidation } from "../../../hooks";
import { FormUser, inputCreateAccount } from "../../../shared";
import { useRegister } from "../hooks/useRegister";

const CreateUser = () => {
  const { validationSchema, initialCreateUser } = useValidation(inputCreateAccount);
  const { handleSubmit } = useRegister()


  return (
    <Grid container className="h-screen">
      <Grid item xs={6}>
        <div className="flex flex-col items-center mt-[-50px]">
          <div className="w-[50%] space-y-4">
            <div className="h-[50%] w-[50%]">
              <img src={Logo} alt="Logo" />
            </div>
            <Typography variant="h5">Crear cuenta</Typography>
            <div>
              <FormUser
                inputConfigs={inputCreateAccount}
                initialValues={initialCreateUser}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                txtBtn="Crear Cuenta"
              />
            </div>
            <Typography component="p" className="text-center">
              Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-[#FFB347]">
                Iniciar Sesión
              </Link>
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={6} className="bg-[#FFB347] flex">
        <img src={SVG} alt="Logo" className="m-auto" />
      </Grid>
    </Grid>
  );
};

export default CreateUser;
