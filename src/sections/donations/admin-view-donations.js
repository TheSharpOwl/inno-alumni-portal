import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Modal
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useEffect, useState } from 'react';
import { getAllAlumniDonations } from '../../api';
import { exportToExcel } from 'src/utils/excel-helpers'

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const AdminViewDonations = (props) => {
  const { orders = [], sx, title } = props;
  const [donations, setDonations] = useState([])


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadingDonations = async () => {
    const userDonations = await getAllAlumniDonations()
    const modifiedDonations = userDonations.map(({ id, user: { name, email }, message, created_at }) => ({
      id, message, created_at,
      name, email

    }))
    setDonations(modifiedDonations)
  }
  useEffect(() => {
    loadingDonations()
  }, [])

  const [selected, setSelected] = useState({
    "id": "",
    "name": "",
    "email": "",
    "message": "",
    "created_at": ""
  })
  return (
    <Card sx={sx}>
      <Modal keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <Typography
            variant="h6"
            sx={{ mt: 2 }}
            component="h2">Donation Id:
          </Typography>
          <Typography>
            {selected.id.slice(-6).toUpperCase()}
          </Typography>

          <Typography
            variant="h6"
            sx={{ mt: 2 }}
            component="h2">Name:
          </Typography>
          <Typography>
            {selected.name}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Email:</Typography>
          <Typography
          >
            {selected.email}
          </Typography>

          {selected.message && (
            <>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>Donation Interest:</Typography>
              <Typography
              >
                {selected.message}
              </Typography>
            </>)
          }

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Created At:</Typography>
          <Typography
          >
            {selected.created_at.split('T')[0]}
          </Typography>



          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ mt: 4 }}
              onClick={handleClose}
            >
              Close
            </Button>

            {/* <Button
              onClick={() => handleRequest(selected.id)}
              sx={{
                mt: 4, backgroundColor: '#F47B7B',
                '&:hover': {
                  backgroundColor: "#F15555"
                }
              }}
              variant="contained"
            >
              Delete Request
            </Button> */}

          </div>
        </Box>
      </Modal>
      <CardHeader title={title} action={
        <Button
          onClick={(e) => { exportToExcel({ data: donations, fileName: "Alumni Portal Donations" }) }}
          color="inherit"
          startIcon={(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ height: 25, width: 25 }} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          )}
        >
          Download
        </Button>
      } />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  Full name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Donation Message
                </TableCell>
                <TableCell>
                  Created Date
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation) => {
                /*
                {
                    "id": "clkb2oyac0001mzy3ckv61prt",
                    "user": {
                      "name": "Daniel Elambo",
                      "email": "d.atonge@innopolis.university",
                      "contact_email": "elamboatonge@gmail.com",
                      "phone_number": "+79998112665",
                      "graduation_year": "2022",
                      "telegram_id": null,
                      "telegram_handle": "hardriive",
                      "position": "Developer",
                      "company": "sciVenia",
                      "city": "Innopolis",
                      "about_you": "Nice testing ",
                      "graduated_track": "SNE",
                      "is_volunteer": true
                    },
                    "message": "Good Day I linke",
                    "created_at": "2023-07-20T11:32:24.081000+00:00"
                  }*/
                return (
                  <TableRow
                    hover
                    key={donation.id}
                  >
                    <TableCell>
                      {donation.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {donation.name}
                    </TableCell>
                    <TableCell>
                      {donation.email}
                    </TableCell>
                    <TableCell>
                      {donation.message.length <= 18 ? donation.message : (donation.message.substr(0, 18) + "...")}
                    </TableCell>

                    <TableCell>
                      {donation.created_at.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelected(donation)
                          handleOpen()
                        }}
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <svg xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              style={{ height: 16, width: 16 }}
                            >
                              <path strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </SvgIcon>
                        )}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

AdminViewDonations.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
  title: PropTypes.string,
};
