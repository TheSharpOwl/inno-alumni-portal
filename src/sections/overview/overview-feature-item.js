import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  Typography
} from '@mui/material';

const statusMap = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error'
};
export const OverviewFeatureItem = (props) => {
  const { feature = {}, sx } = props;

  return (
    <Card sx={{ ...sx, width: 345 }}>
      <Box sx={{ padding: 4, display: 'flex' }}>
        <div>
          <Typography
            gutterBottom
            variant="h5"
            color="#40BA21"
          >
            {feature.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ width: 165 }}
          >
            {feature.description}
          </Typography>
        </div>
        <img style={{ paddingLeft: 15 }}
          alt={`${feature.title} image`}
          src={feature.img} />
      </Box>
    </Card >
  );
};

OverviewFeatureItem.prototype = {
  feature: PropTypes.object,
  sx: PropTypes.object,
};
/* <div className="grid grid-cols-2 items-center bg-[#FFFFFF] h-[180px] w-[350px] rounded-lg shadow-lg text-start">
            <div className="pl-8">
              <h2 className="text-[#40BA21] font-bold text-[24px]" key={component.title}>{component.title}</h2>
              <p key={component.title}>{component.description}</p>
            </div>
            <div key={component.title} className={component.img}></div>
          </div> */