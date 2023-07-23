import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';

import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/admin-dashboard/layout';
import { AdminElectiveRequests } from '../../sections/request-elective/admin-elective-requests';



const Page = () => {


  return (
    <>
      <Head>
        <title>
          Elective Requests | IU Alumni Portal
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Elective Requests
                </Typography>
              </Stack>
              <div>

              </div>
            </Stack>
            <AdminElectiveRequests
              sx={{ height: '100%' }}
              title="Manage Alumni Requests for electives"
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
