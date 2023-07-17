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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuth } from 'src/hooks/use-auth';

export const CreatePassRequest = ({ sendRequest }) => {
  const { user } = useAuth();
  const [requestDate, setRequestDate] = useState(new Date())
  const [guestInput, setGuestInput] = useState("")
  const [guests, setGuests] = useState([user.name]);
  const [description, setDescription] = useState("")

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
  const handleDeleteGuest = (i) => {
    const newGuests = guests.filter((guest, index) => index !== i)
    setGuests(newGuests)
  }

  const handleMakeRequest = async () => {
    const request = {
      requested_date: requestDate.toISOString().split('T')[0],
      guests,
      description,
    }
    sendRequest({ request })

    setRequestDate(new Date())
    setGuestInput("")
    setGuests([])
    setDescription("")
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      style={{ minWidth: 600 }}
    >
      <Card>
        <CardHeader
          subheader="Create a new pass request"
          title="Request a Pass"
          sx={{ m: 1.5 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 1.5 }}>
            <div>
              <DatePicker

                label="Request Date"
                value={requestDate}
                onChange={(newValue) => {
                  setRequestDate(newValue);
                }}
                renderInput={({ InputProps, ...params }) =>
                  <div style={{ display: 'flex', }}>
                    <TextField {...params}
                      name="requestDate"
                      required
                      helperText="Please specify the date you wish to visit the university" />
                    <div
                      style={{ marginLeft: 30, border: '2px solid #6366F1', display: 'flex', borderRadius: 10, justifyContent: 'center', alignItems: "center", paddingRight: 20, height: 56, backgroundColor: '#FFFFFF' }}
                    >{InputProps?.endAdornment}
                    </div>
                  </div>
                }
              />


            </div>
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <TextField
                style={{ marginRight: 30 }}
                helperText="Enter the full names of your guests"
                label="Guest Name"
                name="guestName"
                onChange={(e) => setGuestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && guestInput !== '') {
                    setGuests((prev) => [...prev, guestInput])
                    setGuestInput("")
                  }
                }}
                value={guestInput}

              />

              <Button
                style={{ height: 56, border: "2px solid #6366F1" }}
                onClick={(e) => {
                  if (guestInput !== '') {
                    setGuests((prev) => [...prev, guestInput])
                    setGuestInput("")
                  }
                }} >
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </Button>
            </div>
            <div style={{ display: 'flex', flexWrap: "wrap", gap: 10, marginTop: '30px' }}>
              {guests.map((guest, i) => (
                <div key={`${guest}-${i}`}
                  style={{ border: '2px solid #41BA21', borderRadius: '8px', padding: "10px 16px", display: 'flex', alignItems: 'center' }}
                >
                  <span>
                    {guest}

                  </span>
                  {(user.name !== guest) && (<span
                    onClick={() => handleDeleteGuest(i)}
                    style={{ cursor: 'pointer' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="#C75146"
                      style={{ marginLeft: 8, width: 30, height: 30, display: 'flex', alignItems: 'center' }}>
                      <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>)
                  }

                </div>

              ))}
            </div>
            <div style={{ marginTop: '40px' }}>
              <TextField
                fullWidth
                helperText="Share your situation so your demand could be processed accurately"
                label="Brief Description (Optional)"
                name="description"
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end', mx: 3.5, py: 3 }}>
          <Button variant="contained"
            onClick={handleMakeRequest}>
            Make Request
          </Button>
        </CardActions>
      </Card>
    </form >
  );
};
