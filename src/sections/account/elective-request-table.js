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
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error'
};

export const ElectiveRequestTable = (props) => {
  const { orders = [], title, subheader } = props;

  return (
    <Card >
      <CardHeader
        subheader={subheader || "View your history"}
        title={title || "History"}
        style={{ paddingLeft: 40 }}
      />
      <Divider />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ paddingLeft: 40 }}>
                  Id
                </TableCell>
                <TableCell>
                  Requested Elective
                </TableCell>
                <TableCell>
                  Created Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                // const requestedAt = format(order.requestedAt, 'dd/MM/yyyy');
                // const createdAt = format(order.createdAt, 'dd/MM/yyyy');
                /*
                  {
    "id": "cljvu9hpy0001mzel0ai0cxyk",
    "feedback": null,
    "status": "PENDING",
    "user_id": "cljvjzrpa0000mz1dnsmzx5kd",
    "user": null,
    "course_id": "cljvtv4d00000mzyzwtvijk8d",
    "elective_course": null,
    "created_at": "2023-07-09T19:39:53.206000+00:00",
    "updated_at": "2023-07-09T19:39:53.206000+00:00"
  },*/
                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell style={{ paddingLeft: 40 }}>

                      {order.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {order?.elective_course?.course_name}
                    </TableCell>
                    <TableCell>
                      {order.created_at.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

ElectiveRequestTable.prototype = {
  orders: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string
};
