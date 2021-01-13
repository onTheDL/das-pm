import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({}));

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  // States
  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
        <Typography variant="h1">Projects</Typography>
      </Grid>

      {/*--- Search Input---*/}
      <Grid item>
        <TextField
          placeholder="Search project details or create a new entry"
          style={{ width: "35em", marginLeft: "5em" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AddIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item style={{marginLeft: "5em", marginTop: "2em"}}>
        <FormGroup row>

          {/*---Websites Switch---*/}
          <FormControlLabel
            label="Websites"
            labelPlacement="start"
            style={{marginRight: "5em"}}
            control={
              <Switch
                checked={websiteChecked}
                color="primary"
                onChange={() => setWebsiteChecked(!websiteChecked)}
              />
            }
          />

          {/*---iOS Switch---*/}
          <FormControlLabel
            label="iOS Apps"
            labelPlacement="start"
            style={{marginRight: "5em"}}
            control={
              <Switch
                checked={iOSChecked}
                color="primary"
                onChange={() => setiOSChecked(!iOSChecked)}
              />
            }
          />

          {/*---Android Switch---*/}
          <FormControlLabel
            label="Android Apps"
            labelPlacement="start"
            style={{marginRight: "5em"}}
            control={
              <Switch
                checked={androidChecked}
                color="primary"
                onChange={() => setAndroidChecked(!androidChecked)}
              />
            }
          />

          {/*---Software Switch---*/}
          <FormControlLabel
            label="Custom Software"
            labelPlacement="start"
            control={
              <Switch
                checked={softwareChecked}
                color="primary"
                onChange={() => setSoftwareChecked(!softwareChecked)}
              />
            }
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
