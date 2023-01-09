import { Search } from "@mui/icons-material"
import { Box, Button, CircularProgress, Dialog, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeadComponent from "../../../components/header/head"
import MainNav from "../../../components/navigation/main-nav"
import AdminTeacherCard from "../../../components/teacher/admin_teacher"
import AdminStudentCard from "../../../components/UI/admin-student"
import SnackBarComponent from "../../../components/UI/error"
import { getAllStudent, studentClass, getUnverifiedTeeacher, getAllSubjects } from "../../../store/admin-slice"
import { checkStatus } from "../../../store/auth-slice"
import { fetchTeacherSubject } from "../../../store/teacher-slice"


const AdminTeacher = () => {

    const dispatch = useDispatch()
    const { check_loading, check_error, isAuthenticated, id, token, refreshToken, } = useSelector(state => state.auth)
    const [Totalerror, setTotalError] = useState(null)
    const [showErr, setShowErr] = useState(false)
    const router = useRouter()
    const { admin_subject_loading, admin_subjects, admin_subject_error, class_loading, class_error, class: classes, all_teachers, all_teachers_error, all_teachers_loading } = useSelector(state => state.admin)
    const [page, setPage] = useState(1)

    const [val, setVal] = useState("name")
    const [selectClass, setClass] = useState("")
    const [name, setName] = useState("")
    const [subjects, setSubject] = useState("")

    const nameChanged = async (event) => {
        setName(event.target.value)
    }
    const subjectChanged = (event) => {
        setSubject(event.target.value)
    }
    const classChanged = (event) => {
        setClass(event.target.value)
    }



    useEffect(() => {
        dispatch(checkStatus())
    }, [dispatch])
    useEffect(() => {
        if (check_error) {
            setTotalError(check_error)
            setShowErr(true)
        }
    }, [check_error])
    useEffect(() => {
        if (!isAuthenticated && !check_loading) {
            router.replace("/ogac/admin")
        }
    }, [isAuthenticated, router, check_loading])
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUnverifiedTeeacher({
                id, token, refreshToken, query: "Verified"
            }))
        }
    }, [isAuthenticated, id, token, refreshToken, dispatch])



    return (
        <>
            <HeadComponent title={"Admin Teacher"} content={"This is where you'll update a teacher's profile"} />
            <Stack>
                <MainNav type="Admin"/>
            </Stack>
            <Stack sx={{
                height: "auto",
                width: "100%",
                justifyContent: "center",
            }}>
                <Stack sx={{
                    width: "100%",
                    height: "auto",
                    padding: "1rem 0px",
                    margin: "1rem 0px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {all_teachers_loading ? <Stack sx={{
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center"
                    }}><CircularProgress variant="indeterminate" /></Stack> :
                        all_teachers.length < 0 ? <Stack sx={{
                            height: "100vh",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "2rem",
                            fontWeight: "700"
                        }}>No Student Yet</Stack> : <Stack sx={{
                            height: "auto",
                            display: "flex",
                            flexFlow: "column",
                            width: "90%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {all_teachers.map(el => (
                                <AdminTeacherCard key={el._id} {...el} />
                            ))}
                        </Stack>}
                </Stack>
            </Stack >
        </>
    )
}
export default AdminTeacher