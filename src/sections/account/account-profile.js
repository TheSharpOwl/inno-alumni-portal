import {
  // Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import Avatar from "boring-avatars";

const user = {
  avatar: '/assets/avatars/avatar-miron-vitold.png',
  city: 'Innopolis',
  country: 'Russian Federation',
  jobTitle: 'Lead Developer',
  name: 'Daniel Atonge',
  company: "sciVenia",
  telegramHandle: "hardriive"
};

export const AccountProfile = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          py: 2
        }}
      >
        <span style={{ marginBottom: 12 }}>
          <Avatar
            variant='beam'
            size={80}
            name={user.name}
          />

        </span>
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.company}, {user.city}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          @{user.telegramHandle}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
