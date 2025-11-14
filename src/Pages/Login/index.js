import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import LogoLRT from "Assets/Images/logov2.png";
import MicrosoftIcon from "Component/Icons/Microsoft";
import useSignin from "Hooks/Auth/useSignin";
import API from "Services/Api";

const Login = () => {
  const {
    handleChange,
    handleSubmit,
    captcha,
    getCaptcha,
    loading,
    touched,
    errors,
    signQR,
  } = useSignin();

  const [visibilityPassword, setVisibilityPassword] = useState(false);

  useEffect(() => {
    getCaptcha();
    // return () => {}
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Box component="div">
      <Container sx={{ px: 0 }} fixed maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            p: 3,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100vh",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(245,126,31,1) 32%, rgba(212,37,42,1) 100%)",
          }}
        >
          <Box
            sx={{
              // flexGrow: { xs: undefined, md: 1 },
              width: "100%",
              display: "flex",
              // justifyContent: "center",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                borderRadius: 4,
                px: 4,
                py: 8,
                width: "100%",
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Typography variant="h3" fontWeight={600}>
                  Sign In
                </Typography>
                <Typography variant="body1" color="text.semi">
                  Aplikasi Kedinasan - PT. LRT Jakarta
                </Typography>
                <Typography>
                  ENV : {process.env.REACT_APP_ENVIRONMENT}
                </Typography>

                {/* <Box sx={{ py: 2, width: "100%" }}>
                <Button
                  startIcon={<MicrosoftIcon />}
                  color="disabled"
                  variant="outlined"
                  fullWidth
                >
                  <Typography variant="body1">
                    Sign in with Microsoft Account
                  </Typography>
                </Button>
              </Box> */}

                {/* <Divider sx={{ width: "100%" }}>Or with email</Divider> */}

                <form style={{ width: "100%" }} onSubmit={onSubmit}>
                  <Stack
                    mt={2}
                    spacing={2}
                    alignItems="flex-end"
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      label="Username"
                      onChange={handleChange("username")}
                      helperText={
                        touched.username && errors.username
                          ? errors.username
                          : null
                      }
                      error={touched.username && errors.username ? true : false}
                    />

                    <TextField
                      size="small"
                      fullWidth
                      label="Password"
                      type={visibilityPassword ? "text" : "password"}
                      onChange={handleChange("password")}
                      error={touched.password && errors.password ? true : false}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setVisibilityPassword(!visibilityPassword)
                              }
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {visibilityPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        touched.password && errors.password
                          ? errors.password
                          : null
                      }
                    />

                    <Stack
                      // direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={1}
                      sx={{ my: 1, width: "100%" }}
                    >
                      <Box
                        component="img"
                        src={captcha.image}
                        sx={{ width: 200 }}
                      />
                      <TextField
                        name="answer"
                        placeholder="Type the Captcha here"
                        onChange={handleChange("answer")}
                        helperText={
                          touched.answer && errors.answer ? errors.answer : null
                        }
                        error={touched.answer && errors.answer ? true : false}
                      />
                    </Stack>

                    {/* <Link underline="none" sx={{ cursor: "pointer" }}>
                    Forgot Password?
                  </Link> */}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Sign In
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
