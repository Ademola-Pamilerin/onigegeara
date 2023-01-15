import { Stack, Box, Typography, CircularProgress } from '@mui/material'
import MainNav from '../../components/navigation/main-nav'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { checkStatus, setActiveExam } from '../../store/auth-slice'
import { useRouter } from 'next/router'
import LoginToContinue from '../../components/notFound/login'
import { getStudentData } from '../../store/student-slice'
import SnackBarComponent from '../../components/UI/error'
import StudentComponent from '../../components/student/student'
import HeadComponent from '../../components/header/head'
const WelcomeStudentPage = (props) => {
    const { token, isAuthenticated, refreshToken, id, loading: authLoading, check_loading, exam_active, active_exam, active_exam_error, type: accType } = useSelector(state => state.auth)
    const { name, class: stdClass, id: stdId, loading, error } = useSelector(state => state.student)
    const [open, setOpen] = useState(false)
    const [red, setRed] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    console.log("came in")


    useEffect(() => {
        dispatch(checkStatus())
    }, [dispatch])

    useEffect(() => {
        if (!check_loading) {
            if (!isAuthenticated) {
                router.replace("/student")
            } else {
                if (accType === "Admin" || accType === "Teacher") {
                    setRed(true)
                    router.replace("/student")
                } else {
                    localStorage.removeItem("Seconds")
                    localStorage.removeItem("Minutes")
                    localStorage.removeItem("current_Index")
                    dispatch(getStudentData({ token, refreshToken, id }))
                    dispatch(setActiveExam({ token, refreshToken, id }))
                }
            }
        }
    }, [
        check_loading, accType, isAuthenticated, router, token, refreshToken, id, dispatch
    ])

    useEffect(() => {
        if (error) {
            setOpen(true)
        }
        return () => setOpen(false)
    }, [error])


    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Stack sx={{ height: "100vh", width: "100%" }}>
            <HeadComponent title={'OGAC-STUDENT'} content={'This is the OGAC official Student Profile Page'} />
            <Stack sx={{
                margin: "0px 0px 3rem 0px"
            }}>
                <MainNav />
            </Stack>
            <SnackBarComponent
                close={handleClose}
                open={open && (error !== null || "")}
                type={"error"}
                duration={6000}
                message={error}
            />
            {!check_loading && red && isAuthenticated && < Stack sx={{
                width: "100%",
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem"
            }}>Redirecting</Stack>}
            {
                check_loading ? <Stack sx={{
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CircularProgress variant="indeterminate" />
                </Stack> :
                    isAuthenticated ?
                        loading ? <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "fixed",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <CircularProgress sx={{
                                position: "fixed",
                                top: "50%",
                                left: "50%"
                            }} variant='indeterminate' />
                        </Box>
                            :
                            <StudentComponent /> :
                        <LoginToContinue />
            }
            <SnackBarComponent
                open={exam_active}
                type={!active_exam_error ? "success" : "error"}
                duration={10000}
                message={active_exam_error ? active_exam_error : "You have an active exam, click to open"}
                close={() => { router.replace("/student/exam/" + active_exam) }}
            />

        </Stack >
    )
}

export default WelcomeStudentPage
