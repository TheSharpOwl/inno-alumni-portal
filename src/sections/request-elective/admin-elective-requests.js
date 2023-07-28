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
  Modal,
  TextField
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useEffect, useState } from 'react';
import { getAllElectiveRequests, updateElectiveCourseRequest } from '../../api';
import { exportToExcel } from 'src/utils/excel-helpers'
import { SeverityPill } from 'src/components/severity-pill';
import Router from 'next/router';

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

export const AdminElectiveRequests = (props) => {
  const { orders = [], sx, title } = props;
  const [requests, setRequests] = useState([])
  const [cfeedback, setCFeedback] = useState("")

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadingRequests = async () => {
    const electiveRequests = await getAllElectiveRequests()
    const modifiedRequests = electiveRequests.map(
      ({ id,
        elective_course: { course_name, mode, instructor_name },
        user: { name, email },
        feedback, status, created_at }) => ({
          id, course_name, mode, feedback, status, created_at, email, name, instructor_name
        }))
    setRequests(modifiedRequests)
  }
  useEffect(() => {
    loadingRequests()
  }, [])

  const updateRequestStatus = async ({ status }) => {
    const data = {
      feedback: cfeedback,
      status
    }
    const { id } = selected;
    const response = await updateElectiveCourseRequest({ requestId: id, data })
    // console.log(response)
    handleClose()
    Router.reload();
  }
  const [selected, setSelected] = useState({
    "id": "",
    "name": "",
    "email": "",
    "course_name": "",
    "instructor_name": "",
    "mode": "",
    "status": "",
    "feedback": "",
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
            variant="h5"
            sx={{ mb: 4 }}
            component="h2"> Respond to Elective Request
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
            <div>
              <Typography
                variant="h6"
                component="h2">Request Id:
              </Typography>
              <Typography>
                {selected.id.slice(-6).toUpperCase()}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"

                component="h2">User Full Name:
              </Typography>
              <Typography>
                {selected.name}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2"
              >User Email:</Typography>
              <Typography>
                {selected.email}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2">Course Name:
              </Typography>
              <Typography>
                {selected.course_name}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2">Instructor Name:
              </Typography>
              <Typography>
                {selected.instructor_name}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2">Delivery Mode:
              </Typography>
              <Typography>
                {selected.mode}
              </Typography>
            </div>

            <div>
              <Typography
                variant="h6"
                component="h2">Status:
              </Typography>
              <Typography>
                {selected.status}
              </Typography>
            </div>

            {selected.feedback && <div>
              <Typography
                variant="h6"
                component="h2">Feedback:
              </Typography>
              <Typography>
                {selected.feedback}
              </Typography>
            </div>}

            <div>
              <Typography
                variant="h6"
                component="h2"
              >Created At:</Typography>
              <Typography
              >
                {selected.created_at.split('T')[0]}
              </Typography>
            </div>
          </div>
          {!selected.feedback && (
            <TextField
              fullWidth
              label="Feedback"
              name="feedback"
              onChange={(e) => setCFeedback(e.target.value)}
              required
              value={selected.feedback}
              sx={{
                my: 4
              }}
              multiline
              rows={3}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ mt: 4 }}
              onClick={handleClose}
            >
              Close
            </Button>
            {!selected.feedback && (
              <>
                <Button
                  onClick={() => updateRequestStatus({ status: "APPROVED" })}
                  sx={{
                    mt: 4,
                  }}
                  variant="contained"
                >
                  APPROVE
                </Button>
                <Button
                  onClick={() => updateRequestStatus({ status: "REJECTED" })}
                  sx={{
                    mt: 4, backgroundColor: '#F47B7B',
                    '&:hover': {
                      backgroundColor: "#F15555"
                    }
                  }}
                  variant="contained"
                >
                  REJECT
                </Button>
              </>

            )}

          </div>
        </Box>
      </Modal>
      <CardHeader title={title} action={
        <Button
          onClick={(e) => { exportToExcel({ data: requests, fileName: "Alumni Portal Elective requests" }) }}
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
                  Alumni Email
                </TableCell>
                <TableCell>
                  Course name
                </TableCell>
                <TableCell>
                  Status
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
              {requests.map((request) => {
                /*
               {
      "id": "cljvulb6i0001mzlyukhh1do2",
      "feedback": null,
      "status": "PENDING",
      "user_id": "cljvjzrpa0000mz1dnsmzx5kd",
      "user": null,
      "course_id": "cljvtw53m0000mznxa5cmb0hq",
      "elective_course": {
        "id": "cljvtw53m0000mznxa5cmb0hq",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque eget ex ut ullamcorper. Quisque rutrum risus at nunc facilisis, a aliquet odio volutpat. Sed sollicitudin nunc non elementum bibendum. Ut eget ornare nisi. Ut ullamcorper iaculis sagittis. Nulla hendrerit accumsan semper. Aliquam magna orci, condimentum vitae cursus ac, dictum eu urna. ",
        "course_name": "Design-thinking ",
        "instructor_name": "Pavel Voloschuk",
        "mode": "HYBRID",
        "users": null,
        "request": null
      },
      "created_at": "2023-07-09T19:49:04.601000+00:00",
      "updated_at": "2023-07-09T19:49:04.601000+00:00"
    },
                */

                return (
                  <TableRow
                    hover
                    key={request.id}
                  >
                    <TableCell>
                      {request.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {request.email}
                    </TableCell>
                    <TableCell>
                      {request.course_name}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[request.status]}>
                        {request.status}
                      </SeverityPill>
                    </TableCell>

                    <TableCell>
                      {request.created_at.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelected(request)
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

AdminElectiveRequests.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
  title: PropTypes.string,
};
