import { Formik, Form } from 'formik';
import { Fragment } from 'react';

import { Typography } from '@mui/material';
import { InputFormChild, InputForm, InputFormLogin } from './InputForm';
import { Buttom } from '../..';
import { useQueryClient } from '@tanstack/react-query';
//import ReCAPTCHA from "react-google-recaptcha";

export const FormProduct = ({ inputConfigs, initialValues, onSubmit, validationSchema, titleButom }: any) => {
    const queryClient = useQueryClient();
    const productId: number | undefined = queryClient.getQueryData(['productId']);
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <>
                <Typography variant="h4" component='h1'>
                    {productId ? (
                        <Fragment>
                            Editar {titleButom} con <Typography variant="h4" component='span' className='text-[#FF954A]'>ID {productId}</Typography>
                        </Fragment>) : (
                        <Fragment>Registrar {titleButom}</Fragment>
                    )}
                </Typography>
                <hr className='my-10' />
                <Form className='space-y-10'>
                    {/* Renderizar los inputs configurados */}
                    {inputConfigs.map((config: any) => (
                        <Fragment key={config.id}>
                            {config.type === 'child' ? (
                                <InputFormChild id={config.id} content={config.title} type={config.typeInput}>
                                    {config.additionalComponent}
                                </InputFormChild>
                            ) : (
                                <InputForm id={config.id} content={config.title} type={config.typeInput} />
                            )}
                        </Fragment>
                    ))}
                    <div className='flex justify-center'>
                        <Buttom>
                            {productId ? `Editar ${titleButom}` : `Registrar ${titleButom}`}
                        </Buttom>
                    </div>
                </Form>
            </>
        </Formik>
    );
};

export const FormUser = ({ inputConfigs, initialValues, onSubmit, validationSchema, txtBtn, handleChangeCaptcha }: any) => {
    console.log(handleChangeCaptcha);
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <>
                <Form className='space-y-8'>
                    {/* Renderizar los inputs configurados */}
                    {inputConfigs.map((config: any) => (
                        <Fragment key={config.id}>
                            <InputFormLogin id={config.id} content={config.title} />
                        </Fragment>
                    ))}
                    {/* <ReCAPTCHA
                        sitekey="6Lfq1NgnAAAAAJN3jF5bK5f29gNy9TTJMZwcFNfz"
                        onChange={handleChangeCaptcha}
                    />
                    <p>Debes aceptar el Captcha</p> */}
                    <Buttom style='w-full'>{txtBtn}</Buttom>
                </Form>
            </>
        </Formik>
    );
};