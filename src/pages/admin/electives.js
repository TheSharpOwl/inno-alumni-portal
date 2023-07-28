import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/admin-dashboard/layout';
import { ElectivesTable } from 'src/sections/request-elective/electives-table';
import { applyPagination } from 'src/utils/apply-pagination';
import { useDropzone } from 'react-dropzone'
import { processExcelCallback } from '../../utils/excel-helpers';
import Router from 'next/router';
import { bulkUploadElective } from '../../api';


const Page = () => {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async (event) => {
        const data = await processExcelCallback(event);
        // console.log(data)
        await bulkUploadElective({ data })
        Router.reload();
      }
      reader.readAsArrayBuffer(file)
    })

  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      <Head>
        <title>
          Electives | IU Alumni Portal
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
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
                  Elective Courses
                </Typography>
              </Stack>
              <Stack>
              </Stack>
            </Stack>
            <Stack
              sx={{
                display: 'flex',
                cursor: "pointer"
              }}
            >
              <div style={{
                backgroundColor: '#EBEBEB',
                borderRadius: 16,
                padding: '35px 20px',
                textAlign: 'center',
                border: "1px dashed"

              }} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop any excel file here, or click to select and excel file. (Excel file should have 1 sheet)</p>
                <p>Excel file should have headers ["course_name", "instructor_name", "mode", "description"] to work properly</p>
              </div>

            </Stack>
            <ElectivesTable
              sx={{ height: '100%' }}
              title="Alumni Donations on Alumni Portal"
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
