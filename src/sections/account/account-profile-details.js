import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';

const states = [
  {
    value: 'SNE',
    label: 'Security Networks'
  },
  {
    value: 'SE',
    label: 'Software Engineering'
  },
  {
    value: 'RO',
    label: 'Robotics'
  },
  {
    value: 'AI',
    label: 'Data Science & Artificial Intelligence'
  }
];


export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    fullName: 'Daniel Atonge',
    telegramHandle: "@hardriive",
    email: 'd.atonge@innopolis.university',
    phone: '+79998112665',
    graduatedTrack: 'SE',
    graduatedYear: "2022",
    currentCity: "Innopolis",
    currentCompany: "SciVenia",
    companyRole: "Team Lead",
    aboutYou: 'I love and practice collective sport',
    contactEmail: "elamboatonge@gmail.com"
  });


  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Full name"
                  name="fullName"
                  onChange={handleChange}
                  required
                  value={values.fullName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Telegram handle"
                  name="telegramHandle"
                  onChange={handleChange}
                  required
                  value={values.telegramHandle}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  required
                  onChange={handleChange}

                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Graduated Track"
                  name="graduatedTrack"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.graduatedTrack}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Graduated Year"
                  name="graduatedYear"
                  onChange={handleChange}
                  required
                  value={values.graduatedYear}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Current City"
                  name="currentCity"
                  onChange={handleChange}
                  required
                  value={values.currentCity}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Current Company"
                  name="currentCompany"
                  onChange={handleChange}
                  required
                  value={values.currentCompany}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Company Role"
                  name="companyRole"
                  onChange={handleChange}
                  required
                  value={values.companyRole}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="This email will be used to send updates regarding Alumni community activities. It is very important to us that we have a reliable way we can contact you "
                  label="Reliable Contact Email"
                  name="contactEmail"
                  onChange={handleChange}
                  required
                  value={values.contactEmail}
                />
              </Grid>
              <Grid
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Fun Fact About You"
                  name="aboutYou"
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  value={values.aboutYou}
                />
              </Grid>
            </Grid>

          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
