import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

const user = {
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Daniel Atonge',
    timezone: 'GTM-7'
};

export const UploadDonationQRCode = () => (
    <Card>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <img
                    style={{ borderRadius: 20, height: 300 }}
                    alt=""
                    src="/assets/donations/qr-code.jpg"
                />

            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                fullWidth
                variant="text"
            >
                Upload new QR Code
            </Button>
        </CardActions>
    </Card>
);
