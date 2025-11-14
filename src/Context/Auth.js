import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import api from "../Services/Api";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({});

  const getCaptcha = async () => {
    try {
      let _data = await api.getCaptcha();
      _data = _data.data;
      console.log("data captcha", _data);

      setCaptcha((prev) => ({ ...prev, image: _data?.image }));
    } catch (error) {
      console.log("error get captcha", error);
    }
  };

  const signIn = useCallback(async (values) => {
    // try {
    setLoading(true);
    api
      .postSignIn(values)
      .then((res) => {
        const resdata = res.data;
        console.log("data", resdata);
        if (resdata !== null) {
          const success = resdata.success;
          if (success) {
            const { token, roles, multi } = resdata.data;
            if (multi) {
              localStorage.setItem("roles", JSON.stringify(roles));

              return navigate(`/verify-role?token=${token}`);
            }
          }

          const _accessToken = resdata.accessToken;
          const _refreshToken = resdata.refreshToken;

          localStorage.setItem("access_token", _accessToken);
          localStorage.setItem("refresh_token", _refreshToken);
          localStorage.setItem("user", resdata.user);

          toast.success("Selamat datang " + resdata.user);

          setAuthenticated(true);
          setLoading(false);
          navigate("/");
          // }
        } else {
          toast.error("Username atau password salah");
          console.log("err", res.data.status);
          getCaptcha();
          setAuthenticated(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        let message = "Username atau password anda salah";
        console.log("error", error?.response);
        if (error?.response?.data?.message) {
          message = error?.response?.data?.message;
        }

        toast.error(message);
        getCaptcha();
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  const signInQR = useCallback(async (values) => {
    // try {
    setLoading(true);
    api
      .postSignInQR(values)
      .then((res) => {
        let resdata = res.data;
        console.log("resdata", resdata);
        if (resdata !== null) {
          const _accessToken = resdata.accessToken;
          const _refreshToken = resdata.refreshToken;
          const _permissions = resdata.permissions;
          const _role = resdata.role;

          localStorage.setItem("access_token", _accessToken);
          localStorage.setItem("refresh_token", _refreshToken);
          localStorage.setItem("permissions", _permissions);
          localStorage.setItem("role", _role);
          localStorage.setItem("user", JSON.stringify(resdata.user));

          toast.success("Selamat datang " + resdata.user);
          setAuthenticated(true);
          setLoading(false);
          // }
        } else {
          toast.error("Username atau password salah");
          console.log("err", res.data.status);
          setAuthenticated(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error("Username atau password anda salah");
        console.log("error", error);
        console.error(error.message || `${error}`);
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);

  const verifyMultiRole = useCallback(async (values) => {
    await api
      .verifySignInRole(values)
      .then((res) => {
        const data = res.data;
        if (data) {
          const _accessToken = data.accessToken;
          const _refreshToken = data.refreshToken;
          const _amsToken = data.amsToken;

          localStorage.setItem("access_token", _accessToken);
          localStorage.setItem("refresh_token", _refreshToken);
          localStorage.setItem("user", data.user);

          // only set if occ or superadmin
          if (_amsToken) {
            localStorage.setItem("token_ams", _amsToken);
          }

          // navigate to app page
          // window.location.pathname = "/";
          navigate("/");
          toast.success("Selamat datang " + data.user);

          setAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log("error", err);
        toast.error("Terjadi kesalahan");
        window.location.href = "/login";
        // return navigate("/login", { replace: true });
      });
  }, []);

  const logout = useCallback(async () => {
    localStorage.clear();

    window.location.replace("/login");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logout,
        authenticated,
        loading,
        captcha,
        getCaptcha,
        verifyMultiRole,
        signInQR,
      }}
      {...props}
    />
  );
}
