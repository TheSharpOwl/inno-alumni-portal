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
    Unstable_Grid2 as Grid
} from '@mui/material';



export const SuggestDonationInterest = () => {
    const [values, setValues] = useState({
        firstName: 'Anika',
        lastName: 'Visser',
        email: 'd.atonge@innopolis.university',
        phone: '',
        state: 'los-angeles',
        country: 'USA'
    });

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

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
                                    onChange={handleChange}
                                    required
                                    value={"I will love to support students in need"}
                                    multiline
                                    rows={8}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
