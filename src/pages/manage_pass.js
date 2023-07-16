import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Grid, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreatePassRequest } from 'src/sections/account/create-pass-request';
import { PassRequestTable } from 'src/sections/account/pass-request-table';
import { createPassRequest, getPassRequestHistory } from 'src/api';
import { PassRequestInfo } from 'src/sections/donations/pass-request-info';

const Page = () => {


  const [passRequests, setPassRequests] = useState([])

  useEffect(() => {
    const loadPassRequest = async () => {
      const passRequests = await getPassRequestHistory();

      setPassRequests(passRequests);
    }
    loadPassRequest()
  }, [])

  const handleMakeRequest = async ({ request }) => {
    const createdRequest = await createPassRequest({ request });
    setPassRequests((prev) => [...prev, createdRequest.data])
  }

  return (
    <>
      <Head>
        <title>
          Manage Pass Requests | IU Alumni Portal
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <div style={{
                display: 'flex', justifyContent: 'center', gap: 18, flexWrap: "wrap"
              }}>
                <CreatePassRequest sendRequest={handleMakeRequest} />
                <PassRequestInfo />
              </div>
              <Grid
                container
                gap={3}
                direction="row"
                justifyContent="space-between"
              >
                <Grid
                  xs={12}
                  md={12}
                  style={{ marginTop: 50 }}
                >
                  <PassRequestTable
                    title="History"
                    subheader="View your request pass history"
                    orders={passRequests} />
                </Grid>
              </Grid>
            </div>
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
