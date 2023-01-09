import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { studentClass } from "../../store/admin-slice"
import SnackBarComponent from "../UI/error"
import { AdminAction } from "../../store/admin-slice"
import { request_url } from "../../util/base-url"


const NewStudent = () => {

    const [Totalerror, setTotalError] = useState(null)
    const [showErr, setShowErr] = useState(false)
    const firstnameRef = useRef(null)
    const lastnameRef = useRef(null)
    const regNoRef = useRef(null)
    const genderRef = useRef(null)
    const classRef = useRef(null)
    const dispatch = useDispatch()
    const { id, token, refreshToken } = useSelector(state => state.auth)
    const { class_loading, class_error, class: classes } = useSelector(state => state.admin)
    const [gender, setGender] = useState("")
    const [classVal, setClassVal] = useState("")
    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState()

    const focused = () => {
        if (!classes) {
            dispatch(studentClass({
                id, token, refreshToken
            }))
        }
    }
    const genderChanged = (event) => {
        if (event.target.value == "") {
            return
        } else {
            setGender(event.target.value)
        }
    }
    const classChanged = (event) => {
        if (event.target.value == "") {
            return
        } else {
            setClassVal(event.target.value)
        }
    }
    useEffect(() => {
        dispatch(studentClass({
            id, token, refreshToken
        }))
    }, [dispatch, id, token, refreshToken])

    useEffect(() => {
        if (class_error) {
            setTotalError(check_error)
            setShowErr(true)
        }
    }, [class_error])

    const RegisterNewStudent = async () => {
        const firstname = firstnameRef.current.value
        const lastname = lastnameRef.current.value
        const regNo = regNoRef.current.value
        if (!firstname || firstname.trim() == "") {
            setTotalError("Please provide value in First Name field")
            setShowErr(true)
            return;
        }
        if (!lastname || lastname.trim() == "") {
            setTotalError("Please provide value in Last Name field")
            setShowErr(true)
            return;
        }
        if (!regNo || regNo.trim() == "") {
            setTotalError("Please provide value in Registration Number field")
            setShowErr(true)
            return;
        }
        if (!gender || gender.trim() == "null") {
            setTotalError("Please provide value in Gender field")
            setShowErr(true)
            return;
        }
        if (!classVal || classVal.trim() == "null") {
            setTotalError("Please provide value in Gender field")
            setShowErr(true)
            return;
        }
        else {
            const value = JSON.stringify({ firstname, lastname, gender, regNo, class: classVal })
            dispatch(AdminAction.showStudentNotification({ type: "loading" }))
            try {
                const response = await fetch(`${request_url}/user/register`, {
                    method: "POST",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
                    body: value
                })
                if (!response.ok) {
                    const err = await response.json();
                    if (!err) {
                        throw new Error("Request failed!");
                    } else if (err.message === "Failed to fetch") {
                        throw new Error("Please check you internet connection");
                    }
                    else {
                        throw new Error(err.message);
                    }
                }
                const data = await response.json();
                localStorage.setItem("Token", data.token)
                localStorage.setItem("Refresh_Token", data.refresh_token)
                localStorage.setItem("Id", id)
                dispatch(AdminAction.showStudentNotification({
                    type: "success",
                }))
                firstnameRef.current.value = ""
                lastnameRef.current.value = ""
                setClassVal("")
                setGender("")
                regNoRef.current.value = ""
                setShowMessage(true)
                setMessage("Student Profile Created Successfully")


            }
            catch (error) {
                dispatch(AdminAction.showStudentNotification({
                    type: "error",
                    error: error.message
                }))
                setShowErr(true)
                setTotalError(error.message)
            }
        }
    }



    return (<>
        <SnackBarComponent
            open={showErr}
            message={Totalerror}
            close={() => setShowErr(false)}
            type={"error"}
            duration={100000}
        />
        <SnackBarComponent
            open={showMessage}
            message={message}
            close={() => setShowMessage(false)}
            type={"success"}
            duration={1000}
        />
        <Stack sx={{
            width: "auto",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "5rem 5rem"
        }}>
            <Typography sx={{
                textAlign: "center",
                margin: "0rem 0px 1rem 0px ",
                fontSize: "2.4rem",
                fontWeight: "700"
            }}>Create A new Student</Typography>
            <TextField inputRef={firstnameRef} sx={{
                width: "30rem",
                margin: ".6rem 0px"
            }} label={"First Name"} helperText="please enter first name" />
            <TextField inputRef={lastnameRef} sx={{
                width: "30rem",
                margin: ".6rem 0px"
            }} label={"Last Name"} helperText="please enter last name" />
            <TextField inputRef={regNoRef} sx={{
                width: "30rem",
                margin: ".6rem 0px"
            }} label={"Reg No"} helperText="please enter registration number" />
            <TextField onChange={genderChanged} value={gender} sx={{
                width: "30rem",
                margin: ".6rem 0px"
            }} label={"Gender"} helperText="please enter choose student gender" select >
                <MenuItem value>--chose a gender--</MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
            </TextField>
            <TextField
                onChange={classChanged}
                onFocus={focused}
                value={classVal} select sx={{
                    width: "30rem",
                    margin: ".6rem 0px"
                }} label={"Student Class"} helperText="please choose student class">
                {class_loading ? <Stack sx={{
                    height: "100vh", justifyContent: "center", alignItems: "center"
                }}><CircularProgress variant={"indeterminate"} /></Stack> : classes.length > 0 ? classes.map(el => (
                    <MenuItem value={el._id
                    } key={el._id} >{el.name}</MenuItem>
                )) : <Stack>No class yet</Stack>}
            </TextField>
            <Box sx={{
                width: "30rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem 0px"
            }}>
                <Button
                    onClick={RegisterNewStudent}
                    variant={"contained"} sx={{
                        width: "50%",
                        fontSize: "1.5rem",
                        fontWeight: "600"
                    }}>Create</Button>
            </Box>
        </Stack>
    </>
    )
}
export default NewStudent