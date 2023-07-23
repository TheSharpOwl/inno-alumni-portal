import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
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
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { getAllRegisteredUsers } from '../../api';
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
/*{
    "id": "",
    "name": "",
    "email": "",
    "course_name": "",
    "instructor_name": "",
    "mode": "",
    "status": "",
    "feedback": "",
    "created_at": ""
  }*/ 
export const AdminViewAccounts = (props) => {
  const { orders = [], sx, title } = props;
  const [users, setUsers] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadingRegisteredUsers = async () => {
    const registeredUsers = await getAllRegisteredUsers()
    console.log(registeredUsers)
    setUsers(registeredUsers)
  }
  useEffect(() => {
    loadingRegisteredUsers()
  }, [])

  const [selectedUser, setSelectedUser] = useState({
    "id": "clk1w9u2p0000mzh27qkv18uk",
    "name": "Daniel Atonge",
    "email": "admin@example.com",
    "contact_email": null,
    "phone_number": null,
    "role": "ALUMNI",
    "graduation_year": null,
    "graduated_track": null,
    "about_you": null,
    "city": null,
    "company": null,
    "position": null,
    "is_volunteer": false,
    "created_at": "2023-07-14T01:22:45.505000+00:00",
    "telegram_handle": null,
    "course_request": 0,
    "pass_request": 0,
    "donation": 0
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
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40
          }}>
            <div>
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
                component="h2">Name:
              </Typography>
              <Typography>
                {selectedUser.name}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>Email:</Typography>
              <Typography
              >
                {selectedUser.email}
              </Typography>
            </div>


            {selectedUser.contact_email && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>Contact Email:</Typography>
                <Typography
                >
                  {selectedUser.contact_email}
                </Typography>
              </div>)
            }
            {selectedUser.phone_number && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>Phone number:</Typography>
                <Typography
                >
                  {selectedUser.phone_number}
                </Typography>
              </div>)
            }

            {selectedUser.graduation_year && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>Graduation Year:</Typography>
                <Typography
                >
                  {selectedUser.graduation_year}
                </Typography>
              </div>)
            }

            {selectedUser.graduated_track && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>Graduated Track:</Typography>
                <Typography
                >
                  {selectedUser.graduated_track}
                </Typography>
              </div>)
            }

            {selectedUser.city && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>City:</Typography>
                <Typography
                >
                  {selectedUser.city}
                </Typography>
              </div>)
            }

            {selectedUser.company && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>Company:</Typography>
                <Typography
                >
                  {selectedUser.company}
                </Typography>
              </div>)
            }

            {selectedUser.position && (
              <div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>position:</Typography>
                <Typography
                >
                  {selectedUser.position}
                </Typography>
              </div>)
            }

            <div>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>Role:</Typography>
              <Typography>
                {selectedUser.role}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>No. of course requests:</Typography>
              <Typography>
                {selectedUser.course_request}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>No. of pass requests:</Typography>
              <Typography>
                {selectedUser.pass_request}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>No. of Donations:</Typography>
              <Typography>
                {selectedUser.donation}
              </Typography>
            </div>

            {selectedUser.about_you &&
              (<div>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mt: 2 }}>About You:</Typography>
                <Typography>
                  {selectedUser.about_you}
                </Typography>
              </div>)
            }
          </div>


          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{ mt: 4 }}
              onClick={handleClose}
            >
              Close
            </Button>

            {/* <Button
              onClick={() => handleRequest(selectedUser.id)}
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
          onClick={(e) => { exportToExcel({ data: users, fileName: "Alumni Portal Registered Users" }) }}
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
                  No. Course Request
                </TableCell>
                <TableCell>
                  No. Pass Request
                </TableCell>
                <TableCell>
                  No. Donation
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
              {users.map((user) => {

                return (
                  <TableRow
                    hover
                    key={users.id}
                  >
                    <TableCell>
                      {user.role === 'ADMIN' ? (<SeverityPill color="warning">
                        {user.id.slice(-6).toUpperCase()}
                      </SeverityPill>) : (user.id.slice(-6).toUpperCase())}

                    </TableCell>
                    <TableCell>
                      {user.name}
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>

                      {user.course_request}
                    </TableCell>
                    <TableCell>
                      {user.pass_request}
                    </TableCell>
                    <TableCell>
                      {user.donation}
                    </TableCell>
                    <TableCell>
                      {user.created_at.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedUser(user)
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

AdminViewAccounts.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
  title: PropTypes.string,
};
