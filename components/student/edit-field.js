import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { studentClass } from "../../store/admin-slice"
import SnackBarComponent from "../UI/error"
import { AdminAction } from "../../store/admin-slice"
import { request_url } from "../../util/base-url"


const UpdateStudent = (props) => {

    const [Totalerror, setTotalError] = useState(null)
    const [showErr, setShowErr] = useState(false)
    const [firstname, setFirstPame] = useState(props.firstname)
    const [lastname, setLastName] = useState(props.lastname)
    const [regNo, setRegNo] = useState(props.regNo)
    const dispatch = useDispatch()
    const { id, token, refreshToken } = useSelector(state => state.auth)
    const { class_loading, class_error, class: classes } = useSelector(state => state.admin)
    const [gender, setGender] = useState(props.gender ? props.gender : "")
    const [classVal, setClassVal] = useState(props.class_id)
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
    const lastnameChanged = (event) => {
        setLastName(event.target.value)
    }

    const firstnameChanged = event => {
        setFirstPame(event.target.value)
    }

    const regNoChanged = event => {
        setRegNo(event.target.value)
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

    const UpdateStudentRecord = async () => {

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
                const response = await fetch(`${request_url}/user/update/${props.id}`, {
                    method: "PUT",
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
                localStorage.setItem("Id", data.id)
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

    console.log(props.firstname, props.class_id)


    return (<>
        <SnackBarComponent
            open={showErr ? showErr : showMessage ? showMessage : false}
            message={showErr ? Totalerror : showMessage ? message : ""}
            close={showErr ? () => setShowErr(false) : showMessage ? () => setMessage(false) : () => { }}
            type={"error"}
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
            }}>Edit {props.firstname} Details</Typography>
            <TextField value={firstname} onChange={firstnameChanged} sx={{
                width: "30rem",
                margin: ".6rem 0px"
            }} label={"First Name"} helperText="please enter first name" />
            <TextField value={lastname} onChange={lastnameChanged} sx={{
                width: "30rem",
                margin: ".6rem 0px"
            }} label={"Last Name"} helperText="please enter last name" />
            <TextField onChanged={regNoChanged} value={regNo} sx={{
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
                    onClick={UpdateStudentRecord}
                    variant={"contained"} sx={{
                        width: "50%",
                        fontSize: "1.5rem",
                        fontWeight: "600"
                    }}>Update</Button>
            </Box>
        </Stack>
    </>
    )
}
export default UpdateStudent