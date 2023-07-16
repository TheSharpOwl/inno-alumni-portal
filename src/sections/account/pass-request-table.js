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

export const PassRequestTable = (props) => {
  const { orders = [], title, subheader } = props;

  return (
    <Card >
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

PassRequestTable.prototype = {
  orders: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string
};
