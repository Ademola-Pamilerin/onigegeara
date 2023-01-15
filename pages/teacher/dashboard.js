import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { checkStatus } from '../../store/auth-slice'
import HeadComponent from '../../components/header/head'
import Dashboard from '../../components/teacher/dashboard';
import Message from '../../components/UI/message';
import MainNav from '../../components/navigation/main-nav';



const TeacherDashboard = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, token, refreshToken, type: accType, check_loading } = useSelector(state => state.auth)
    const [red, setRed] = useState(false)

    const router = useRouter()

    useEffect(() => {
        dispatch(checkStatus())
    }, [dispatch])

    useEffect(() => {
        if (!isAuthenticated && !check_loading) {
            router.replace("/teacher")
        }
        if (!check_loading && isAuthenticated) {
            if (accType !== "Teacher") {
                setRed(true)
                router.replace("/teacher")
            }
        }
    }, [isAuthenticated, router, check_loading, accType])
    return <>
        <HeadComponent
            content={"This is the official teacher's page"}
            title={"Teacher's Dashboard"} />
        <Stack sx={{
            margin: "0px 0px 2rem 0px",
            width: "100%"
        }}>
            <MainNav />
        </Stack>
        {check_loading ? <Stack sx={{
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}> <CircularProgress variant={"indeterminate"} />
        </Stack>
            :
            isAuthenticated && !red ?
                <Dashboard /> :
                <Stack sx={{ width: "100%", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                    <Message message={"Redirecting"} />
                </Stack>
        }
    </>
}





export default TeacherDashboard