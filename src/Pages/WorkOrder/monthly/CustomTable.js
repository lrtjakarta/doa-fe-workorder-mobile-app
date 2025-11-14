import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CustomTableWorkOrder = ({
  children,
  dayNumber = 0,
  headers = [],
  cellWidth = 20,
  ...rest
}) => {
  return (
    <TableContainer sx={{ minHeight: 400, maxHeight: 500 }}>
      <Table stickyHeader aria-label="sticky table" sx={{ maxWidth: "100%" }}>
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <TableCell
                sx={{
                  fontWeight: 600,
                }}
                key={item}
              >
                {item}
              </TableCell>
            ))}

            {Array(dayNumber)
              .fill(1)
              .map((i, index) => index + 1)
              .map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    "&:last-child": {
                      textAlign: "right",
                    },
                    width: cellWidth,
                    fontSize: "0.6rem",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTableWorkOrder;
