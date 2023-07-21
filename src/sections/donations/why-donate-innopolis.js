import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Card,
    Typography
} from '@mui/material';
import { getAdminDonationText } from '../../api';


const details = [
    {
        title: "Alumni Engagement and Networking",
        value: "Innopolis University often organize events, reunions, and networking activities for the alumni community. Alumni donations can help fund these initiatives, allowing for stronger alumni engagement, mentorship opportunities, and career networking events."
    },
    {
        title: "Student Support Services",
        value: "Contributions from alumni can support various students in need of assistance, this includes financial aid, mentorship programs, and much more. These resources will help students thrive academically, and professionally during their time at the university."
    },
    {
        title: "Community Outreach and Public Service",
        value: "Innopolis University has community outreach programs and initiatives to address social issues and assist underserved populations. Alumni donations can support these endeavors, enabling the university to have a positive impact on the broader community."
    },
    {
        title: "Athletics and Sports Programs",
        value: "Innopolis University has sports teams and athletic programs that need contributions for funding. Donations can support team travel, coaching staff, and facility maintenance, ensuring that student-athletes have access to competitive opportunities."
    },
]

export const WhyDonateInnopolis = () => {
    const [donationText, setDonationText] = useState("Loading...")
    const handleGetAdminDonationText = async () => {
        const { message } = await getAdminDonationText()
        setDonationText(message)
    }

    useEffect(() => {
        handleGetAdminDonationText();
    }, [])
    return (
        <div>
            <Card sx={{ mb: 1 }}>
                <Box sx={{ p: 5 }}>
                    <div>
                        <Typography
                            variant="h5"
                            component="h2"
                        >
                            Why and for what do we need donations?
                        </Typography>
                        <div dangerouslySetInnerHTML={{ __html: donationText }}>
                        </div>
                        {/* {details.map(({ title, value }, i) => (
                            <div key={i}>
                                <Typography
                                    sx={{ mt: 4 }}
                                    variant="h6"
                                    component="h2">{title}:
                                </Typography>
                                <Typography sx={{ mt: 1 }}>
                                    {value}
                                </Typography>
                            </div>
                        ))} */}
                    </div>
                </Box>

            </Card>
        </div>
    );
};
