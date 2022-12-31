import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { EmptyRows } from "../EmptyRows";

// context
import { setMessage, useGlobalDispatch } from "../../context/GlobalContext";

export function VisitorsTable({ handleMoveVisitors, selectedWorld }) {
  const [visitors, setVisitors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // context
  const globalDispatch = useGlobalDispatch();

  // useEffect(() => {
  //   handleFetchVisitors();
  // }, []);

  const handleFetchVisitors = async () => {
    const visitors = [];
    await selectedWorld.fetchVisitors();
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
    if (visitors.length === 0) {
      setMessage({
        dispatch: globalDispatch,
        message: "No visitors found.",
        messageType: "warning",
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
                  <EmptyRows
                    page={page}
                    rowsPerPage={rowsPerPage}
                    length={visitors.length}
                  />
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
