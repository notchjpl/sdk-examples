import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export function Header(props) {
  const { apiKey, changeExample, setApiKey, title } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    changeExample(event.target.id);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: "black",
        paddingBottom: 20,
        marginBottom: 20,
      }}
      spacing={1}
    >
      <Grid item>
        <Typography variant="h1" component="h1">
          {title}
        </Typography>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Button
            id="basic-button"
            variant="outlined"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "white", borderColor: "white" }}
          >
            Change Example
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem id="LassoScatter" onClick={handleClose}>
              LassoScatter
            </MenuItem>
            <MenuItem id="Leaderboard" onClick={handleClose}>
              Leaderboard
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <TextField
            id="apiKeyInput"
            label="Add API Key"
            variant="standard"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            sx={{
              "& .MuiInputForm-root": { color: "white" },
              "& .MuiFormLabel-root": { color: "white" },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
              input: { color: "white" },
              label: { color: "white" },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
