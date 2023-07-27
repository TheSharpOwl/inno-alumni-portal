import Head from 'next/head';
import { Box, Container, Stack, Unstable_Grid2 as Grid, Button, SvgIcon, Typography, Modal, TextField, InputAdornment, IconButton } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/admin-dashboard/layout';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { AdminViewAccounts } from 'src/sections/account/admin-view-accounts';
import { useCallback, useState } from 'react';
import { generatePassword } from '../../utils/generate-password';
import { registerAdminUser } from '../../api';

const electiveRequest = [
  {
    id: 'f69f88012978187a6c12897f',
    ref: 'DEV1049',
    amount: 30.5,
    name: 'Ekaterina Tankova',
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: '9eaa1c7dd4433f413c308ce2',
    ref: 'DEV1048',
    amount: 25.1,
    name: 'Cao Yu',
    createdAt: 1555016400000,
    status: 'approved'
  },
  {
    id: '01a5230c811bd04996ce7c13',
    ref: 'DEV1047',
    amount: 10.99,
    name: 'Alexa Richardson',
    createdAt: 1554930000000,
    status: 'rejected'
  }
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const initialState = {
  fullName: "",
  email: "",
  password: "",
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState(initialState)

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleCreateAdmin = async () => {
    const adminUser = {
      name: values.fullName,
      email: values.email,
      password: values.password
    }
    console.log(adminUser);

    const newAdmin = await registerAdminUser(adminUser)
    console.log(newAdmin);
    setTimeout(() => {
      setValues(initialState)
      handleClose()
    }, 8000)
  }

  return (
    <>
      <Head>
        <title>
          Account | IU Alumni Portal
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Modal keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6"
              component="h2"
              sx={{ mb: 2 }}>Set Up New Admin Account</Typography>
            <TextField
              fullWidth
              label="Admin Full name"
              name="fullName"
              onChange={handleChange}
              required
              value={values.fullName}
              sx={{
                mb: 3
              }}
            />

            <TextField
              fullWidth
              label="Admin Email"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
              sx={{
                mb: 3
              }}
            />

            <TextField
              fullWidth
              label="Admin Password"
              name="password"
              onChange={handleChange}
              required
              value={values.password}
              sx={{
                mb: 3
              }}
              InputProps={{
                endAdornment: (<InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValues((prevState) => ({
                      ...prevState,
                      password: generatePassword({ length: 10 })
                    }))}
                    onMouseDown={(e) => { e.preventDefault() }}
                    edge="end"
                    style={{ marginRight: 0.1 }}
                  >

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ height: 20, width: 20 }} className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>


                  </IconButton>
                </InputAdornment>)
              }}
            />
            <Typography variant="body2"
              sx={{ color: 'grey' }} >
              NOTE:<br />
              Make sure to save this password and email above before clicking on the create Admin. Share only with the responsible admin. All fields will be cleared 8 seconds after clicking on Create Admin
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              <Button
                sx={{ mt: 4 }}
                onClick={handleClose}
              >
                Close
              </Button>

              <Button
                onClick={handleCreateAdmin}
                sx={{
                  mt: 4,
                }}
                variant="contained"
              >
                Create Admin
              </Button>

            </div>
          </Box>
        </Modal>
        <Container maxWidth="lg">
          <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 3 }} spacing={3} >
            <div>
              <Typography variant="h4">
                Account
              </Typography>
            </div>
            <div>
              <Button
                onClick={handleOpen}
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add Admin Account
              </Button>
            </div>
          </Stack>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={12}
                lg={12}
              >
                <AdminViewAccounts
                  orders={electiveRequest}
                  sx={{ height: '100%' }}
                  title="Registered Accounts on Alumni Portal"
                />
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
    </>
  );
}
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
