import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Modal,
  Typography,
  Button,
  SvgIcon,
  TextField,
  CardHeader
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useCallback, useEffect, useState } from 'react';
import { createElectiveCourse, deleteElectiveCourse, getAllElectiveCoursesAdmin, updateElectiveCourse } from '../../api';
import { PlusIcon } from '@heroicons/react/24/solid';

const states = [
  {
    value: 'ONLINE',
    label: 'ONLINE'
  },
  {
    value: 'OFFLINE',
    label: 'OFFLINE'
  },
  {
    value: 'HYBRID',
    label: 'HYBRID'
  }
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  bgcolor: 'background.paper',
  border: '3px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const initialState = {
  "id": "",
  "course_name": "",
  "instructor_name": "",
  "mode": "ONLINE",
  "description": ""
}
export const ElectivesTable = (props) => {
  const {
    title
  } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [electives, setElectives] = useState([]);

  const [values, setValues] = useState(initialState)

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const deleteElective = async () => {
    const { id } = values;
    const deletedElective = await deleteElectiveCourse({ courseId: id })
    console.log(deletedElective);

    const filteredElectives = electives.filter(elective => elective.id !== deletedElective.id)
    setElectives(filteredElectives)
    handleClose()
  }

  const createElective = async () => {
    const { course_name, instructor_name, mode, description } = values;
    const data = {
      course_name, instructor_name, mode, description
    }
    const createdElective = await createElectiveCourse({ data })
    console.log(createdElective);

    setElectives((prev) => [...prev, createdElective])
    handleClose()
  }

  const updateElective = async () => {
    const { id, course_name, instructor_name, mode, description } = values;
    const data = {
      course_name, instructor_name, mode, description
    }
    const updatedElective = await updateElectiveCourse({ courseId: id, data })
    console.log(updatedElective);
    const filteredElectives = electives.filter(elective => elective.id !== id)
    setElectives([...filteredElectives, updatedElective])
    handleClose()
  }

  const loadingElectives = async () => {
    const userElectives = await getAllElectiveCoursesAdmin()
    setElectives(userElectives)
  }
  useEffect(() => {
    loadingElectives()
  }, [])

  return (
    <Card>
      <Modal keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          {/* "id": "",
    "course_name": "",
    "instructor_name": "",
    "mode": "",
    "description": "" */}
          <Typography variant="h6"
            component="h2"
            sx={{ mb: 2 }}> {values.id ? "Modify" : "Create"} Elective Course</Typography>
          <TextField
            fullWidth
            label="Course Name"
            name="course_name"
            onChange={handleChange}
            required
            value={values.course_name}
            sx={{
              mb: 3
            }}
          />

          <TextField
            fullWidth
            label="Instructor Name"
            name="instructor_name"
            onChange={handleChange}
            required
            value={values.instructor_name}
            sx={{
              mb: 3
            }}
          />

          <TextField
            fullWidth
            label="Delivery mode"
            name="mode"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={values.mode}
            sx={{
              mb: 3
            }}
          >
            {states.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Description"
            name="description"
            onChange={handleChange}
            required
            value={values.description}
            sx={{
              mb: 3
            }}
            multiline
          />



          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ mt: 4 }}
              onClick={handleClose}
            >
              Close
            </Button>
            {values.id ? (
              <Button
                onClick={updateElective}
                sx={{
                  mt: 4
                }}
                variant="contained"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={createElective}
                sx={{
                  mt: 4
                }}
                variant="contained"
              >
                Create
              </Button>

            )}
            {values.id && (
              <Button
                onClick={deleteElective}
                sx={{
                  mt: 4, backgroundColor: '#F47B7B',
                  '&:hover': {
                    backgroundColor: "#F15555"
                  }
                }}
                variant="contained"
              >
                Delete
              </Button>
            )}

          </div>
        </Box>
      </Modal>
      <CardHeader action={
        (<Button
          onClick={() => {
            setValues(initialState)
            handleOpen()
          }}
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          )}
          variant="contained"
        >
          Add
        </Button>)} />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>

                {/* {
    "id": "cljvtw53m0000mznxa5cmb0hq",
    "course_name": "Design-thinking ",
    "instructor_name": "Pavel Voloschuk",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque eget ex ut ullamcorper. Quisque rutrum risus at nunc facilisis, a aliquet odio volutpat. Sed sollicitudin nunc non elementum bibendum. Ut eget ornare nisi. Ut ullamcorper iaculis sagittis. Nulla hendrerit accumsan semper. Aliquam magna orci, condimentum vitae cursus ac, dictum eu urna. ",
    "mode": "OFFLINE"
  }, */}

                <TableCell>
                  Course ID
                </TableCell>
                <TableCell>
                  Course Name
                </TableCell>
                <TableCell>
                  Instructor Name
                </TableCell>
                <TableCell>
                  Mode
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {electives.map((elective) => {

                return (
                  <TableRow
                    hover
                    key={elective.id}
                  >
                    <TableCell>
                      {elective.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {elective.course_name}
                    </TableCell>
                    <TableCell>
                      {elective.instructor_name}
                    </TableCell>

                    <TableCell>
                      {elective.mode}
                    </TableCell>
                    <TableCell>
                      {elective.description.length <= 18 ? elective.description : (elective.description.substr(0, 18) + "...")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setValues(elective)
                          handleOpen()
                        }}
                        startIcon={(
                          <SvgIcon fontSize="small">

                            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: 16, width: 16 }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                          </SvgIcon>
                        )}
                      >
                        Modify
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

ElectivesTable.propTypes = {
  title: PropTypes.string,
};
