import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Stack, InputAdornment, MenuItem, Typography, CircularProgress, Snackbar, SnackbarContent, Alert } from '@mui/material'
import { colors } from '../../util/them'
import { createExamStore, fetchTeacherSubject } from '../../store/teacher-slice'
import { useRouter } from 'next/router'
import { checkStatus } from '../../store/auth-slice'


const NewExamComponent = () => {
    const [values, setValues] = useState("")
    const [classes, setClasses] = useState([])
    const [duration, setDuration] = useState("")
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    const teacher_details = useSelector(state => state.teacher)
    const auth_details = useSelector(state => state.auth)
    const router = useRouter()
    const { id, token, refreshToken, check_loading, isAuthenticated } = auth_details


    const handleChange = (event) => {
        const res = event.target.value
        setValues(res)
    }
    const handleSecondChange = (event) => {
        const res = event.target.value
        setClasses(typeof (res) === 'string' ? res.split(",") : res)
    }
    const handleDuration = (event) => {
        const res = event.target.value
        setDuration(res)
    }
    const createExam = () => {
        const data = {
            subjectId: values,
            class: classes,
            time: duration
        }
        dispatch(createExamStore({
            id, token, refreshToken,
            data
        }))
        setValues("")
        setClasses([])
        setDuration("")
    }

    const focused = () => {
        console.log("focused")
        if (!teacher_details.loading && !teacher_details.subject || !teacher_details.classes) {
            console.log("focusing")
            dispatch(fetchTeacherSubject({
                id, token, refreshToken
            }))
        }
    }


    useEffect(() => {
        dispatch(checkStatus())
    }, [dispatch])


    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTeacherSubject({
                id, token, refreshToken
            }))
        } else if (!check_loading && !isAuthenticated) {
            router.replace("/teacher")
        }
    }, [dispatch, id, token, refreshToken, isAuthenticated, check_loading, router])
    const { submit_message } = teacher_details
    useEffect(() => {
        if (submit_message) {
            setOpen(true)
        }
    }, [submit_message])


    let val = <Stack sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }}><CircularProgress variant='indeterminate' /></Stack>
    let val1 = <Stack sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }}><CircularProgress variant='indeterminate' /></Stack>

    if (teacher_details.subject && (!teacher_details.subject_loading && !teacher_details.subject_error)) {
        if (teacher_details.subject.length > 0) {
            val = teacher_details.subject.map(el => (
                <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
            ))
        } if (teacher_details.classes.length > 0) {
            val1 = teacher_details.classes.map(el => (
                <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
            ))
        }
    }



    return (
        <>
            <Snackbar open={open} onClose={() => setOpen(false)} message={"Successfully created an exam"} anchorOrigin={{ vertical: "top", horizontal: "right" }} />
            <Stack sx={{
                margin: "1rem 0px",
                display: "flex",
                width: "80%",
                flexFlow: "row wrap",
                justifyContent: "space-evenly",
                padding: "2rem 0"
            }}>

                <TextField
                    onFocus={focused}
                    sx={{
                        width: "40%",
                        fontSize: "2rem"
                    }}
                    label={<Typography sx={{
                        fontSize: "1.5rem",
                        fontWeight: "600"
                    }}>Subject</Typography>}
                    select
                    fullWidth
                    value={values}
                    onChange={handleChange}
                    SelectProps={{
                        multiple: false
                    }}
                    helperText="Please Pick Subject"
                >
                    {val}
                </TextField>
                <TextField
                    onFocus={focused}
                    label={<Typography sx={{
                        fontSize: "1.5rem",
                        fontWeight: "600"
                    }}>Class</Typography>}
                    sx={{
                        width: "40%"
                    }}
                    select
                    fullWidth
                    value={classes}
                    onChange={handleSecondChange}
                    SelectProps={{
                        multiple: true
                    }}
                    helperText={"Please Pick Subject"}
                >
                    {val1}
                </TextField>
                <TextField
                    sx={{
                        width: "40%",
                        marginTop: ".6rem"
                    }}
                    fullWidth
                    onChange={handleDuration}
                    SelectProps={{
                        multiple: true
                    }}
                    value={duration}
                    helperText={"Please Enter Exam Duration in Minutes"}
                    InputProps={{
                        placeholder: "00:00",
                        endAdornment: <InputAdornment position='end'>Min</InputAdornment>
                    }}
                >
                </TextField >
                <Button variant={"contained"} sx={{
                    width: "40%",
                    marginTop: ".6rem",
                    height: "3.5rem"
                }}
                    onClick={createExam}
                >Create Exam</Button>
            </Stack >
        </>
    )
}
export default NewExamComponent