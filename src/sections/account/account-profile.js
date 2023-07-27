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
import { useAuth } from 'src/hooks/use-auth';

export const AccountProfile = () => {

  const { user } = useAuth();
  return (
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
          {
            user.company && user.city &&
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {user.company}, {user.city}
            </Typography>

          }
          {
            user.telegramHandle &&
            (<Typography
              color="text.secondary"
              variant="body2"
            >
              @{user.telegramHandle}
            </Typography>)
          }
        </Box>
      </CardContent>
    </Card>
  );
}
