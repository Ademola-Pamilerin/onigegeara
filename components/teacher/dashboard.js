import { Button, CircularProgress, Box, Stack, Typography, SpeedDial, ButtonGroup, SpeedDialAction, Avatar, Paper, Dialog, DialogContent, DialogActions, SpeedDialIcon } from '@mui/material'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { delete_Account, getTeacherExams, Teacher_Details } from '../../store/teacher-slice'
import { colors } from '../../util/them'
import Teacher from '../UI/teacher'
import Bullet from '../UI/bullet'
import { useRouter } from 'next/router'
import InputField from './input-field'
import SnackBarComponent from '../UI/error';
import { request_url } from '../../util/base-url';

import { Logout } from '@mui/icons-material'
import { logoutStudent } from '../../store/auth-slice';



const Dashboard = () => {
    const dispatch = useDispatch()
    const teacher_details = useSelector(state => state.teacher)
    const { isAuthenticated, token, refreshToken, id } = useSelector(state => state.auth)
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [delOpen, setDelOpen] = useState(false)
    const [openMyExam, setOpenMyExam] = useState(false)
    const [examDelete, setExamDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openErr, setOpenErr] = useState(false)
    const [totalErr, setTotalErr] = useState(null)
    const [logout, setLogout] = useState(false)

    const show_delete = () => {
        setDelOpen(true)
    }
    const show_details = () => {
        setOpen(true)
    }
    const show_all_exams = (type) => {
        console.log("Ademola", type)
        if (!type || type == undefined) {
            console.log("undefined")
            type = "default"
        }
        dispatch(getTeacherExams({
            refreshToken, id, token
        }))
        if (type === "exam" || type === "Edit" || type === "delete") {
            setExamDelete(true)
        } else {
            setExamDelete(false)
        }
        setOpenMyExam(true)
    }
    const deleteAcc = () => {
        dispatch(delete_Account({
            token, refreshToken, id
        }))
        router.replace("/teacher")
    }
    const download = async (idval, name) => {
        try {
            const response = await fetch(`${request_url}/exam/download/exam/${idval}`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    "Id": id,
                    "RefreshToken": refreshToken,
                    "Content-Type": "application/json",
                    'response-type': "blob"
                }
            })
            if (!response.ok) {
                const err = await response.json();
                console.log(err)
                if (!err) {
                    throw new Error("Request failed!");
                } else if (err.message === "Failed to fetch") {
                    throw new Error("Please check you internet connection");
                }
                else {
                    throw new Error(err.message);
                }
            }
            const blob = await response.blob()
            const url = URL.createObjectURL(new Blob([blob]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${name}.xlsx`)
            document.body.appendChild(link)
            link.click()

            link.parentNode.removeChild(link)
            console.log(blob)
        } catch (error) {
            console.log(error)
        }
    }


    const deleteExam = async (id) => {
        setLoading(true)
        try {
            const response = await fetch(`${request_url}/exam/delete/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                }
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

            const values = await response.json()
            const { tokenval, refresh_token } = values

            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("Token", tokenval)
            localStorage.setItem("Id", id)
            setLoading(false)
            setOpenMyExam(false)

        }
        catch (error) {
            setLoading(false)
            setTotalErr(error.message)
        }
    }

    const logoutHandler = () => {
        dispatch(logoutStudent())
        router.replace("/teacher")
    }

    useEffect(() => {
        dispatch(Teacher_Details({
            id: id,
            token: token,
            refreshToken: refreshToken
        }))
    }, [dispatch, token, refreshToken, id, isAuthenticated])

    useEffect(() => {
        if (teacher_details.error || teacher_details.update_error || teacher_details.delete_error) {
            setOpenErr(true)
            setTotalErr(teacher_details.error || teacher_details.update_error || teacher_details.delete_error)
        }

    }, [teacher_details.error, teacher_details.update_error, teacher_details.delete_error])


    return (
        <>
            <Dialog open={logout} onClose={() => setLogout(false)}>
                <DialogContent>
                    Are you sure you want to Log out
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogout(false)}>Cancel</Button>
                    <Button onClick={logoutHandler}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <SnackBarComponent
                open={openErr}
                duration={6000}
                message={totalErr}
                close={() => setOpenErr(false)}
                type={"error"}
            />
            <SpeedDial
                ariaLabel='Navigation speed dial'
                sx={{
                    position: "fixed", bottom: 16, left: 16
                }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction tooltipOpen icon={<Logout />} onClick={() => setLogout(true)} />
            </SpeedDial>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <InputField closeed={() => setOpen(false)} />
                </DialogContent>

            </Dialog>
            <Dialog open={delOpen} onClose={() => setDelOpen(false)}>
                <DialogContent>Are you sure you want to delete your account</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDelOpen(false)}>Cancel</Button>
                    <Button onClick={deleteAcc}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openMyExam} onClose={() => setOpenMyExam(false)}>
                {teacher_details.my_exam_loading ? <Stack sx={{
                    padding: "1rem"
                }}>
                    <CircularProgress variant='indeterminate' />
                </Stack> : <Stack>
                    {teacher_details.my_exam.length > 0 ? <Stack sx={{
                        padding: "1rem"
                    }}>
                        <Typography sx={{
                            fontWeight: 700,
                            fontSize: "2rem",
                            width: "100%",
                            textAlign: "center",
                            color: colors.side_blue_brown
                        }}>Your Exams</Typography>
                        {teacher_details.my_exam.map(el => <Paper key={el.exam_id} sx={{
                            width: "25rem",
                            padding: "1rem",
                            margin: "1rem",
                            boxShadow: ".1px .1px .1px 1px" + colors.side_blue,
                            height: "auto",
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "space-evenly"
                        }}>
                            <Typography>Subject: {el.subject}</Typography>
                            <Typography>{el.class.length > 1 ? "Classes" : "Class"}: {el.class.map((ad, i) => <span key={ad}>{ad}
                                {el.class.length > 1 && i !== el.class.length - 1 && ', '}
                            </span>)}</Typography>
                            <Typography>Exam Duration: {el.time}</Typography>
                            <Typography>Numbers of Question: {el.length}</Typography>
                            <Stack direction={"row"}>
                                {!examDelete ? <><Button sx={{
                                    fontWeight: "700"
                                }} onClick={() => router.push("/teacher/exam/" + el.exam_id)}>Add Question</Button>
                                    <Button
                                        onClick={() => download(el.exam_id, el.subject)}
                                        sx={{
                                            fontWeight: "700"
                                        }}>Download Result</Button></> :
                                    <><Button sx={{
                                        fontWeight: "700"
                                    }} onClick={() => router.push("/teacher/exam/student/" + el.exam_id)}>All exam Students</Button>
                                        <Button
                                            onClick={() => deleteExam(el.exam_id)}
                                            sx={{
                                                fontWeight: "700"
                                            }}>Delete Exam</Button></>}

                            </Stack>

                        </Paper>
                        )}
                    </Stack> : <Stack sx={{
                        padding: "1rem"
                    }}>
                        You don`&apos;`t have an exam yet
                    </Stack>}
                </Stack>}
            </Dialog>


            <Teacher now={"home"} id="home">
                <a name="home"></a>
                {teacher_details.loading ?
                    <Stack sx={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}><CircularProgress variant='indeterminate' /></Stack> :
                    <Stack sx={{
                        width: "100%",
                        justifyContexnt: "center",
                        alignItems: "center",
                        height: "100%"
                    }}>
                        <Box sx={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            flexFlow: "row"
                        }}>
                            <Typography sx={{
                                width: "100%",
                                fontSize: "2.4rem",
                                fontWeight: 1000,
                                fontFamily: "serif",
                                fontStyle: "oblique",
                                color: colors.side_blue
                            }}>Welcome {teacher_details.name}</Typography>
                            <Typography sx={{
                                width: "100%",
                                textAlign: "right",
                                fontSize: "2rem",
                                fontWeight: 700,
                                fontFamily: "serif",
                                fontStyle: "oblique",
                                color: colors.side_blue
                            }}>MY DASHBOARD</Typography>
                        </Box>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Avatar sx={{
                                height: '250px',
                                width: "250px",
                                fontSize: "6rem",
                                margin: "10px 0px",
                                backgroundColor: colors.side_blue,
                                color: "white",
                                fontFamily: "serif",
                                fontStyle: "oblique"
                            }}>
                                {teacher_details.name ? <>{teacher_details.name.split(" ")[0][0]} {teacher_details.name.split(" ")[1][0]}</> : "loading"}
                            </Avatar>
                        </Box>
                        <Stack sx={{
                            margin: "2rem 0px",
                            width: "100%"
                        }}>
                            <Stack sx={{
                                width: "100%",
                                marginLeft: "1rem"
                            }} id="account">
                                <a name="account"></a>
                                <Typography sx={{
                                    width: "90%",
                                    textAlign: "left",
                                    fontWeight: "700",
                                    borderBottom: "2px solid grey",
                                    fontSize: "2rem",
                                    color: colors.side_blue
                                }}>Account</Typography>
                                <Box sx={{
                                    width: "100%",
                                    height: "auto",
                                    display: "flex",
                                    flexFlow: "row wrap"
                                }}>
                                    <Paper sx={{
                                        boxShadow: ".1px .1px .1px 1px " + colors.middle_grey,
                                        height: "30vh",
                                        width: "90%",
                                        display: "flex",
                                        flexFlow: "row wrap",
                                        opacity: "0.6",
                                        backgroundColor: colors.backgroun_color,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Bullet title={"Details"} content={"Check your info here"} clicked={show_details} />
                                        <Bullet title={"Update"} content={"Update your info here"} clicked={show_details} />
                                        <Bullet title={"Delete"} content={"Delete your Account here"} clicked={show_delete} />
                                    </Paper>
                                </Box>
                            </Stack>
                            {/* <Stack sx={{
                                width: "100%",
                                marginTop: "1rem",
                                marginLeft: "1rem"
                            }} id="student">
                                <a name="student"></a>
                                <Typography sx={{
                                    width: "90%",
                                    textAlign: "left",
                                    fontWeight: "700",
                                    borderBottom: "2px solid grey",
                                    fontSize: "2rem",
                                    color: colors.side_blue
                                }}>Student</Typography>
                                <Box sx={{
                                    width: "100%",
                                    height: "auto",
                                    display: "flex",
                                    flexFlow: "row wrap"
                                }}>
                                    <Paper sx={{
                                        boxShadow: ".1px .1px .1px 1px " + colors.middle_grey,
                                        height: "30vh",
                                        width: "90%",
                                        display: "flex",
                                        flexFlow: "row wrap",
                                        opacity: "0.6",
                                        backgroundColor: colors.backgroun_color,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Bullet title={"Edit"} content={"Re-assign exam for student"} />
                                        <Bullet title={"Details"} content={"Get Student Details"} />
                                        <Bullet title={"Result"} content={"Get student Result"} />
                                    </Paper>
                                </Box>
                            </Stack> */}
                            <Stack sx={{
                                width: "100%",
                                marginY: "1rem",
                                marginLeft: "1rem"
                            }} id="exam">
                                <a name="exam" ></a>
                                <Typography sx={{
                                    width: "90%",
                                    textAlign: "left",
                                    fontWeight: "700",
                                    borderBottom: "2px solid grey",
                                    fontSize: "2rem",
                                    color: colors.side_blue
                                }}>Exam</Typography>
                                <Box sx={{
                                    width: "100%",
                                    height: "auto",
                                    display: "flex",
                                    flexFlow: "row wrap"
                                }}>
                                    <Paper sx={{
                                        boxShadow: ".1px .1px .1px 1px " + colors.middle_grey,
                                        height: "auto",
                                        width: "90%",
                                        display: "flex",
                                        flexFlow: "row wrap",
                                        opacity: "0.6",
                                        backgroundColor: colors.backgroun_color,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Bullet title={"My Exams"} content={"See all your exams"} margin={"1rem"} clicked={() => show_all_exams("default")} />
                                        <Bullet title={"Create"} content={"Create an exam"} margin={"1rem"} clicked={() => { router.push("/teacher/exam/new") }} />
                                        <Bullet title={"Update"} content={"Update an exam"} margin={"1rem"} clicked={() => show_all_exams("default")} />
                                        <Bullet title={"Result"} content={"Download All Exam Result"} margin={"1rem"} clicked={() => show_all_exams("default")} />
                                        <Bullet title={"Students"} content={"See Student that took an Exam"} margin={"1rem"} clicked={() => show_all_exams("exam")} />
                                        <Bullet title={"Delete"} content={"Delete an Exam"} margin={"1rem"} clicked={() => show_all_exams("delete")} />
                                    </Paper>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>}
            </Teacher>
        </>
    )
}
export default Dashboard