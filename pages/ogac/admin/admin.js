import { Box, CircularProgress, Dialog, SpeedDial, SpeedDialAction, Stack, Typography, SpeedDialIcon, DialogActions, Button, DialogContent, TextField } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NewStudent from "../../../components/student/new-student"
import Bullet from "../../../components/UI/bullet"
import SnackBarComponent from "../../../components/UI/error"
import { createAction, getUnverifiedTeeacher } from "../../../store/admin-slice"
import { checkStatus, logoutStudent } from "../../../store/auth-slice"
import { Logout } from '@mui/icons-material'
import { colors } from "../../../util/them"
import HeadComponent from "../../../components/header/head"
import MainNav from "../../../components/navigation/main-nav"

const Admin = () => {
    const dispatch = useDispatch()
    const { check_loading, check_error, isAuthenticated, id, token, refreshToken, type: accType } = useSelector(state => state.auth)
    const [Totalerror, setTotalError] = useState(null)
    const [showErr, setShowErr] = useState(false)
    const router = useRouter()
    const [activateDialog, setActivateDialog] = useState(false)
    const [logout, setLogout] = useState(false)
    const [activeType, setActiveType] = useState("")
    const inputRef = useRef("")
    const [red, setRed] = useState(false)




    const [studentDialog, setStudentDialog] = useState(false)
    const { all_teachers,
        all_teachers_error,
        all_teahers_loading,
        create_error, create_loading } = useSelector(state => state.admin)


    const logoutHandler = () => {
        dispatch(logoutStudent())
        router.replace("/ogac/admin")
    }
    useEffect(() => {
        if (!isAuthenticated && !check_loading) {
            router.replace("/ogac/admin")
            if (accType !== "Admin") {
                setRed(true)
                router.replace("/ogac/admin")
            }
        }
        // if (!check_loading && isAuthenticated) {
        //     if (accType !== "Admin") {
        //         setRed(true)
        //         router.replace("/ogac/admin")
        //     }
        // }
    }, [isAuthenticated, router, check_loading, accType])
    const ceateNew = () => {
        setStudentDialog(true)
    }
    const create = () => {
        const value = inputRef.current.value
        if (value.trim().length < 1) {
            setShowErr(true)
            setTotalError("Please Name is Required")
            return
        } else {
            setShowErr(null)
            setTotalError("")
            dispatch(createAction({
                id, token, refreshToken, type: activeType, val: value
            }))
            inputRef.current.value = ""
            setActiveType("")
        }

    }

    useEffect(() => {
        dispatch(checkStatus())
    })

    useEffect(() => {
        if (check_error) {
            setTotalError(check_error)
            setShowErr(true)
        }
        if (all_teachers_error) {
            setTotalError(all_teachers_error)
            setShowErr(true)
        }
        if (create_error) {
            setTotalError(create_error)
            setShowErr(true)
        }
    }, [check_error, create_error, all_teachers_error])
    useEffect(() => {
        if (!isAuthenticated && !check_loading) {
            router.replace("/ogac/admin")
        }
    }, [isAuthenticated, router, check_loading])

    useEffect(() => {
        if (activateDialog) {
            dispatch(getUnverifiedTeeacher({
                id, token, refreshToken, query: "unVerified"
            }))
        }
    }, [activateDialog, id, token, refreshToken, dispatch])

    return <>
        <SnackBarComponent
            open={showErr}
            message={Totalerror}
            close={() => setShowErr(false)}
            duration={10000}
        />
        <HeadComponent title={"Admin Dashboard"} content={"Official Dashboard for Administration of Onigege Ara"} />
        <Stack sx={{
            margin: "0px 0px 3rem 0px",
            width: "100%"
        }}>
            <MainNav type="Admin" />
        </Stack>
        {
            !isAuthenticated ? <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>Redirecting</Stack> :
                red ? <Stack sx={{ justifyContent: "center", alignItems: "center", width: "100%", textAlign: "center" }}>Redirecting</Stack> :
                    <>
                        <Dialog open={studentDialog} onClose={() => setStudentDialog(false)}>
                            <NewStudent />
                        </Dialog>
                        <Dialog open={activateDialog} onClose={() => setActivateDialog(false)}>
                            {all_teahers_loading ? <Stack sx={{
                                width: "100%",
                                padding: "2rem"
                            }}>
                                <CircularProgress variant={"indeterminate"} />
                            </Stack> : all_teachers.length > 0 ? <>
                                {all_teachers.map(el => (
                                    <span key={el._id}>{el.firstname}</span>
                                ))}
                            </> : <Stack sx={{
                                height: "100vh",
                                width: "100%",
                                padding: "2rem"
                            }}>
                                No teacher found
                            </Stack>}
                        </Dialog>
                        <Dialog open={activeType !== ""} onClose={() => setActiveType("")}>
                            <Stack sx={{
                                height: "auto",
                                width: "auto",
                                padding: "3rem 5rem",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Typography sx={{
                                    fontWeight: "800",
                                    fontSize: "2.5rem",
                                    margin: "1rem 0px",
                                    textAlign: "center",
                                    color: colors.side_blue
                                }}>{activeType == "Class" ? "Create A New Class" : "Create A new Subject"}</Typography>
                                <TextField sx={{ width: "100%" }} inputRef={inputRef} placeholder={`Enter ${activeType == "Class" ? "class" : "subject"} name here`} />
                                <Button
                                    onClick={create}
                                    variant={"contained"} sx={{
                                        padding: ".7rem .8rem",
                                        fontWeight: "800",
                                        fontSize: "2.1rem",
                                        color: "white",
                                        margin: "1rem 0px",
                                        backgroundColor: colors.side_blue,
                                        '&:hover': {
                                            color: colors.side_blue,
                                            backgroundColor: "white",
                                        }
                                    }}>
                                    Create {activeType == "Class" ? "Class" : "Subject"}
                                </Button>
                            </Stack>
                        </Dialog>
                        <Dialog open={logout} onClose={() => setLogout(false)}>
                            <DialogContent>
                                Are you sure you want to Log out
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setLogout(false)}>Cancel</Button>
                                <Button onClick={logoutHandler}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
                        <SpeedDial
                            ariaLabel='Navigation speed dial'
                            sx={{
                                position: "fixed", bottom: 16, left: 16
                            }}
                            icon={<SpeedDialIcon />}
                        >
                            <SpeedDialAction tooltipOpen icon={<Logout />} tooltipTitle={"Log out"} onClick={() => setLogout(true)} />
                        </SpeedDial>
                        <Stack sx={{
                            width: "100%",
                            height: "100vh"
                        }}>

                            <SnackBarComponent
                                close={() => setShowErr(false)}
                                open={showErr}
                                type="error"
                                message={Totalerror}
                            />
                            {
                                check_loading ? <Stack sx={{
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <CircularProgress variant={"indeterminate"} />
                                </Stack> : <>
                                    <Box sx={{
                                        padding: "1rem 10px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexFlow: "column"
                                    }}>
                                        <Typography sx={{
                                            width: "90%",
                                            textAlign: "left",
                                            fontSize: "1.7rem",
                                            fontWeight: '700',
                                            borderBottom: "2px solid grey",
                                            padding: "5px 0px"
                                        }}>Student</Typography>
                                        <Box sx={{
                                            display: "flex",
                                            width: "80%",
                                            height: "auto",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "1rem 0px",
                                            flexFlow: "row wrap"
                                        }}>
                                            <Bullet title={"Create Student"} content={"Create A new Student"} clicked={ceateNew} />
                                            <Bullet title={"Update Student"} content={"Update a Student Record"} clicked={() => router.push("/ogac/admin/students")} />
                                            <Bullet title={"Delete"} content={"Delete A Student Record"} clicked={() => router.push("/ogac/admin/students")} />
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        padding: "1rem 10px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexFlow: "column"
                                    }}>
                                        <Typography sx={{
                                            width: "90%",
                                            textAlign: "left",
                                            fontSize: "1.7rem",
                                            fontWeight: '700',
                                            borderBottom: "2px solid grey",
                                            padding: "5px 0px"
                                        }}>Teachers</Typography>
                                        <Box sx={{
                                            display: "flex",
                                            height: "auto",
                                            width: "80%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "1rem 0px",
                                            flexFlow: "row wrap"
                                        }}>
                                            <Bullet title={"Activate Teacher"} content={"Activate Teachers Account or Dectivate Account"} clicked={() => router.push("/ogac/admin/teacher")} />
                                            <Bullet title={"Assign Role"} content={"Assign Roles to Teachers"} clicked={() => router.push("/ogac/admin/teacher")} />
                                            <Bullet title={"Assign Subject"} content={"Assign Subjects to tea   cher"} clicked={() => router.push("/ogac/admin/teacher")} />
                                            <Bullet title={"Delete"} content={"Delete A Teacher Record"} margin={"1.2rem"} clicked={() => router.push("/ogac/admin/teacher")} />
                                            <Bullet title={"Remove"} content={"Remove Teacher's Role"} margin={"1.2rem"} clicked={() => router.push("/ogac/admin/teacher")} />
                                            <Bullet title={"Reset Teachers"} content={"Reset A teacher's Password"} margin={"1.2rem"} clicked={() => router.push("/ogac/admin/teacher")} />


                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        padding: "1rem 10px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexFlow: "column"
                                    }}>
                                        <Typography sx={{
                                            width: "90%",
                                            textAlign: "left",
                                            fontSize: "1.7rem",
                                            fontWeight: '700',
                                            borderBottom: "2px solid grey",
                                            padding: "5px 0px"
                                        }}>Posts</Typography>
                                        <Box sx={{
                                            display: "flex",
                                            height: "auto",
                                            width: "80%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "1rem 0px",
                                            flexFlow: "row wrap"
                                        }}>
                                            <Bullet title={"New"} content={"Create a new Post"} clicked={() => router.push("/post/new")} />
                                            <Bullet title={"All Posts"} content={"View All Post"} clicked={() => router.push("/ogac/admin/post")} />
                                            <Bullet title={"Update"} content={"Update Post"} clicked={() => router.push("/ogac/admin/post")} />

                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        padding: "1rem 10px",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexFlow: "column"
                                    }}>
                                        <Typography sx={{
                                            width: "90%",
                                            textAlign: "left",
                                            fontSize: "1.7rem",
                                            fontWeight: '700',
                                            borderBottom: "2px solid grey",
                                            padding: "5px 0px"
                                        }}>Others</Typography>
                                        <Box sx={{
                                            display: "flex",
                                            height: "auto",
                                            width: "80%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: "1rem 0px",
                                            flexFlow: "row wrap"
                                        }}>
                                            <Bullet title={"Create a class"} content={"Creates class for Students"} clicked={() => setActiveType("Class")} />
                                            <Bullet title={"Create Subject"} content={"Create A Subject"} clicked={() => setActiveType("Subject")} />
                                        </Box>
                                    </Box>
                                </>
                            }
                        </Stack>
                    </>
        }

    </>
}
export default Admin