import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/admin-dashboard/layout';
import { OverviewRequests } from 'src/sections/overview/overview-latest-requests';

const now = new Date();

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

const passRequest = [
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
const Page = () => (
  <>
    <Head>
      <title>
        Overview | IU Alumni Portal
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewRequests
              orders={passRequest}
              sx={{ height: '100%' }}
              title="Latest Pass Request"
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewRequests
              orders={electiveRequest}
              sx={{ height: '100%' }}
              title="Latest Elective Course Request"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
