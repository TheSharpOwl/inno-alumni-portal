import { useCallback, useState, useRef, useEffect } from 'react';
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
import { Editor } from '@tinymce/tinymce-react';
import { getAdminDonationText, upsertAdminDonationText } from 'src/api'


export const UpdateDonationInformation = () => {
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


    const editorRef = useRef(null);
    const [dirty, setDirty] = useState(false)
    const [donationText, setDonationText] = useState("<p>Loading....</p>")

    useEffect(() => setDirty(false), [donationText])
    const handleGetAdminDonationText = async () => {
        const { message } = await getAdminDonationText()
        // console.log(message)
        setDonationText(message)
    }

    const handleSetAdminDonationText = async (e) => {
        e.preventDefault()
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            setDirty(false)
            editorRef.current.setDirty(false)

            // console.log(content)
            const donation = {
                message: content,
            }
            const responseDonation = await upsertAdminDonationText({ donation })
            // console.log(responseDonation)
        }
    }

    useEffect(() => {
        handleGetAdminDonationText()
    }, [])
    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleSetAdminDonationText}
        >
            <Card>
                <CardHeader
                    title="Description"
                    subheader="Answer to the question: Why and for what do we need donations?"
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Typography sx={{ px: 1.5, color: 'grey' }} variant='body2'>This answer will be displayed on the Alumni Donation page</Typography>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <Editor
                                    apiKey='06j1sdk82snkig4i7v5u03ne6nrs1dabbh9ftqntbcutrvv6'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={donationText}
                                    onDirty={() => setDirty(true)}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                            </Grid>

                        </Grid>
                        {dirty && <Typography sx={{ px: 1.5, color: 'red' }} variant='body2'>You have unsaved content!</Typography>}
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button disabled={!dirty} type='submit' variant="contained">
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
