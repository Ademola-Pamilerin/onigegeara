import { Search } from "@mui/icons-material"
import { Box, Button, CircularProgress, Dialog, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeadComponent from "../../../components/header/head"
import MainNav from "../../../components/navigation/main-nav"
import AdminStudentCard from "../../../components/UI/admin-student"
import SnackBarComponent from "../../../components/UI/error"
import { getAllStudent, studentClass } from "../../../store/admin-slice"
import { checkStatus } from "../../../store/auth-slice"


const Students = () => {
    const dispatch = useDispatch()
    const { check_loading, check_error, isAuthenticated, id, token, refreshToken, } = useSelector(state => state.auth)
    const [Totalerror, setTotalError] = useState(null)
    const [showErr, setShowErr] = useState(false)
    const router = useRouter()
    const { all_student_loading, all_students, all_student_error, currentIndex, allNumber, class_loading, class_error, class: classes } = useSelector(state => state.admin)
    const [page, setPage] = useState(1)

    const [val, setVal] = useState("name")
    const [selectClass, setClass] = useState("")
    const [name, setName] = useState("")


    const nameChanged = (event) => {
        setName(event.target.value)

    }
    const classChanged = (event) => {
        setClass(event.target.value)

    }

    useEffect(() => {
        setClass("")
        setName("")
    }, [val])

    useEffect(() => {
        if (name) {
            dispatch(getAllStudent({
                page,
                token,
                refreshToken,
                id,
                name
            }))
        } else if (selectClass) {
            dispatch(getAllStudent({
                page,
                token,
                refreshToken,
                id,
                class: selectClass
            }))
        }
    }, [name, selectClass, dispatch, id, page, refreshToken, token])


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
        if (all_student_error) {
            setTotalError(all_student_error)
            setShowErr(true)
        }
    }, [all_student_error])
    useEffect(() => {
        if (!isAuthenticated && !check_loading) {
            router.replace("/ogac/admin")
        }
    }, [isAuthenticated, router, check_loading])

    useEffect(() => {
        if (isAuthenticated && !check_loading) {
            dispatch(getAllStudent({
                id, token, refreshToken, page, name: name ? name : null, class: selectClass ? selectClass : null
            }))
        }
    }, [dispatch, isAuthenticated, id, token, refreshToken, check_loading, page, name, selectClass])





    return (<>
        <Stack>
            <HeadComponent title={"Admin Student"} content={"This is the page for Admin to Perform actions on student"} />
        </Stack>
        <Stack sx={{
            margin: "0px 0px 3rem 0px",
            width: "100%"
        }}>
            <MainNav type={"Admin"} />
        </Stack>
        <Stack sx={{
            height: "auto",
            overflowY: 'scroll',
            justifyContent: "center",
            alignItems: "canter",
            width: "100%",
            display: "flex",
            flexFlow: "column"
        }}>
            <Stack
                sx={{
                    width: "100%",
                    flexFlow: "row",
                    justifyContent: "space-evenly",
                    margin: "3rem 0px",
                    overflow: "hidden",
                    height: "auto"
                }}>
                <TextField select value={val} placeholder="sort by" onChange={(event) => setVal(event.target.value)} fullWidth sx={{
                    width: "15%"
                }}>
                    <MenuItem value={""}>--sort by--</MenuItem>
                    <MenuItem value={"name"}>Name</MenuItem>
                    <MenuItem value={"class"}>Class</MenuItem>
                </TextField>
                {val == "name" ? < TextField value={name} onChange={nameChanged} placeholder="Enter Student Firstname or lastname or part of students name" sx={{
                    width: "70%"
                }} /> : <TextField value={selectClass} fullWidth onChange={classChanged}
                    sx={{
                        width: "70%"
                    }} select onFocus={() => dispatch(studentClass({
                        id, token, refreshToken
                    }))}>

                    {class_loading ? <Stack sx={{
                        padding: "1rem", justifyContent: "center", alignItems: "center"
                    }}><CircularProgress variant={"indeterminate"} /></Stack> : classes.length > 0 ? classes.map(el => (
                        <MenuItem value={el._id
                        } key={el._id} >{el.name}</MenuItem>
                    )) : <Stack>No class yet</Stack>}

                </TextField>
                }
            </Stack>
            {check_loading ? <Stack sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}><CircularProgress variant="indeterminate" /></Stack> : <>
                {all_student_loading ? <Stack sx={{
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center"
                }}><CircularProgress variant="indeterminate" /></Stack> :
                    all_students.length < 0 ? <Stack sx={{
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "2rem",
                        fontWeight: "700"
                    }}>No Student Yet</Stack> : <Stack sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "auto",
                        flexFlow: "column",
                        justifyContent: "space-evenly"
                    }}>

                        {all_students.map(el => (
                            <AdminStudentCard key={el.id} {...el} page={page} />
                        ))}
                        <Stack sx={{
                            width: "100%",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flexFlow: "row",
                            margin: "1rem 0px",
                            position: "fixed",
                            bottom: "0",
                            left: "0"
                        }}>
                            <Typography sx={{
                                fontSize: "2rem"
                            }}>Per Page:5</Typography>
                            <Typography sx={{
                                fontSize: "2rem"
                            }}>Total Document: {currentIndex} / {allNumber}</Typography>
                            {page !== 1 && <Button onClick={() => setPage(prev => prev - 1)}>Prev</Button>}
                            {currentIndex !== allNumber && <Button onClick={() => setPage(prev => prev + 1)}>Next</Button>}
                        </Stack>
                    </Stack>}
            </>
            }
        </Stack >
    </>)
}
export default Students