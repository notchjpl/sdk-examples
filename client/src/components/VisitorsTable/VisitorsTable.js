import React, { useState } from "react";
import PropTypes from "prop-types";

// components
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
import { EmptyRows } from "@components/EmptyRows";

// context
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

export function VisitorsTable({ handleMoveVisitors }) {
  const [visitors, setVisitors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

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
        alignItems="center"
        container
        direction="column"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid container justifyContent="space-between" p={2} spacing={2}>
          <Grid item>
            <Typography variant="h6">Current Visitors</Typography>
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
                          key={visitor.id}
                          selected={visitor.selected}
                          tabIndex={-1}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ minWidth: 200 }}
                          >
                            <Checkbox
                              checked={visitor.selected}
                              color="primary"
                              id={`${visitor.id}-selected`}
                              onChange={(event) =>
                                onChange(
                                  "selected",
                                  event.target.checked,
                                  visitor.id
                                )
                              }
                              value={visitor.selected}
                            />
                            {visitor.name}
                          </TableCell>
                          <TableCell>
                            <Select
                              id={`${visitor.id}-shouldTeleportVisitor`}
                              onChange={(event) =>
                                onChange(
                                  "shouldTeleportVisitor",
                                  event.target.value,
                                  visitor.id
                                )
                              }
                              value={visitor.shouldTeleportVisitor}
                            >
                              <MenuItem value={true}>True</MenuItem>
                              <MenuItem value={false}>False</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            <Input
                              id={`${visitor.id}-x`}
                              onChange={(event) =>
                                onChange("x", event.target.value, visitor.id)
                              }
                              value={visitor.x}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Input
                              id={`${visitor.id}-y`}
                              name="y"
                              onChange={(event) =>
                                onChange("y", event.target.value, visitor.id)
                              }
                              value={visitor.y}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <EmptyRows
                    length={visitors.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={visitors.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Grid>
        )}
        <Grid item>
          <Button
            disabled={!visitors.length > 0}
            onClick={() => handleMoveVisitors(visitors)}
            variant="contained"
          >
            Move Visitors
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

VisitorsTable.propTypes = {
  handleMoveVisitors: PropTypes.func.isRequired,
};

export default VisitorsTable;
