import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "Context";

const VerifyRole = () => {
  const listRole = JSON.parse(localStorage.getItem("roles")) || [];

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // context
  const { verifyMultiRole } = useContext(AuthContext);

  // state
  const [selectedRole, setSelectedRole] = useState("");

  const onSubmit = async () => {
    const data = { token, role: selectedRole };

    console.log("data", data);
    await verifyMultiRole(data);
  };

  // if (!token) {
  //   return navigate("/login");
  // }

  return (
    <Box component="div">
      <Box
        sx={{
          display: "flex",
          p: { xs: 3, sm: 0 },
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          background:
            "linear-gradient(90deg, rgba(245,126,31,1) 32%, rgba(212,37,42,1) 100%)",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            px: { xs: 4, md: 8 },
            py: { xs: 4, md: 8 },
            width: { xs: "100%", md: 500 },
          }}
        >
          <Typography textAlign="center" gutterBottom variant="h3">
            Login Sebagai
          </Typography>
          <Stack
            sx={{ mt: 4 }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              label="Pilih Role"
              fullWidth
              select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {listRole.map((role) => (
                <MenuItem value={role._id} key={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>

            <Button
              disabled={!selectedRole}
              onClick={onSubmit}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default VerifyRole;
