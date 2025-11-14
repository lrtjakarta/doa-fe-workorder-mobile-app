import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const CustomTableCalendar = ({ children }) => {
  return (
    <Table
      sx={{
        width: "100%",
        "& > .MuiTableHead-root > .MuiTableRow-root > .MuiTableCell-root": {
          borderBottom: "none",
          width: 20,
          textAlign: "center",
        },
        "& > .MuiTableRow-root": {
          height: "auto",
        },
        mb: 1,
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>M</TableCell>
          <TableCell>S</TableCell>
          <TableCell>S</TableCell>
          <TableCell>R</TableCell>
          <TableCell>K</TableCell>
          <TableCell>J</TableCell>
          <TableCell>S</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default CustomTableCalendar;
