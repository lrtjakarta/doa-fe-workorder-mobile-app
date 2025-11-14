import { IconButton, Paper } from "@mui/material";

const DynamicBottomNavigation = ({ items, value, onChange }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        bottom: 0,
        boxShadow: 3,
        p: 1,
      }}
    >
      {items.map((item, index) => (
        <IconButton
          key={item.label}
          onClick={() => onChange(index)}
          color={value === index ? "primary" : "default"}
        >
          {item.icon}
        </IconButton>
      ))}
    </Paper>
  );
};

export default DynamicBottomNavigation;
