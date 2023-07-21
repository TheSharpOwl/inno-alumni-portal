import Head from 'next/head';
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
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SuggestDonationInterest } from 'src/sections/donations/suggest-donation-interest';
import { PaymentQRCode } from 'src/sections/donations/payment-qrcode';
import { BankDetails } from 'src/sections/donations/bank-details';
import { WhyDonateInnopolis } from 'src/sections/donations/why-donate-innopolis';




const Page = () => (
  <>
    <Head>
      <title>
        Make Donations | IU Alumni Portal
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
              Make Donations
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
              >
                <WhyDonateInnopolis />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <BankDetails />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <PaymentQRCode />
                <SuggestDonationInterest />
              </Grid>


            </Grid>
          </div>
        </Stack>
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
