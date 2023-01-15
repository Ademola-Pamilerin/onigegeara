import {
    Avatar,
    Button,
    CircularProgress,
    Paper,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Box,
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText
} from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import { colors } from "../../util/them"
import StudentField from "./student-field"
import StudentExams from "./student_exams"
import { useSelector, useDispatch } from "react-redux"
import { getStudentExams } from '../../store/student-slice'
import SnackBarComponent from "../UI/error"
import { Logout } from "@mui/icons-material"
import { logoutStudent } from "../../store/auth-slice"
import { useRouter } from 'next/router'
import Image from "next/image"


const StudentComponent = (props) => {
    const student_details = useSelector(state => state.student)
    const auth_details = useSelector(state => state.auth)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [showdialog, setShowDialog] = useState(false)
    const nameVal = [
        { field: "Name", value: student_details.name },
        { field: "Adm No", value: student_details.admNo },
        { field: "Class", value: student_details.class },
        { field: "Sex", value: "MALE" },
    ]
    const router = useRouter()



    const fetchExam = () => {
        setShow(prev => !prev)

        dispatch(getStudentExams({
            token: auth_details.token,
            id: student_details.id,
            refreshToken: auth_details.refreshToken,
            class: student_details.class
        }))

    }

    const handleClose = () => {
        setOpen(false)
    }

    const logOutHandler = () => {
        dispatch(logoutStudent())
        router.replace("/student")
    }

    const { examErr: error, examLoading: loading, name, exams } = student_details
    const avatar1 = name ? name.split(" ")[0] : ""
    const avatar2 = name ? name.split(" ")[1] : ""
    const value1 = avatar1[0]
    const value2 = avatar2[0]
    const result = value1 + value2
    useEffect(() => {
        if (error) {
            setOpen(true)
        }
    }, [error])


    return <Stack sx={{
        height: "auto",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }}>

        <Dialog open={showdialog} onClose={() => setShowDialog(false)}>
            <DialogTitle>Log out</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to log out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {auth_details.loading ?
                    <>logging out <CircularProgress variant={"indeterminate"} aria-busy={true} /> </>
                    : <><Button variant={"contained"} onClick={() => setShowDialog(false)}>Cancel</Button>
                        <Button variant={"contained"} onClick={logOutHandler}>Log out</Button></>}
            </DialogActions>
        </Dialog>
        <SnackBarComponent
            close={handleClose}
            open={open && (error !== null || "")}
            type={"error"}
            duration={6000}
            message={error}
        />

        <Box sx={{
            position: "fixed",
            bottom: 0,
            height: "100vh",
            top: "75%",
            left: "3%",
        }}>
            <SpeedDial
                ariaLabel="SpeedDial for logging out and viewing exam"
                sx={{ position: "absolute" }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    icon={<Logout />}
                    tooltipTitle={"Log Out"}
                    onClick={() => setShowDialog(true)}
                />
            </SpeedDial>
        </Box>
        <Stack
            sx={{
                flexFlow: "row",
                backgroundColor: colors.side_blue,
                height: "10vh",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                color: "white",
                padding: "1rem 2rem",
                fontWeight: 700,
                margin: "1rem 0px",
                borderRadius: "25px",
                cursor: "pointer"
            }}
        >
            <span style={{
                color: "white",
                cursor: "pointer"
            }}>
                STUDENT PROFILE
            </span>
            <span style={{ color: "rgba(255, 122, 0, 1)" }}>||</span>
            <span style={{
                color: colors.backgroun_color,
                cursor: "pointer"
            }} onClick={() => window.scrollTo(0, 200)}>COMPUTER BASED TEST</span>
        </Stack>
        <Stack sx={{
            width: "100%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        }}>
            <Stack sx={{
                position: "absolute",
                width: "100%",
                zIndex: -1
            }}>
                <Box sx={{
                    width: "100%",
                    height: "70vh",
                    position: "relative"
                }}>
                    <Image src={require("../../static/ogac-1.png")} alt={"Student Dahboard image"} layout="fill" objectFit="cover" objectPosition={"center center"} />
                </Box>
            </Stack>
            <Paper sx={{
                position: "relative",
                zIndex: 10,
                backgroundColor: colors.backgroun_color,
                width: "50%",
                display: "flex",
                flexFlow: "column",
                justifyContent: 'space-evenly',
                alignItems: "center",
                margin: "2rem 0px",
                borderRadius: "20px",
                boxShadow: ".1px .1px .1px 1px " + colors.backgroun_color
            }}>
                <Avatar sx={{
                    height: '155px',
                    width: "155px",
                    fontSize: "4rem",
                    margin: "10px 0px",
                    backgroundColor: colors.side_blue,
                    color: "white"
                }}>{result}
                </Avatar>
                {nameVal.map(el => (
                    <Fragment key={el.field}>
                        <StudentField field={el.field} value={el.value} />
                        <Stack sx={{ height: '1rem' }}></Stack>
                    </Fragment>
                ))}
            </Paper>
        </Stack>
        <Stack
            sx={{
                flexFlow: "row",
                backgroundColor: colors.side_blue,
                height: "10vh",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                color: colors.backgroun_color,
                padding: "1rem 2rem",
                fontWeight: 700,
                margin: "1rem 0px",
                borderRadius: "25px"
            }}
        >
            <span style={{
                color: "inherit",
                cursor: "pointer"
            }} onClick={() => { window.scrollTo(0, 0) }}>
                STUDENT PROFILE
            </span>
            <span style={{ color: "rgba(255, 122, 0, 1)", cursor: "pointer" }}>
                ||
            </span>
            <span
                style={{
                    color: "white",
                }}>COMPUTER BASED TEST</span>
        </Stack>
        <Stack sx={{
            height: "auto",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Button
                onClick={fetchExam}
                variant="contained"
                sx={{
                    width: "20rem",
                    backgroundColor: colors.side_blue,
                    borderRadius: "15px",
                    padding: "10px 5px",
                    fontWeight: 600,
                    fontSize: "1.4rem",
                    marginBottom: "1rem",
                    '&:hover': {
                        backgroundColor: colors.backgroun_color,
                        color: colors.side_blue
                    }
                }}> VIEW MY EXAMS</Button>
            {show && <Stack sx={{
                width: "100%",
                backgroundImage: "url(../../static/ogac-1.png)",
                backgroundPosition: "100% 100%",
                backgroundSize: "cover",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 0px"
            }}>
                <Paper sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "row wrap",
                    height: "100%",
                    width: "65%",
                    backgroundColor: colors.backgroun_color,
                    boxShadow: ".1px .1px .1px 1px " + colors.backgroun_color,
                    padding: "10px 0px"
                }}>

                    {loading ? <CircularProgress variant="indeterminate" /> : error ? <>{error}</> : exams.length > 0 ? exams.map(el => (
                        <StudentExams name={el.subject.name} id={el._id} key={el._id} />
                    )) : "No exams for you yet, check back later"}
                </Paper>
            </Stack>}
        </Stack>
    </Stack >
}

export default StudentComponent