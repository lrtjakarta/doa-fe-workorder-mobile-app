import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import API from "Services/Api";

const DialogConfirmation = ({ open, title, onClose, data }) => {
  const onSubmit = async () => {
    const ids = data?.map((i) => i._id);
    await API.postConfirmationWorkOrder(ids)
      .then((res) => {
        onClose("fetch");
      })
      .catch((err) => {
        console.log("err post confirmation", err);
        return toast.error("Terjadi kesalahan!");
      });
  };

  return (
    <Dialog open={open} maxWidth="xs">
      <DialogTitle>Konfirmasi Dinas</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="body1">{`Yakin untuk mengonfirmasi dinasan ${data
            ?.map((i) => i.name)
            ?.join(", ")} untuk tanggal ${title}?`}</Typography>
          <Stack direction="row-reverse" gap={1} mt={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onSubmit()}
            >
              Konfirmasi
            </Button>
            <Button variant="contained" color="error" onClick={() => onClose()}>
              Batal
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmation;
