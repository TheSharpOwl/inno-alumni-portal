import { useCallback, useEffect, useState } from 'react';
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
import { updateUserInformation } from '../../api';
import { useAuth } from 'src/hooks/use-auth';

const states = [
  {
    value: 'SNE',
    label: 'Security & Networks'
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
  const { user: {
    about_you = "", city = "", company = "",
    contact_email = "", email = "", graduated_track = "",
    graduation_year = "", name = "", phone_number = "",
    position = "", telegram_handle = ""
  } } = useAuth();

  const [values, setValues] = useState({
    fullName: name,
    telegramHandle: telegram_handle,
    email: email,
    phone: phone_number,
    graduatedTrack: graduated_track,
    graduationYear: graduation_year,
    currentCity: city,
    currentCompany: company,
    companyRole: position,
    aboutYou: about_you,
    contactEmail: contact_email
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { fullName, telegramHandle, phone, graduatedTrack,
      graduationYear, currentCity, currentCompany,
      companyRole, aboutYou, contactEmail } = values;

    const response = await updateUserInformation({
      name: fullName,
      phone_number: phone,
      contact_email: contactEmail,
      graduation_year: graduationYear,
      graduated_track: graduatedTrack,
      about_you: aboutYou,
      city: currentCity,
      company: currentCompany,
      position: companyRole,
      telegram_handle: telegramHandle
    })
    // console.log(values)
  };

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
                  disabled
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
                  name="graduationYear"
                  onChange={handleChange}
                  type='number'
                  required
                  value={values.graduationYear}
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
          <Button type='submit' variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
