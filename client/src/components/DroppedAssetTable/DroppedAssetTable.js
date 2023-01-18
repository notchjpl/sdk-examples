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

export function DroppedAssetTable({
  assetType = "unique",
  handleChangeAsset,
  uniqueNamePrefix,
}) {
  const [assets, setAssets] = useState({});
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // context
  const globalDispatch = useGlobalDispatch();
  const { selectedWorld } = useGlobalState();

  const handleFetchAssets = async () => {
    const assets = [];
    await selectedWorld.fetchDroppedAssets();
    for (const asset of Object.values(selectedWorld.droppedAssets)) {
      // TODO: Should be able to only pull assets by unique name prefix to select relevant assets rather than doing this filter.
      if (
        (assetType === "unique" && asset.uniqueName) ||
        (assetType === "text" && asset.specialType === "text")
      ) {
        assets.push(asset);
      }
    }
    if (assets.length === 0) {
      setMessage({
        dispatch: globalDispatch,
        message: uniqueNamePrefix
          ? `Get started by adding any asset with a unique name that starts with '${uniqueNamePrefix}'`
          : "No dropped assets with unique names found.",
        messageType: "warning",
      });
    }
    setAssets(assets);
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
        p={1}
        spacing={1}
      >
        <Grid container justifyContent="space-between" p={1} spacing={2}>
          <Grid item>
            <Typography color="black" variant="h6">
              Dropped Assets
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleFetchAssets} variant="contained">
              Fetch Assets
            </Button>
          </Grid>
        </Grid>
        {assets.length > 0 && (
          <Grid item sx={{ width: "100%" }}>
            <TableContainer>
              <Table aria-labelledby="tableTitle" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    {assetType === "text" && <TableCell>Text</TableCell>}
                    <TableCell align="right">X</TableCell>
                    <TableCell align="right">Y</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assets
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((asset) => {
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
                            {asset.uniqueName || asset.assetName}
                          </TableCell>
                          {assetType === "text" && (
                            <TableCell component="th" scope="row">
                              {asset.text}
                            </TableCell>
                          )}
                          <TableCell align="right">
                            {parseInt(asset.position.x).toFixed(0)}
                          </TableCell>
                          <TableCell align="right">
                            {parseInt(asset.position.y).toFixed(0)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <EmptyRows
                    length={assets.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            {assets.length > 10 && (
              <TablePagination
                component="div"
                count={assets.length}
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

DroppedAssetTable.propTypes = {
  assetType: PropTypes.string,
  handleChangeAsset: PropTypes.func.isRequired,
  uniqueNamePrefix: PropTypes.string,
};

export default DroppedAssetTable;
