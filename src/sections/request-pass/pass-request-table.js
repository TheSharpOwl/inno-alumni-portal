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
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useState } from 'react';
import { deletePassRequest } from '../../api';

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};

export const PassRequestTable = (props) => {
  const { orders = [], title, subheader, updatePassRequests } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedRequest, setSelectedRequest] = useState({
    "id": "clk2nyn350005mzlslarxa5u6",
    "description": "",
    "guest_info": "",
    "feedback": null,
    "requested_date": "",
    "status": "",
    "user_id": "",
    "user": null,
    "created_at": ""
  })
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

  const handleDeleteRequest = async (passRequestId) => {
    const requestResponse = await deletePassRequest({ passRequestId })
    // console.log(requestResponse);
    const newItems = orders.filter(item => item.id !== passRequestId);
    updatePassRequests(newItems)
    handleClose()
  }
  return (
    <Card >
      <Modal keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* "id": "clk2nyn350005mzlslarxa5u6",
    "description": "Visit",
    "guest_info": "Daniel Atonge*_*Victoria *_*Ziad*_*Uchenna",
    "feedback": null,
    "type": "PASS",
    "requested_date": "2023-09-09",
    "status": "PENDING",
    "user_id": "cljw6ls3p0000mz3d45rjl8p6",
    "user": null,
    "created_at": "2023-07-14T14:17:52.478000+00:00" */}

        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2">Request Id:
          </Typography>
          <Typography>
            {selectedRequest.id.slice(-6).toUpperCase()}
            {/* {selectedRequest.elective_course.course_name} */}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Description:</Typography>
          <Typography
          >
            {selectedRequest.description}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Guest Information:</Typography>
          <Typography
          >
            {selectedRequest.guest_info.split("*_*").join(", ")}
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}>Status:</Typography>
          <Typography>
            {selectedRequest.status}
          </Typography>
          {selectedRequest.feedback &&
            (<>
              <Typography
                variant="h6"
                component="h2"
                sx={{ mt: 2 }}>Feedback:</Typography>
              <Typography>
                {selectedRequest.feedback}
              </Typography>
            </>)
          }


          <div style={{ display: 'flex', justifyContent: 'space-between' }}>


            <Button
              sx={{ mt: 4 }}
              onClick={handleClose}
            >
              Close
            </Button>

            <Button
              onClick={() => handleDeleteRequest(selectedRequest.id)}
              sx={{
                mt: 4, backgroundColor: '#F47B7B',
                '&:hover': {
                  backgroundColor: "#F15555"
                }
              }}
              variant="contained"
            >
              Delete Request
            </Button>

          </div>
        </Box>
      </Modal>
      <CardHeader
        subheader={subheader || "View your history"}
        title={title || "History"}
      />
      <Divider />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  Requested Date
                </TableCell>
                <TableCell>
                  Created Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                // const requestedAt = format(order.requestedAt, 'dd/MM/yyyy');
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');
                /*
                  {
                    "id": "clk23xhqp0007mzh2bc7wq8kt",
                    "description": "",
                    "guest_info": "John Doe*_*Jack Emma*_*Rnge Kit",
                    "feedback": null,
                    "type": "PASS",
                    "requested_date": "2023-07-14",
                    "status": "PENDING",
                    "user_id": "cljw6ls3p0000mz3d45rjl8p6",
                    "user": null,
                    "created_at": "2023-07-14T04:57:06.577000+00:00"
                  },*/
                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>

                      {order.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {order.requested_date}
                    </TableCell>
                    <TableCell>
                      {order.created_at.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedRequest(order)
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

PassRequestTable.prototype = {
  orders: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
  updatePassRequests: PropTypes.func
};
