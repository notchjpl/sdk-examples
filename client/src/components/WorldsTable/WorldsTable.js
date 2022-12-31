import React, { useState } from "react";

// components
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { EmptyRows } from "../EmptyRows";

// context
import { useUserState } from "../../context/UserContext";
import { setMessage, useGlobalDispatch } from "../../context/GlobalContext";

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
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        direction="column"
      >
        <Grid container spacing={2} p={2} justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" color="black">
              Worlds
            </Typography>
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
                        <TableRow hover tabIndex={-1} key={world.id}>
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
                    page={page}
                    rowsPerPage={rowsPerPage}
                    length={worlds.length}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={worlds.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
export default WorldsTable;
