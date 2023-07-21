import { useCallback, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Typography
} from '@mui/material';
import { makeDonationText } from '../../api';



export const SuggestDonationInterest = () => {
    const [message, setMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        const donation = {
            message
        }
        await makeDonationText({ donation })
        setMessage("")
    }

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
        >
            <Card>
                <CardHeader
                    title="Description"
                    subheader="How will you want your funds to be used:"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Typography sx={{ px: 1.5, color: 'grey' }} variant="body2">
                            Add the reference number of your donation and include a brief description of how you want your funds to be used
                        </Typography>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    name="description"
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    placeholder={"[RefNo: 294387479937794] \nI will love to support students in need"}
                                    multiline
                                    rows={6}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button type='submit' variant="contained">
                        Send Donation Interest
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
