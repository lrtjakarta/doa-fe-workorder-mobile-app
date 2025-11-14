import { object, string } from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "Context/index";

const validationSchema = object().shape({
  username: string().trim().required("Username harus diisi"),
  password: string().required("Password harus diisi"),
  answer: string().required("CAPTCHA harus diisi"),
});

const initialValues = {
  username: "",
  password: "",
  answer: "",
};

export default function useSignin() {
  const { signIn, signInQR, loading, logout, captcha, getCaptcha } =
    useContext(AuthContext);

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        const result = await signIn(values);
        return result;
      } catch (e) {
        console.error(e.message || `${e}`);
      }
    },
  });

  const signQR = async (data) => {
    const result = await signInQR(data);
    return result;
  };

  return { ...formik, signQR, loading, signOut: logout, captcha, getCaptcha };
}
