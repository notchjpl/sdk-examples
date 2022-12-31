import React, { useState } from "react";
import PropTypes from "prop-types";

// components
import {
  Button,
  Grid,
  Paper,
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
import { setMessage, useGlobalDispatch, useUserState } from "@context";

export function WorldsTable({ handleSelectWorld }) {
  const [worlds, setWorlds] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // context
  const globalDispatch = useGlobalDispatch();
  const { user } = useUserState();

  const handleFetchWorlds = async () => {
    if (!user) return;
    try {
      await user.fetchWorldsByKey();
      setWorlds(Object.values(user.worlds));
    } catch (error) {
      setMessage({
        dispatch: globalDispatch,
        message: error,
        messageType: "error",
      });
    }
  };

  const handleChangePage = (event, newPage) => {
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
            <Typography variant="h6">Worlds</Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={!localStorage.getItem("apiKey")}
              onClick={handleFetchWorlds}
              variant="contained"
            >
              Fetch Worlds
            </Button>
          </Grid>
        </Grid>
        {worlds.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Url Slug</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {worlds
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((world) => {
                      return (
                        <TableRow hover key={world.id} tabIndex={-1}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ minWidth: 200 }}
                          >
                            {world.name}
                          </TableCell>
                          <TableCell>{world.urlSlug}</TableCell>
                          <TableCell>{world.description}</TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => handleSelectWorld(world.urlSlug)}
                              variant="contained"
                            >
                              Use
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <EmptyRows
                    length={worlds.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={worlds.length}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

WorldsTable.propTypes = {
  handleSelectWorld: PropTypes.func.isRequired,
};

export default WorldsTable;
