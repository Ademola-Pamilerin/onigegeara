import { Button, Dialog, CircularProgress, MenuItem, Paper, Stack, Typography, TextField, DialogContent, DialogActions } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { AssignRole, AssignSubjects, deleteTeacher, getAllSubjects, getUnverifiedTeeacher, ResetPassword, studentClass, Switcher } from "../../store/admin-slice"
import SnackBarComponent from "../UI/error"
import { colors } from '../../util/them'


const AdminTeacherCard = props => {

    const [subject, setSubject] = useState(false)
    const [role, setRole] = useState(false)
    const [sub, setSub] = useState("")
    const [cls, setCls] = useState([])
    const [error, shoeErr] = useState(false)
    const [totalError, setTotalError] = useState(null)
    const [message, setMessage] = useState(null)
    const [showMsg, setShowMessage] = useState(false)

    const [roleVal, setRoleVal] = useState([])
    const [singleClass, setSingleClass] = useState("")
    const [dialogDel, setDialogDel] = useState(false)
    const [reload, setReload] = useState(false)
    const [passwordDia, setPasswordDia] = useState(false)
    const [pas, setPass] = useState("")
    const [confirmPas, setConfirmPass] = useState("")

    const dispatch = useDispatch()
    const { id, token, refreshToken } = useSelector(state => state.auth)
    const { admin_subject_loading,
        admin_subjects,
        admin_subject_error, class_loading,
        class: classVal,
        class_error, assign_error,
        assign_loading,
        toggle_error, delete_error, reset_error
    } = useSelector(state => state.admin)


    const subChanged = event => {
        setSub(event.target.value)
    }
    const clsChanged = event => {
        const res = event.target.value
        setCls(typeof (res) === 'string' ? res.split(",") : res)
    }

    const roleValChanged = event => {
        const res = event.target.value
        setRoleVal(typeof (res) === 'string' ? res.split(",") : res)
    }

    const toggle = () => {
        dispatch(Switcher({
            id, token, refreshToken, teacher_id: props._id
        }))
        setReload(true)
    }
    const deleteHandler = () => {
        dispatch(deleteTeacher({ id, token, refreshToken, teacher_id: props._id }))
        setDialogDel(false)
        setReload(true)
    }

    useEffect(() => {
        if (admin_subject_error) {
            shoeErr(true)
            setTotalError(admin_subject_error)
        }
        else if (class_error) {
            shoeErr(true)
            setTotalError(class_error)
        } else if (assign_error) {
            shoeErr(true)
            setTotalError(assign_error)
        }
        else if (toggle_error) {
            shoeErr(true)
            setTotalError(toggle_error)
        }
        else if (delete_error) {
            shoeErr(true)
            setTotalError(delete_error)
        } else if (reset_error) {
            shoeErr(true)
            setTotalError(reset_error)
        }
        else {
            shoeErr(false)
            setTotalError(null)
        }
    }, [admin_subject_error, reset_error, class_error, assign_error, toggle_error, delete_error])

    useEffect(() => {
        if (reload) {
            dispatch(getUnverifiedTeeacher({
                id, token, refreshToken, query: "all"
            }))
        }
    }, [reload, token, refreshToken, id, dispatch])

    const assignSubject = () => {
        setSubject(true)
    }
    const assignRole = () => {
        setRole(true)
    }
    const dialogDelete = () => {
        setDialogDel(true)
    }
    const assign = () => {
        const value = cls.join(",")
        dispatch(AssignSubjects({
            id, token, refreshToken, teacher_id: props._id, data: { subject: sub, class: value }
        }))
        setSubject(false)
        setShowMessage(true)
        setMessage("Done")
    }
    const roleManagemant = () => {
        const role = roleVal.join(",")
        const classVal = cls.join(",")
        dispatch(AssignRole({ id, token, refreshToken, teacher_id: props._id, data: { roles: role, class: classVal } }))
        setRole(false)
        setShowMessage(true)
        setMessage("Done")
        setRoleVal("")
        setCls([])
    }
    const PasswordReset = () => {
        if (!pas) {
            setTotalError("All fields are Reqired")
            shoeErr(true)
            return
        } else if (!confirmPas) {
            setTotalError("All fields are Reqired")
            shoeErr(true)
            return
        } else if (pas !== confirmPas) {
            setTotalError("Passwords are not equal")
            shoeErr(true)
            return
        } else {
            dispatch(ResetPassword({
                id, token, refreshToken, teacher_id: props._id, password: pas
            }))
        }
    }

    useEffect(() => {
        dispatch(getAllSubjects({ id, token, refreshToken }))
        dispatch(studentClass({ id, token, refreshToken }))

    }, [dispatch, id, token, refreshToken])

    return (
        <>
            <SnackBarComponent
                open={error}
                close={() => shoeErr(false)}
                type="error"
                message={totalError}
                duration={10000}
            />
            <SnackBarComponent
                open={showMsg}
                close={() => setShowMessage(false)}
                type="success"
                message={message}
                duration={1000}
            />
            <Dialog open={subject} onClose={() => setSubject(false)}>
                <Stack sx={{
                    width: "auto",
                    padding: "2rem 3rem",
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    height: "auto",
                    alignItems: "center"
                }}>
                    <Typography sx={{
                        textAlign: "center",
                        width: "100%",
                        fontSize: "2rem",
                        fontWeight: "700",
                        margin: "2rem 0px"
                    }}>
                        Assign Subjects to {props.firstname}
                    </Typography>
                    <TextField select onFocus={admin_subjects ? () => { } : () => { dispatch(getAllSubjects({ id, token, refreshToken })) }}
                        value={sub} fullWidth onChange={subChanged}
                        sx={{
                            width: "100%"
                        }}>
                        {admin_subject_loading ? <Stack sx={{
                            padding: "1rem", justifyContent: "center", alignItems: "center"
                        }}><CircularProgress variant={"indeterminate"} /></Stack>
                            : admin_subjects.length > 0 ? admin_subjects.map(el => (
                                <MenuItem value={el._id
                                } key={el._id} >{el.name}</MenuItem>
                            )) : <Stack>No Subject yet</Stack>}
                    </TextField>
                    <TextField
                        SelectProps={{
                            multiple: true
                        }}
                        select onFocus={classVal ? () => { } : () => { dispatch(studentClass({ id, token, refreshToken })) }}
                        value={cls} fullWidth onChange={clsChanged}
                        sx={{
                            width: "100%",
                            margin: "2rem"
                        }}>
                        {class_loading ? <Stack sx={{
                            padding: "1rem", justifyContent: "center", alignItems: "center"
                        }}><CircularProgress variant={"indeterminate"} /></Stack>
                            : classVal.length > 0 ? classVal.map(el => (
                                <MenuItem value={el._id
                                } key={el._id} >{el.name}</MenuItem>
                            )) : <Stack>No class yet</Stack>}
                    </TextField>
                    <Button variant={"contained"} sx={{
                        margin: "1rem 0px",
                        fontSize: "1.4rem"
                    }} onClick={assign}>
                        Assign
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={role} onClose={() => setRole(false)}>
                <Stack sx={{
                    width: "auto",
                    padding: "2rem 3rem",
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    height: "auto",
                    alignItems: "center"
                }}>
                    <Typography sx={{
                        textAlign: "center",
                        width: "100%",
                        fontSize: "2rem",
                        fontWeight: "700",
                        margin: "2rem 0px"
                    }}>
                        Assign Role to {props.firstname}
                    </Typography>
                    <TextField
                        select
                        value={roleVal} fullWidth
                        onChange={roleValChanged}
                        sx={{
                            width: "100%"
                        }}>
                        <MenuItem value={"CLASS TEACHER"}>Class Teacher</MenuItem>
                    </TextField>
                    <TextField
                        SelectProps={{
                            multiple: true
                        }}
                        select onFocus={classVal ? () => { } : () => { dispatch(studentClass({ id, token, refreshToken })) }}
                        value={cls} fullWidth onChange={clsChanged}
                        sx={{
                            width: "100%",
                            margin: "2rem"
                        }}>
                        {class_loading ? <Stack sx={{
                            padding: "1rem", justifyContent: "center", alignItems: "center"
                        }}><CircularProgress variant={"indeterminate"} /></Stack>
                            : classVal.length > 0 ? classVal.map(el => (
                                <MenuItem value={el._id
                                } key={el._id} >{el.name}</MenuItem>
                            )) : <Stack>No class yet</Stack>}
                    </TextField>
                    <Button variant={"contained"} sx={{
                        margin: "1rem 0px",
                        fontSize: "1.4rem"
                    }} onClick={roleManagemant}>
                        Assign
                    </Button>
                </Stack>
            </Dialog>
            <Dialog open={dialogDel} onClose={() => setDialogDel(false)}>
                <DialogContent> Are your sure you want to delete {props.firstname} {props.lastname} Details</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogDel(false)}>Cancel</Button>
                    <Button onClick={deleteHandler}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={passwordDia} onClose={() => setPasswordDia(false)}>
                <Stack sx={{
                    padding: "3rem 3rem",
                    width: "auto",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Typography sx={{
                        margin: "1rem 0",
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        textAlign: "center"
                    }}>Reset {props.firstname + "'s"} password</Typography>
                    <TextField sx={{
                        margin: "1rem",
                        width:"30rem"
                    }} required label={"new password"}
                        value={pas}
                        onChange={(event) => setPass(event.target.value)}>
                    </TextField>
                    <TextField
                        label={"confirm password"}
                        sx={{
                            margin: "1rem",
                            width:"30rem"
                        }}
                        required
                        value={confirmPas}
                        onChange={event => setConfirmPass(event.target.value)}
                    >
                    </TextField>
                    <Button variant={"contained"} sx={{
                        color: "white",
                        backgroundColor: colors.side_blue,
                        "&:hover": {
                            color: colors.side_blue,
                            backgroundColor: "white",
                        }
                    }} onClick={PasswordReset}>Reset</Button>
                </Stack>
            </Dialog>

            <Paper sx={{
                padding: "1ewm 10px",
                margin: "1rem 0px",
                width: "60%",
                boxShadow: ".1px .1px .1px 1px grey"
            }}>
                <Typography sx={{
                    width: "100%",
                    textAlign: "center",
                    margin: "1rem 0px",
                    fontSize: "2rem"
                }}>{props.firstname} {props.lastname}</Typography>
                <Stack sx={{
                    width: "100%",
                    flexFlow: "row wrap",
                    flexDirection: "row-reverse",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>
                    <Button onClick={dialogDelete}>Delete</Button>
                    <Button onClick={toggle}>{props.verified ? "Disable" : "Enable"}</Button>
                    {/* <Button onClick={assignRole}>Assign Role</Button> */}
                    <Button onClick={assignSubject} >Assign Subjects</Button>
                    <Button onClick={() => setPasswordDia(true)} >Reset Password</Button>

                </Stack>
            </Paper></>
    )
}
export default AdminTeacherCard