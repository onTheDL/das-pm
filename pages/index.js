import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({}));

// Data Functions
function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) {
  return { name, date, service, features, complexity, platforms, users, total };
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  // Switch States
  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  // Dialog State (for adding new projects)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());

  // Table State
  const [rows, setRows] = useState([
    createData(
      "Billy Bob",
      "3/6/21",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500"
    ),
    createData(
      "Bill Gates",
      "10/17/20",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600",
      true
    ),
    createData(
      "Steve Jobs",
      "2/13/20",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Stan Smith",
      "2/13/20",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "iOS, Android",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Albert Einstein",
      "2/13/20",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250",
      true
    ),
  ]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                <InputAdornment
                  position="end"
                  onClick={() => setDialogOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
          <FormGroup row>
            {/*---Websites Switch---*/}
            <FormControlLabel
              label="Websites"
              labelPlacement="start"
              style={{ marginRight: "5em" }}
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
              style={{ marginRight: "5em" }}
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
              style={{ marginRight: "5em" }}
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

        {/*----- Data Table -----*/}
        <Grid item container justify="flex-end" style={{ marginTop: "5em" }}>
          <Grid item style={{ marginRight: 75 }}>
            <FilterListIcon color="secondary" style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: "15em" }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Features</TableCell>
                  <TableCell align="center">Complexity</TableCell>
                  <TableCell align="center">Platforms</TableCell>
                  <TableCell align="center">Users</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.service}</TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.features}
                    </TableCell>
                    <TableCell align="center">{row.complexity}</TableCell>
                    <TableCell align="center">{row.platforms}</TableCell>
                    <TableCell align="center">{row.users}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>

          {/*----- Dialog Componet -----*/}
          <DialogContent>
            <Grid container>
              {/*--- Name TextField ---*/}
              <Grid item container direction="column">
                <Grid item>
                  <TextField
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
              </Grid>

              {/*--- Date Picker ---*/}
              <Grid item container direction="column">
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
