import { TableBody, TableCell, TableRow } from "@mui/material";

export default function TableCustom(props) {
  let { no, assessment, value } = props;

  return (
    <TableBody>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          borderBottom: "none",
          borderRadius: 3,
        }}
        style={{
          // backgroundColor: `${x.id % 2 === 0 ? "#E3E3E3" : "#fff"}`,
          border: "none",
        }}
        align="center"
      >
        <TableCell
          style={{
            fontSize: 13,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            overflow: "hidden",
            border: "none",
            fontWeight: 600,
            borderRight: "2px solid #F6F7FF",
            borderBottom: "2px solid #F6F7FF",
          }}
          component="th"
          scope="row"
          width={"5%"}
          align="center"
        >
          {no}
        </TableCell>
        <TableCell
          style={{
            fontSize: 13,
            textTransform: "uppercase",
            border: "none",
            fontWeight: 600,
            borderRight: "2px solid #F6F7FF",
            borderBottom: "2px solid #F6F7FF",
          }}
          align="left"
          width={400}
        >
          {assessment}
        </TableCell>
        <TableCell
          style={{
            fontSize: 12,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            overflow: "hidden",
            border: "none",
            fontWeight: 400,
            color: "#000",
            borderBottom: "2px solid #F6F7FF",
          }}
          align="center"
          width={100}
        >
          <b>{value}</b>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
