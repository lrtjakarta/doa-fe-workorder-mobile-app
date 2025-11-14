import {
  Avatar,
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

// icons
import AdfScannerOutlinedIcon from "@mui/icons-material/AdfScannerOutlined";
import AlarmIcon from "@mui/icons-material/Alarm";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
// custom icons
import BarccodeIcon from "Component/Icons/Barcode";

import { WorkOrderContext } from "Context";
import { useContext, useState } from "react";
import QRCode from "react-qr-code";

const CardProfile = () => {
  const { workOrderById, profileById } = useContext(WorkOrderContext);
  const [open, setOpen] = useState(false);
  let shift = "-";

  if (workOrderById.workOrder?.shift) {
    shift = workOrderById.workOrder?.shift;

    if (shift === "s-1") shift = "S1";
    if (shift === "s-2") shift = "S2";
  }

  return (
    <Card sx={{ p: 2, width: "100%", minHeight: 130 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          height: "100%",
          // justifyContent: "center",
        }}
      >
        <Avatar sx={{ width: 100, height: 100 }}>P</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{profileById.name || "-"}</Typography>
          <Typography sx={{ fontSize: 12, mb: 1 }}>
            {profileById.jobPosition?.name || "-"}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <QueryBuilderIcon sx={{ fontSize: 20 }} color="primary" />
            <Typography variant="body2">{`${
              workOrderById.workOrder?.start?.slice(0, 5) || "-"
            } - ${
              workOrderById.workOrder?.end?.slice(0, 5) || "-"
            }`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 0.8 }}>
              <AlarmIcon color="primary" sx={{ fontSize: 20 }} />
              <Typography variant="caption">{`Shift ${shift}`}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 0.8 }}>
              <AdfScannerOutlinedIcon color="primary" sx={{ fontSize: 20 }} />
              <Typography variant="caption">
                {workOrderById.workOrder?.code}
              </Typography>
            </Box>
          </Box>
        </Box>
        <IconButton
          onClick={() => {
            if (profileById.idNumber) {
              setOpen(true);
            }
          }}
        >
          <BarccodeIcon sx={{ fontSize: 68 }} />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <QRCode value={profileById.idNumber} />
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CardProfile;
