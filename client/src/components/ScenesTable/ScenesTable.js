import React, { useState } from "react";
import PropTypes from "prop-types";

// components
import {
  Button,
  Grid,
  Input,
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
import { EmptyRows } from "../EmptyRows";

// context
import { setMessage, useGlobalDispatch, useUserState } from "@context";

export function ScenesTable({ handleReplaceScene }) {
  const [scenes, setScenes] = useState({});
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // context
  const globalDispatch = useGlobalDispatch();
  const { user } = useUserState();

  const handleFetchScenes = async () => {
    if (!user || !email) return;

    try {
      const scenes = await user.fetchScenesByEmail();
      setScenes(scenes);
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
            <Typography color="black" variant="h6">
              Scenes
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between" p={2} spacing={2}>
              <Grid item>
                <Typography>Email: </Typography>
              </Grid>
              <Grid item>
                <Input
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item>
                <Button
                  disabled={!email}
                  onClick={handleFetchScenes}
                  variant="contained"
                >
                  Fetch Scenes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {scenes.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Url Slug</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scenes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((scene) => {
                      return (
                        <TableRow hover key={scene.id} tabIndex={-1}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ minWidth: 200 }}
                          >
                            {scene.name}
                          </TableCell>
                          <TableCell>{scene.urlSlug}</TableCell>
                          <TableCell>{scene.description}</TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => handleReplaceScene(scene.id)}
                            >
                              Replace
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <EmptyRows
                    length={scenes.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={scenes.length}
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

ScenesTable.propTypes = {
  handleReplaceScene: PropTypes.func.isRequired,
};

export default ScenesTable;
