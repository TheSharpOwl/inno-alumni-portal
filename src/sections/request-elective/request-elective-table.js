import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Modal,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import { makeElectiveRequest } from 'src/api';

export const RequestElectiveTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    updateElectives,
    updateBookedElectives
  } = props;

  const [selectedCourse, setSelectedCourse] = useState({
    "id": "cljvtv4d00000mzyzwtvijk8d",
    "course_name": "Personal Efficiency Skills of IT-specialist",
    "instructor_name": "Evgenii Serochudinov",
    "description": "string",
    "mode": "OFFLINE"
  })
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '3px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const handleRequest = async (courseId) => {
    const requestResponse = await makeElectiveRequest({ courseId })
    console.log(requestResponse);
    updateBookedElectives((prev) => [...prev, requestResponse])
    const newItems = items.filter(item => item.id !== courseId);
    updateElectives(newItems)
    handleClose();
  }
  /*{
    fullName: 'Daniel Atonge',
    telegramHandle: "",
    email: 'd.atonge@innopolis.university',
    phone: '',
    graduatedTrack: '',
    graduationYear: "",
    currentCity: "",
    currentCompany: "",
    companyRole: "",
    aboutYou: ''
  }*/
  return (
    <Card>
      <Modal keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2">Course Name:
          </Typography>
          <Typography>
            {selectedCourse.course_name}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Description:</Typography>
          <Typography
          >
            {selectedCourse.description}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Delivery Mode:</Typography>
          <Typography
          >
            {selectedCourse.mode}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Instructor:</Typography>
          <Typography>
            {selectedCourse.instructor_name}
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>


            <Button
              sx={{ mt: 4 }}
              onClick={handleClose}
            >
              Close
            </Button>

            <Button
              onClick={() => handleRequest(selectedCourse.id)}
              sx={{ mt: 4 }}
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
                      d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                  </svg>
                </SvgIcon>
              )}
              variant="contained"
            >
              Request
            </Button>

          </div>
        </Box>
      </Modal>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ paddingLeft: 40, width: 300 }}>
                  Course Name
                </TableCell>
                <TableCell>
                  Instructor Name
                </TableCell>
                <TableCell style={{ width: 200 }}>
                  Delivery Mode
                </TableCell>
                <TableCell align='center'
                  style={{ width: 300 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((course) => {

                return (
                  <TableRow
                    hover
                    key={course.id}
                  >
                    <TableCell style={{ paddingLeft: 40 }}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {course.course_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {course.instructor_name}
                    </TableCell>
                    <TableCell>
                      {course.mode}
                    </TableCell>
                    <TableCell style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>

                      <Button
                        onClick={() => {
                          setSelectedCourse(course)
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
                      <Button
                        onClick={() => handleRequest(course.id)}
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
                                d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                            </svg>
                          </SvgIcon>
                        )}
                        variant="contained"
                      >
                        Request
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {!count && (
            <Typography
              variant="h6"
              sx={{ py: 2, textAlign: 'center' }}
              component="h2">No Available Elective Courses to Pick from
            </Typography>)
          }
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RequestElectiveTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  updateElectives: PropTypes.func,
  updateBookedElectives: PropTypes.func,
};
