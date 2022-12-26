import React, { useState } from "react";
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

export function UniqueAssetTable({ handleChangeAsset, selectedWorld }) {
  const [uniqueAssets, setAssetsWithUniqueNames] = useState({});
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleFetchAssets = async () => {
    const uniqueAssets = [];
    await selectedWorld.fetchDroppedAssets();
    if (!selectedWorld.droppedAssets) return console.log("no assets found");
    for (const asset of Object.values(selectedWorld.droppedAssets)) {
      if (asset.uniqueName) {
        uniqueAssets.push({
          id: asset.id,
          name: asset.uniqueName,
          x: asset.position.x,
          y: asset.position.y,
        });
      }
    }
    setAssetsWithUniqueNames(uniqueAssets);
  };

  const handleClick = (asset) => {
    handleChangeAsset(asset);
    setSelectedAsset(asset.id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - uniqueAssets.length) : 0;

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
              Dropped Assets
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleFetchAssets} variant="contained">
              Fetch Assets with Unique Names
            </Button>
          </Grid>
        </Grid>
        {uniqueAssets.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Dropped Asset Name</TableCell>
                    <TableCell align="right">Position X</TableCell>
                    <TableCell align="right">Position Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uniqueAssets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((asset) => {
                      return (
                        <TableRow
                          hover
                          onClick={() => handleClick(asset)}
                          role="checkbox"
                          tabIndex={-1}
                          key={asset.id}
                          selected={asset.id === selectedAsset}
                        >
                          <TableCell component="th" scope="row">
                            {asset.name}
                          </TableCell>
                          <TableCell align="right">{asset.x}</TableCell>
                          <TableCell align="right">{asset.y}</TableCell>
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
              count={uniqueAssets.length}
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
export default UniqueAssetTable;
