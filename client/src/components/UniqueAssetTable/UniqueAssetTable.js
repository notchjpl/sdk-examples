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
import { setMessage, useGlobalDispatch, useGlobalState } from "@context";

export function UniqueAssetTable({ handleChangeAsset }) {
  const [uniqueAssets, setAssetsWithUniqueNames] = useState({});
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  const handleFetchAssets = async () => {
    const uniqueAssets = [];
    await selectedWorld.fetchDroppedAssets();
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
    if (uniqueAssets.length === 0) {
      setMessage({
        dispatch: globalDispatch,
        message: "No dropped assets with unique names found.",
        messageType: "warning",
      });
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

  return (
    <Paper sx={{ p: 1 }}>
      <Grid
        alignItems="center"
        container
        direction="column"
        justifyContent="space-between"
        spacing={1}
      >
        <Grid container justifyContent="space-between" p={1} spacing={2}>
          <Grid item>
            <Typography color="black" variant="h6">
              Unique Assets
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleFetchAssets} variant="contained">
              Fetch Assets
            </Button>
          </Grid>
        </Grid>
        {uniqueAssets.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Unique Name</TableCell>
                    <TableCell align="right">X</TableCell>
                    <TableCell align="right">Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uniqueAssets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((asset) => {
                      console.log(asset);
                      return (
                        <TableRow
                          hover
                          key={asset.id}
                          onClick={() => handleClick(asset)}
                          role="checkbox"
                          selected={asset.id === selectedAsset}
                          sx={{ "&:hover": { cursor: "pointer" } }}
                          tabIndex={-1}
                        >
                          <TableCell component="th" scope="row">
                            {asset.name}
                          </TableCell>
                          <TableCell align="right">
                            {parseInt(asset.x).toFixed(0)}
                          </TableCell>
                          <TableCell align="right">
                            {parseInt(asset.y).toFixed(0)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <EmptyRows
                    length={uniqueAssets.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            {uniqueAssets.length > 10 && (
              <TablePagination
                component="div"
                count={uniqueAssets.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{ overflow: "hidden" }}
              />
            )}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

UniqueAssetTable.propTypes = {
  handleChangeAsset: PropTypes.func.isRequired,
};

export default UniqueAssetTable;
