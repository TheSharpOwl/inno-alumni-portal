import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/admin-dashboard/layout';
import { UpdateDonationInformation } from 'src/sections/donations/donation-information';
import { UploadDonationQRCode } from 'src/sections/donations/upload-qrcode';
import { useState } from 'react';
import { AdminViewDonations } from '../../sections/donations/admin-view-donations';


const Page = () => {

  return (
    <>
      <Head>
        <title>
          Donations | IU Alumni Portal
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Donations
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                {/* <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <UploadDonationQRCode />
              </Grid> */}
                <Grid
                  xs={12}
                  md={12}
                >
                  <UpdateDonationInformation />
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <AdminViewDonations
                    sx={{ height: '100%' }}
                    title="Alumni Donations on Alumni Portal"
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
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
