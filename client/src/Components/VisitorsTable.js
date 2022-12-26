import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

export function VisitorsTable({ handleMoveVisitors, selectedWorld }) {
  const [visitors, setVisitors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // useEffect(() => {
  //   handleFetchVisitors();
  // }, []);

  const handleFetchVisitors = async () => {
    const visitors = [];
    await selectedWorld.fetchVisitors();
    if (!selectedWorld.visitors) return console.log("no visitors found");
    for (const visitor of Object.values(selectedWorld.visitors)) {
      visitors.push({
        id: visitor.playerId,
        name: visitor.displayName,
        visitorObj: visitor,
        selected: false,
        shouldTeleportVisitor: true,
        x: visitor.moveTo.x || 0,
        y: visitor.moveTo.y || 0,
      });
    }
    setVisitors(visitors);
  };

  const onChange = (field, value, visitorId) => {
    let updatedValue = value;
    if (parseInt(value) >= 0) updatedValue = parseInt(value);
    else if (value === null) updatedValue = 0;
    const newRows = visitors.map((row) => {
      if (row.id === visitorId) {
        return { ...row, [field]: updatedValue };
      }
      return row;
    });
    setVisitors(newRows);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visitors.length) : 0;

  return (
    <Paper sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        direction="column"
      >
        <Grid container spacing={2} p={2} justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" color="black">
              Current Visitors
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleFetchVisitors} variant="contained">
              Fetch Visitors
            </Button>
          </Grid>
        </Grid>
        {visitors.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: 8 }}>Display Name</TableCell>
                    <TableCell>Teleport Visitor?</TableCell>
                    <TableCell align="right">Position X</TableCell>
                    <TableCell align="right">Position Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visitors
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((visitor) => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={visitor.id}
                          selected={visitor.selected}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ minWidth: 200 }}
                          >
                            <Checkbox
                              color="primary"
                              checked={visitor.selected}
                              id={`${visitor.id}-selected`}
                              value={visitor.selected}
                              onChange={(event) =>
                                onChange(
                                  "selected",
                                  event.target.checked,
                                  visitor.id
                                )
                              }
                            />
                            {visitor.name}
                          </TableCell>
                          <TableCell>
                            <Select
                              id={`${visitor.id}-shouldTeleportVisitor`}
                              value={visitor.shouldTeleportVisitor}
                              onChange={(event) =>
                                onChange(
                                  "shouldTeleportVisitor",
                                  event.target.value,
                                  visitor.id
                                )
                              }
                            >
                              <MenuItem value={true}>True</MenuItem>
                              <MenuItem value={false}>False</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            <Input
                              id={`${visitor.id}-x`}
                              value={visitor.x}
                              onChange={(event) =>
                                onChange("x", event.target.value, visitor.id)
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Input
                              id={`${visitor.id}-y`}
                              name="y"
                              value={visitor.y}
                              onChange={(event) =>
                                onChange("y", event.target.value, visitor.id)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={visitors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={() => handleMoveVisitors(visitors)}
            variant="contained"
            disabled={!visitors.length > 0}
          >
            Move Visitors
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
export default VisitorsTable;
