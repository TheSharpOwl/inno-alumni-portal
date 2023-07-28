import { useCallback, useState } from 'react';
import {
    Box,
    Card,
    Typography
} from '@mui/material';


const details = [
    {
        title: "General Notes",
        value: "Your pass will be ready at the reception desk of the University Main building. You will need to inform the receptionist that you booked a pass via the Alumni Portal System and provide your name."
    },
    {
        title: "Eligibility",
        value: "All alumni having access to this platform are eligible to create a request for a pass to have access to the University campus."
    },
    {
        title: "Working hours",
        value: "University passes are issued Monday - Friday, 9:00 - 18:00. Make sure the status of your request is APPROVED before coming physically to the University Campus. Scroll below to see the status of your pass request."
    },
    {
        title: "Impromptu Visits",
        value: "For such visits, use the Alumni telegram bot @InnoAlumniBot. It has the ability to ask volunteers to help you out with entering the university in a timely manner."
    },
    {
        title: "What is more",
        value: "Please, do not forget to hold identification documents for all individuals concerned when visiting the University Campus. Usually, your request should be processed within 2 working days from the day you issued the request."
    },
]

export const PassRequestInfo = () => {


    return (
        <div style={{ maxWidth: 500 }}>
            <Card sx={{ mb: 5 }}>
                <Box sx={{ px: 5, py: 3 }}>
                    <div>
                        {details.map(({ title, value }, i) => (
                            <div key={i}>
                                <Typography
                                    sx={{ mt: 2 }}
                                    variant="h6"
                                    component="h2">{title}:
                                </Typography>
                                <Typography>
                                    {value}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Box>

            </Card>
        </div>
    );
};
