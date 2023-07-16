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


export const PaymentQRCode = () => (
    <Card sx={{ mb: 6 }}>
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
            <div style={{ marginTop: 10, textAlign: 'center' }}>


                <Typography>
                    Scan the QR Code using any mobile banking application for easy donation
                </Typography>
                <Typography sx={{ marginTop: 4 }}>

                </Typography>
            </div>
        </CardContent>

    </Card>
);
