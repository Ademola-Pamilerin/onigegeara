import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, Paper, Stack, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { answerQuestion, getAllQuestion, getIndexQuestion, getNextQuestion, getPreviousQuestion, SubmitExam } from "../../store/question"
import { colors } from "../../util/them"
import SingleExam from "../exam/exam"
import SnackBarComponent from "./error"
import { useRouter } from 'next/router'


const ExaminationCenter = () => {

    const auth_details = useSelector(state => state.auth)
    const question_details = useSelector(state => state.question)
    const exam_details = useSelector(state => state.exam)
    const [showDialog, setShowDialog] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)

    const dispatch = useDispatch()

    const router = useRouter()
    const remaining = question_details.remaining ? question_details.remaining.split("/")[0] === question_details.remaining.split("/")[1] : false

    const nextQuestion = () => {
        const min = +localStorage.getItem("Minutes")
        const secs = +localStorage.getItem("Seconds")
        const real_time = `${min}:${secs}`
        dispatch(answerQuestion({
            token: auth_details.token,
            refreshToken: auth_details.refreshToken,
            id: auth_details.id,
            answer: question_details.input !== "" ? question_details.input : question_details.my_answer,
            time: real_time,
            quest_id: question_details.question_id
        }))
        if (!remaining) {
            dispatch(getNextQuestion({
                current: question_details.index,
                token: auth_details.token,
                refreshToken: auth_details.refreshToken,
                id: auth_details.id,
                time: real_time,
            }))
        }

    }




    const prevQuestion = (data) => {
        dispatch(getPreviousQuestion({
            current: question_details.index,
            token: auth_details.token,
            refreshToken: auth_details.refreshToken,
            id: auth_details.id,
            time: auth_details.time,
        }))
    }
    const allQuestion = () => {
        setShowDialog(true)
        dispatch(getAllQuestion({
            current: question_details.index,
            token: auth_details.token,
            refreshToken: auth_details.refreshToken,
            id: auth_details.id
        }))
    }

    const Submit = () => {
        setSubmitLoading(false)
        setSubmit(true)
    }
    const submitHandler = () => {
        setSubmitLoading(true)
        dispatch(SubmitExam(
            {
                token: auth_details.token,
                refreshToken: auth_details.refreshToken,
                id: auth_details.id,
                exam_id: exam_details.exam_id
            }
        ))
        router.push("/student/profile")
    }
    const goToQuestion = (index) => {
        dispatch(getIndexQuestion({
            index,
            token: auth_details.token,
            refreshToken: auth_details.refreshToken,
            id: auth_details.id
        }))
        setShowDialog(false)
    }
    useEffect(() => {
        if (!auth_details.check_loading) {
            if (!auth_details.isAuthenticated) {
                router.replace("/student")
            }
        }
    }, [auth_details.check_loading, auth_details.isAuthenticated, router])

    const closeDialog = () => {
        setSubmit(false)
        setSubmitLoading(false)
    }

    return <>
        <Stack sx={{
            width: "100%",
            flex: 9.6,
            height: "100vh",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "scroll"
        }}>

            <SnackBarComponent
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                close={() => { console.log("close") }}
                open={question_details.error || question_details.answer_err}
                type={"error"}
                duration={60000}
                message={question_details.error || question_details.answer_err}
            />

            <Dialog open={showDialog} onClose={() => setShowDialog(false)} sx={{
                width: "100%"
            }}>
                <DialogContent sx={{
                    width: "100%"
                }}>
                    <Typography sx={{
                        fontSize: "1.4rem",
                        fontWeight: "700"
                    }}>ALL QUESTIONS</Typography>

                    {question_details.all ? <CircularProgress variant={"indeterminate"} />
                        :
                        question_details.allQuest.map(el => <Stack onClick={() => goToQuestion(el.index)} key={el.index} sx={{
                            width: "100%",
                            flexFlow: "row wrap",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}>
                            <Box sx={{
                                display: "flex",
                                width: "80%",
                                jistifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Typography sx={{
                                    fontSize: "1.3rem",
                                    color: colors.side_blue
                                }}>Question {el.index}</Typography>
                                <Checkbox
                                    checked={el.done}
                                    disabled
                                    aria-label="This show if"
                                />
                            </Box>
                        </Stack>)}
                </DialogContent>
            </Dialog>


            <Stack sx={{
                width: {
                    md: "90%",
                    lg: "80%"
                },
                marginY: "20px"
            }} direction={"row"} justifyContent={"space-between"}>
                <Button variant={"contained"} sx={{
                    backgroundColor: colors.side_blue,
                    color: colors.backgroun_color,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    width: "20rem",
                    '&:hover': {
                        backgroundColor: colors.side_blue,
                        color: colors.backgroun_color,
                    }
                }}
                    onClick={allQuestion}
                >All Questions</Button>
                <Button variant={"contained"} sx={{
                    backgroundColor: colors.side_blue,
                    color: colors.backgroun_color,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    width: "20rem",
                    height: "4rem",
                    '&:hover': {
                        backgroundColor: colors.side_blue,
                        color: colors.backgroun_color,
                    }
                }}
                    onClick={Submit}
                >Submit</Button>
            </Stack>
            <Paper sx={{
                width: "90%",
                height: "auto",
                boxShadow: ".1px .1px .1px 1px " + colors.side_blue
            }}>
                <SingleExam />
            </Paper>
            <Stack sx={{
                width: {
                    md: "90%",
                    lg: "80%"
                }
            }} direction={"row-reverse"} justifyContent={"space-between"}>
                <Button variant={"contained"} sx={{
                    backgroundColor: colors.side_blue,
                    color: colors.backgroun_color,
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    width: "20rem",
                    marginY: "20px",
                    height: "4rem",
                    '&:hover': {
                        backgroundColor: colors.side_blue,
                        color: colors.backgroun_color,
                    }
                }}
                    onClick={nextQuestion}
                >
                    {remaining ? "Save Answer" : "Next"}
                </Button>
                <Button
                    onClick={prevQuestion}
                    variant={"contained"} sx={{
                        backgroundColor: colors.side_blue,
                        color: colors.backgroun_color,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        width: "20rem",
                        marginY: "20px",
                        '&:hover': {
                            backgroundColor: colors.side_blue,
                            color: colors.backgroun_color,
                        }
                    }}>Prev</Button>
            </Stack>

        </Stack>
        <Dialog onClose={closeDialog} open={submit}>
            {submitLoading ? <><Box sx={{
                padding: '1rem '
            }}>
                <CircularProgress variant={"indeterminate"} />
            </Box>
            </> : <><DialogContent>
                Are you sure you want to submit ?
            </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSubmit(false)}>Cancel</Button>
                    <Button onClick={submitHandler}>Submit</Button>
                </DialogActions>
            </>
            }
        </Dialog>
    </>

}

export default ExaminationCenter