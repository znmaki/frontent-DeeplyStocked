import { Grid, Typography } from "@mui/material";
import Logo from "../../../assets/svg-deepstocked (1).svg";
import Logo1 from "../../../assets/aea.svg";
import { Link } from "react-router-dom";
import { useValidation } from "../../../hooks";
import { inputFormLogin, FormUser } from "../../../shared";
import { useLogin } from "../hooks/useLogin";

const LoginUser = () => {
  const { validationSchema, initialValues } = useValidation(inputFormLogin);
  const { handleSubmit } = useLogin()
  
  return (
    <Grid container className="h-screen">
      <Grid item xs={6}>
        <div className="flex flex-col items-center">
          <div className="w-[50%] space-y-4">
            <img src={Logo} alt="Logo" />
            <Typography variant="h5">Iniciar Sesión</Typography>
            <div>
              <FormUser
                inputConfigs={inputFormLogin}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                txtBtn="Iniciar Sesión"
                //handleChangeCaptcha={handleCaptcha}
              />
            </div>
            <Typography component="p" className="text-center">
              No tienes una cuenta?{" "}
              <Link to="/create-account" className="text-[#FFB347]">
                Crear una cuenta
              </Link>
            </Typography>

            <Typography component="p" className="text-center">
              Se olvido su contraseña?{" "}
              <Link to="/auth/forgot-password" className="text-[#FFB347]">
                Reiniciar contraseña
              </Link>
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={6} className="bg-[#FFB347] flex">
        <img src={Logo1} alt="Logo" className="m-auto" />
      </Grid>
    </Grid>
  );
};

export default LoginUser;
