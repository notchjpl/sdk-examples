import { TableCell, TableRow } from "@mui/material";

// Avoid a layout jump when reaching the last page with empty rows.
export function EmptyRows(page, rowsPerPage, length) {
  const emptyRowCount =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0;
  if (emptyRowCount > 0) {
    return (
      <TableRow
        style={{
          height: 33 * emptyRowCount,
        }}
      >
        <TableCell colSpan={6} />
      </TableRow>
    );
  }
}
