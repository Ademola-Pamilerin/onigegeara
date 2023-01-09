import { CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material"
import { colors } from "../../util/them"
import { useDispatch, useSelector } from 'react-redux'
import { examInfo, startExam } from "../../store/exam-slice"
import { useState } from "react"
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { setActiveExam } from '../../store/auth-slice'

const StudentExams = (props) => {
    const dispatch = useDispatch()
    const exam_info = useSelector(state => state.exam)
    const auth_info = useSelector(state => state.auth)
    const [loading, setLodaing] = useState(false)
    const [open, setOpen] = useState(false)
    const clicked = () => {
        setOpen(true)
        dispatch(examInfo({
            exam_id: props.id,
            token: auth_info.token,
            id: auth_info.id,
            refreshToken: auth_info.refreshToken
        }))
    }
    const router = useRouter()


    const close = () => {
        setOpen(false)
    }

    const Start_Exam = () => {
        setLodaing(true)
        dispatch(startExam({
            id: auth_info.id,
            token: auth_info.token,
            refreshToken: auth_info.refreshToken,
            exam_id: exam_info.exam_id
        }))
        dispatch(setActiveExam({
            id: auth_info.id,
            token: auth_info.token,
            refreshToken: auth_info.refreshToken,
        }))
        router.replace(`/student/exam/${exam_info.exam_id}`)
    }
    return <>
        <Dialog open={open} onClose={close}>
            {exam_info.infoLoading || loading ?
                <DialogContent sx={{
                    backgroundColor: "none"
                }}>
                    <DialogContentText sx={{
                        backgroundColor: "none"
                    }}>
                        <CircularProgress variant="indeterminate" />
                    </DialogContentText>
                </DialogContent>
                : <><DialogTitle sx={{
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    textAlign: "center"
                }}>
                    {exam_info.subject}
                </DialogTitle>
                    <DialogContent >
                        <DialogContentText sx={{
                            fontSize: '1.2rem',
                            fontWeight: 700
                        }}>Numbers of Questions: {exam_info.numbers}</DialogContentText>
                        <DialogContentText sx={{
                            fontSize: '1.2rem',
                            fontWeight: 700
                        }}>Time: {exam_info.time}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: colors.side_blue,
                            '&:hover': {
                                color: colors.side_blue
                            }
                        }}
                            onClick={Start_Exam}
                        >Start</Button>
                        <Button
                            sx={{
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                color: colors.side_blue,
                                '&:hover': {
                                    color: colors.side_blue
                                }
                            }}
                            onClick={close}>Cancel</Button>
                    </DialogActions>
                </>
            }
        </Dialog>
        <Stack
            onClick={clicked}
            sx={{
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem 0",
                border: "2px solid " + colors.side_blue,
                margin: "10px",
                cursor: "pointer",
                textAligm: "center",
                '&:hover': {
                    color: "white",
                    backgroundColor: colors.side_blue
                }
            }}>
            {props.name}
        </Stack>
    </>
}


export default StudentExams