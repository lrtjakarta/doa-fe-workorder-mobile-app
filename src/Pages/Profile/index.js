import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { IconPencil } from "@tabler/icons-react";
import { WorkOrderContext } from "Context";
import useSignin from "Hooks/Auth/useSignin";
import CustomTable from "page-sections/Profile/customTable";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { signOut } = useSignin();
  const { profileById } = useContext(WorkOrderContext);
  const minHeight = window.innerHeight <= 500;

  // console.log("height screen", window.innerHeight);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        gap: 2,
        py: 1,
        mb: minHeight ? 12 : 0,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => navigate("/app/profile/edit")}
        sx={{ alignSelf: "flex-end" }}
      >
        <IconPencil size={28} />
      </IconButton>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          accept="image/*"
          hidden
          // ref={uploadedImage}
          type="file"
          // onChange={(e) => handleUploadImg(e)}
        />
        <Button
          // onClick={handleInputImage}
          sx={{
            flexDirection: "column",
            // height: "auto",
            // width: "100%",
            borderRadius: "50%",
            backgroundColor: "#F9F9F9",
            textTransform: "none",
            overflow: "hidden",
            // py: "40%",
          }}
        >
          <AccountCircle
            style={{
              color: "#BDBDBD",
              fontSize: 124,
              borderRadius: "50%",
              // padding: 0,
            }}
          />
        </Button>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" fontWeight="bold">
          {profileById.name}
        </Typography>
        <Typography fontSize={16}>{profileById.email || "-"}</Typography>
      </Box>
      <Box sx={{ width: "100%", px: 3 }}>
        <CustomTable>
          <TableRow>
            <TableCell>Divisi</TableCell>
            <TableCell>{profileById.division?.name || "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Departemen</TableCell>
            <TableCell>{profileById.departement?.name || "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jabatan</TableCell>
            <TableCell>{profileById.jobPosition?.name || "-"}</TableCell>
          </TableRow>
        </CustomTable>
      </Box>
      <Button onClick={signOut} fullWidth variant="contained">
        Logout
      </Button>
    </Box>
  );
};

export default ProfilePage;
