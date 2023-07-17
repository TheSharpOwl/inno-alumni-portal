import { useCallback, useState } from 'react';
import {
    Box,
    Card,
    Typography
} from '@mui/material';


const details = [
    {
        title: "General Notes (TODO)",
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    },
    {
        title: "Eligibility (TODO)",
        value: "Phasellus nisl lectus, porttitor ultrices facilisis non, euismod vehicula diam. "
    },
    {
        title: "Working hours (TODO)",
        value: "Aenean interdum at enim et interdum. Donec sagittis libero lorem, ut aliquam ex sagittis vel. "
    },
    {
        title: "Impromptu Visits (TODO)",
        value: "Nulla quis luctus nibh. Donec ac urna felis. "
    },
    {
        title: "What is more (TODO)",
        value: "Nam varius arcu eu odio pharetra, et auctor risus tincidunt."
    },
]

export const PassRequestInfo = () => {


    return (
        <div style={{ maxWidth: 500}}>
            <Card sx={{ mb: 5 }}>
                <Box sx={{ p: 5 }}>
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
