import Teacher from "../../../../components/UI/teacher"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Stack, Breadcrumbs, Link, Paper, Typography } from "@mui/material"
import { checkStatus } from "../../../../store/auth-slice";
import { useRouter } from "next/router";
import { examInfo } from "../../../../store/exam-slice";
import StudentCard from "../../../../components/UI/student-card";
import { allStudentExam } from "../../../../store/teacher-slice";
import SnackBarComponent from "../../../../components/UI/error";



const AllStudents = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const [idval, setId] = useState(null)
    const { token, refreshToken, id, isAuthenticated, check_loading, check_error, type } = useSelector(state => state.auth)
    const { infoLoading, infoErr, subject, } = useSelector(state => state.exam)
    const { student_exam_loading, student_exam_error, students_exam } = useSelector(state => state.teacher)
    const [total_error, setTotalError] = useState("")

    useEffect(() => {
        dispatch(checkStatus())
        if (router.query) {
            setId(router.query.id)
        }
    }, [dispatch, router])

    useEffect(() => {
        if (!check_loading && !check_error) {
            if (!isAuthenticated) {
                router.replace("/teacher")
            }
        }
    }, [check_loading, check_error, isAuthenticated, router])



    useEffect(() => {
        if (router.query.id) {
            dispatch(examInfo({
                id, token, refreshToken, exam_id: router.query.id
            }))
        }

    }, [id, token, refreshToken, idval, dispatch, router])

    useEffect(() => {
        if (isAuthenticated && router.query.id) {
            dispatch(allStudentExam({
                id, token, refreshToken, student_id: router.query.id
            }))
        }
    }, [isAuthenticated, dispatch, id, token, refreshToken, idval, router])

    useEffect(() => {
        if (check_error) {
            setTotalError(check_error)
        }
        if (student_exam_error) {
            setTotalError(student_exam_error)
        }
    }, [check_error, student_exam_error])



    return <>
        <Teacher >
            <SnackBarComponent
                open={total_error !== ""}
                close={() => setTotalError("")}
                message={total_error}
                type={"error"}
            />
            <Stack sx={{
                height: "100%",
                width: "100%",
            }}>
                <Breadcrumbs separator={">"} sx={{
                    marginLeft: "3rem",
                    marginTop: "2rem"
                }}>

                    <span
                        onClick={() => router.push("/teacher/dashboard")}
                    >Home</span>
                    <Typography sx={{
                        fontSize: "2rem",
                        fontWeight: "600"
                    }}>All Students</Typography>
                </Breadcrumbs>
                <Stack sx={{
                    height: "100%"
                }}>
                    {check_loading ? <Stack sx={{
                        width: "100%",
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><CircularProgress variant={"indeterminate"} /></Stack> : infoLoading ? <Typography><CircularProgress variant={"indeterminate"} /></Typography> :
                        <Typography sx={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            textTransform: "uppercase",
                            fontWeight: "700",
                            margn: "2rem 0px 0px 0px"
                        }}>All Student That Wrote {subject} </Typography>
                    }
                    {student_exam_loading ? <Stack sx={{
                        width: "100%",
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CircularProgress variant={"indeterminate"} />
                    </Stack> : students_exam.length === 0 ? <Stack sx={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "700",
                        fontSize: "2rem"
                    }}>
                        No students yet
                    </Stack> : <Stack sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        padding: "1rem 10px",
                        flexFlow: "row wrap"
                    }}>
                        {students_exam.map(el => <StudentCard exam_id={router.query.id} key={el.student_id} id={el.student_id} name={el.name} class={el.class} regNo={el.regNo} />)}
                    </Stack>}
                </Stack>
            </Stack>
        </Teacher>
    </>
}
export default AllStudents