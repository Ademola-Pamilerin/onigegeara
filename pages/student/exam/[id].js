import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import HeadComponent from "../../../components/header/head";
import MainNav from "../../../components/navigation/main-nav";
import LoginToContinue from "../../../components/notFound/login";
import ExaminationCenter from "../../../components/UI/center";
import SnackBarComponent from "../../../components/UI/error";
import ExaminationLeft from "../../../components/UI/left";
import { checkStatus, setActiveExam } from "../../../store/auth-slice";

const StudentExam = (props) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const { isAuthenticated,
        check_loading,
        token,
        refreshToken,
        id,
        exam_active,
        active_exam_loading,
        active_exam_err,
        active_exam,
    } = useSelector(state => state.auth)
    const exam_details = useSelector(state => state.exam)
    const exam_question = useSelector(state => state.question)

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(checkStatus())
    }, [dispatch])

    useEffect(() => {
        if (!check_loading && isAuthenticated) {
            dispatch(setActiveExam({
                token, refreshToken, id
            }))
        }
    }, [isAuthenticated, dispatch, token, refreshToken, id, check_loading])

    const { id: idval } = props

    useEffect(() => {
        if (check_loading) {
            setLoading(true)
        } else {
            if (!isAuthenticated) {
                setLoading(false)
                router.push("/student")
            } else {
                setLoading(false)
            }
        }
    }, [isAuthenticated, check_loading, router])

    return <>

        <HeadComponent
            title={'ONAG-Test'}
            content={"This is the official Examination page for student use only"}
        />

        <Stack direction={"row"} sx={{
            width: "100%",
            height: "auto",
            flex: 12
        }}><>

                <SnackBarComponent
                    message={active_exam_loading && isAuthenticated ? "loading exam" : active_exam_err ? active_exam_err : null}
                    open={active_exam_loading && isAuthenticated || active_exam_err}
                    type={active_exam_loading && isAuthenticated ? "primary" : active_exam_err ? 'error' : ''}

                />


                {check_loading ? <Stack sx={{
                    display: "flex",
                    flexFlow: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}><CircularProgress variant="indeterminate" /></Stack> : <>
                    {isAuthenticated ? <Stack sx={{
                        width: "100%",
                        height: "auto",
                        flex: 12,
                        overFlow: "none",
                        flexFlow: "row"
                    }}>
                        {exam_active ? <>< ExaminationLeft />
                            <ExaminationCenter /></> :
                            active_exam_loading ? <CircularProgress variant="indeterminate" />
                                : <Stack sx={{
                                    height: "100vh",

                                    width: "100%",
                                }}>
                                    <MainNav />
                                    <Stack sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%"
                                    }}>
                                        <Typography sx={{
                                            width: "100%",
                                            fontSize: "3rem",
                                            textAlign: "center"
                                        }}>This page cannot be found</Typography>
                                        <Button sx={{
                                            width: "auto",
                                            padding: "1rem",
                                            fontSize: "3rem",
                                            textAlign: "center"
                                        }} variant={"contained"} onClick={() => router.back()}>Go Back</Button>
                                    </Stack>
                                </Stack>}
                    </Stack> :
                        <LoginToContinue />
                    }
                </>
                }
            </>
        </Stack>    </>
}

export const getServerSideProps = (context) => {
    const id = context.params.id
    return {
        props: {
            id
        }
    }
}

export default StudentExam