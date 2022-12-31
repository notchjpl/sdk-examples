import React, { useState } from "react";
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
import { EmptyRows } from "../EmptyRows";

// context
import {
  setMessage,
  useGlobalDispatch,
  useGlobalState,
} from "../../context/GlobalContext";

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
                  <EmptyRows
                    page={page}
                    rowsPerPage={rowsPerPage}
                    length={uniqueAssets.length}
                  />
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
