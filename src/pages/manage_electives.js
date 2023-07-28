import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Grid, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { InformationSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { RequestElectiveTable } from 'src/sections/request-elective/request-elective-table';
import { getAllElectiveCourses, getBookedElectiveCourses } from 'src/api';
import { ElectiveRequestTable } from 'src/sections/request-elective/history-elective-request-table';

const now = new Date();



const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [electives, setElectives] = useState([])
  const [bookedElectives, setBookedElectives] = useState([])


  const useCustomers = (electives, page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(electives, page, rowsPerPage);
      },
      [page, rowsPerPage, electives]
    );
  };
  const electiveForPage = useCustomers(electives, page, rowsPerPage);
  // console.log(electiveForPage)

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  useEffect(() => {
    const loadElectives = async () => {
      const electiveResponse = await getAllElectiveCourses()
      setElectives(electiveResponse);
      const bookedCourses = await getBookedElectiveCourses()
      setBookedElectives(bookedCourses);
    }
    loadElectives()
  }, [])

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Request Electives | IU Alumni Portal
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
                  Request Electives
                </Typography>
              </Stack>

            </Stack>
            <RequestElectiveTable
              updateElectives={setElectives}
              updateBookedElectives={setBookedElectives}
              count={electives.length}
              items={electiveForPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
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
              <ElectiveRequestTable
                title="History"
                subheader="View your elective request history"
                orders={bookedElectives}
                updateElectives={setElectives}
                updateBookedElectives={setBookedElectives}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
{/* <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Request Selected 
                </Button>
              </div> */}
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
