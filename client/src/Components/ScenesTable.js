import React, { useState } from "react";
import { Scene } from "@rtsdk/topia";
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
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { EmptyRows } from "./EmptyRows";

export function ScenesTable({ apiKey, handleReplaceScene }) {
  const [scenes, setScenes] = useState({});
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFetchScenes = async () => {
    if (!email) return;
    const sceneClass = await new Scene(apiKey);
    const scenes = await sceneClass.fetchScenesByEmail(email);
    setScenes(scenes);
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
              Scenes
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2} p={2} justifyContent="space-between">
              <Grid item>
                <Typography color="black">Email: </Typography>
              </Grid>
              <Grid item>
                <Input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                        <TableRow hover tabIndex={-1} key={scene.id}>
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
                    page={page}
                    rowsPerPage={rowsPerPage}
                    length={scenes.length}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={scenes.length}
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
export default ScenesTable;
