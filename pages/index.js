import React, { useState } from "react";
import Head from "next/head";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  // FormControl,
  FormControlLabel,
  // Table,
  // TableBody,
  // TableHead,
  // TableContainer,
  // TableRow,
  // TableCell,
  // Paper,
  Dialog,
  DialogContent,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Button,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import EnhancedTable from "../src/ui/EnhancedTable";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

// Data Functions
function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();

  // Switch States
  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  const platformOptions = ["Web", "iOS", "Android"];

  let featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];

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
      "$1500",
      true
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
    createData(
      "Fat Albert",
      "2/13/20",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Dizzy",
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

  const [page, setPage] = React.useState(0);

  let websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  // Dialog States (for adding new projects)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);

  // Search States
  const [search, setSearch] = useState("");

  // convert features and platforms from string to array
  // convert date from object to string
  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        "$" + total,
        true
      ),
    ]);

    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  // Media queries
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  //Search fxn
  const handleSearch = (e) => {
    let query = e.target.value;
    setSearch(query);
    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) => option.toLowerCase().includes(query.toLowerCase()))
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  const serviceQuestions = (
    <>
      <Grid item style={{ marginTop: matchesSM ? 20 : null }}>
        <Typography variant="h4">Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setFeatures([]);
          }}
        >
          <FormControlLabel
            value="Website"
            label="Website"
            control={<Radio />}
            classes={{ label: classes.service }}
          />

          <FormControlLabel
            value="Mobile app"
            label="Mobile App"
            control={<Radio />}
            classes={{ label: classes.service }}
          />

          <FormControlLabel
            value="Custom software"
            label="Custom Software"
            control={<Radio />}
            classes={{ label: classes.service }}
          />
        </RadioGroup>
      </Grid>
    </>
  );

  const complexityQuestions = (
    <Grid item style={{ marginBottom: matchesSM ? 50 : null }}>
      <Grid
        item
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
        style={{ marginTop: matchesSM ? 50 : "5em" }}
      >
        <Grid item>
          <Typography variant="h4">Complexity</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="complexity"
            name="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              value="low"
              label="Low"
              control={<Radio />}
              classes={{ label: classes.service }}
            />

            <FormControlLabel
              disabled={service === "Website"}
              value="medium"
              label="Medium"
              control={<Radio />}
              classes={{ label: classes.service }}
            />

            <FormControlLabel
              disabled={service === "Website"}
              value="high"
              label="High"
              control={<Radio />}
              classes={{ label: classes.service }}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  const usersQuestions = (
    <Grid item>
      <Grid
        item
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
        style={{ marginTop: matchesSM ? 50 : "5em" }}
      >
        <Grid item>
          <Typography variant="h4">Users</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="users"
            name="users"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              value="0-10"
              label="0-10"
              control={<Radio />}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
            />

            <FormControlLabel
              disabled={service === "Website"}
              value="10-100"
              label="10-100"
              control={<Radio />}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
            />

            <FormControlLabel
              disabled={service === "Website"}
              value="100+"
              label="100+"
              control={<Radio />}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesSM ? "center" : undefined}
      >

        <Head>
          <title key="title">
            Project Manager | DAS Development
          </title>
          <meta name="description" key="description" content="DAS Development's internal client-side app used to keep track of its freelance projects." />
          
          <meta property="og:title" key="og:title" content="Project Manager | DAS Development" />
          <meta property="og:url" key="og:url" content="https://das-pm.vercel.app/" />
          <link rel="canonical" key="canonical" href="https://das-pm.vercel.app/" />

        </Head>

        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}
        >
          <Typography variant="h1">Projects</Typography>
        </Grid>

        {/*--- Search Input---*/}
        <Grid item>
          <TextField
            placeholder="Search project details or create a new entry"
            value={search}
            onChange={handleSearch}
            style={{
              width: matchesSM ? "25em" : "35em",
              marginLeft: matchesSM ? 0 : "5em",
            }}
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

        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : "5em", marginTop: "2em" }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? "column" : "row"}
              justify={matchesSM ? "center" : undefined}
            >
              <Grid item>
                {/*---Websites Switch---*/}
                <FormControlLabel
                  label="Websites"
                  labelPlacement={matchesSM ? "end" : "start"}
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={websiteChecked}
                      color="primary"
                      onChange={() => setWebsiteChecked(!websiteChecked)}
                    />
                  }
                />
              </Grid>
              <Grid item>
                {/*---iOS Switch---*/}
                <FormControlLabel
                  label="iOS Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={iOSChecked}
                      color="primary"
                      onChange={() => setiOSChecked(!iOSChecked)}
                    />
                  }
                />
              </Grid>

              <Grid item>
                {/*---Android Switch---*/}
                <FormControlLabel
                  label="Android Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={androidChecked}
                      color="primary"
                      onChange={() => setAndroidChecked(!androidChecked)}
                    />
                  }
                />
              </Grid>

              <Grid item>
                {/*---Software Switch---*/}
                <FormControlLabel
                  label="Custom Software"
                  labelPlacement={matchesSM ? "end" : "start"}
                  control={
                    <Switch
                      checked={softwareChecked}
                      color="primary"
                      onChange={() => setSoftwareChecked(!softwareChecked)}
                    />
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        {/*----- Data Table -----*/}
        <Grid
          item
          style={{
            marginBottom: matchesMD ? "40em" : "35em",
            marginTop: "5em",
            maxWidth: "100%",
          }}
        >
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>

        {/*----- Dialog Component -----*/}
        <Dialog
          fullWidth
          fullScreen={matchesSM}
          maxWidth="md"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          style={{ zIndex: 1302 }}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>

          <DialogContent>
            <Grid
              container
              justify="space-between"
              direction={matchesSM ? "column" : "row"}
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems={matchesSM ? "center" : undefined}
                  sm
                >
                  <Hidden mdUp>{serviceQuestions}</Hidden>
                  <Hidden mdUp>{usersQuestions}</Hidden>
                  <Hidden mdUp>{complexityQuestions}</Hidden>

                  {/*--- Name TextField ---*/}
                  <Grid item>
                    <TextField
                      label="Name"
                      id="name"
                      value={name}
                      style={{ width: matchesSM ? 250 : undefined }}
                      fullWidth={!matchesSM}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>

                  {/*--- Service Radio Group ---*/}
                  <Grid
                    item
                    container
                    direction="column"
                    alignItems={matchesSM ? "center" : undefined}
                    style={{ marginTop: matchesSM ? 50 : "5em" }}
                  >
                    <Hidden smDown>{serviceQuestions}</Hidden>

                    {/*--- Platforms Select Component ---*/}
                    <Grid item style={{ marginTop: matchesSM ? 0 : "5em" }}>
                      <Select
                        labelId="platforms"
                        id="platforms"
                        MenuProps={{ style: { zIndex: 1302 } }}
                        style={{ width: matchesSM ? 250 : "12em" }}
                        multiple
                        displayEmpty
                        renderValue={
                          platforms.length > 0 ? undefined : () => "Platforms"
                        }
                        value={platforms}
                        onChange={(event) => setPlatforms(event.target.value)}
                        disabled={service === "Website"}
                      >
                        {platformOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/*--- Date Picker ---*/}
              <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="center"
                  style={{ marginTop: 16 }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      style={{ width: matchesSM ? 250 : undefined }}
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>

                  {/*--- Complexity Radio Group ---*/}
                  <Hidden smDown>{complexityQuestions}</Hidden>
                </Grid>
              </Grid>

              {/*--- Total, Users, & Features Block ---*/}
              <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems={matchesSM ? "center" : "flex-end"}
                >
                  {/*--- Total TextField ---*/}
                  <Grid item>
                    <TextField
                      style={{ width: matchesSM ? 250 : undefined }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      value={total}
                      id={total}
                      label="Total"
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </Grid>

                  {/*--- Users Radio Group ---*/}
                  <Hidden smDown>{usersQuestions}</Hidden>

                  {/*--- Features Select Component ---*/}
                  <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                    <Select
                      labelId="features"
                      id="features"
                      MenuProps={{ style: { zIndex: 1302 } }}
                      style={{ width: matchesSM ? 250 : "12em" }}
                      displayEmpty
                      multiple
                      renderValue={
                        features.length > 0 ? undefined : () => "Features"
                      }
                      value={features}
                      onChange={(event) => setFeatures(event.target.value)}
                    >
                      {service === "Website"
                        ? (featureOptions = websiteOptions)
                        : null}
                      {featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/*--- Add New Project Component ---*/}
            <Grid container justify="center" style={{ marginTop: "5em" }}>
              <Grid item>
                <Button
                  color="primary"
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
