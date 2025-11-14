import { Box, Dialog, Stack, Typography, useTheme } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const DialogLegend = ({ open, onClose }) => {
  const theme = useTheme();
  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="body2" fontWeight={600}>
          Legend
        </Typography>
        <Stack gap={1}>
          {legends(theme).map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <FiberManualRecordIcon sx={{ fontSize: 14, color: item.color }} />
              <Typography variant="caption">{item.title}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Dialog>
  );
};

const legends = (theme) => [
  {
    id: 1,
    title: "Aktif/Berdinas",
    color: theme.palette.info.main,
  },
  {
    id: 2,
    title: "Requested",
    color: theme.palette.warning.main,
  },
  {
    id: 3,
    title: "Confirmed",
    color: theme.palette.secondary.main,
  },
  {
    id: 4,
    title: "Approved",
    color: theme.palette.success.main,
  },
  {
    id: 5,
    title: "Rejected",
    color: theme.palette.primary.main,
  },
];

export default DialogLegend;
