import { Breadcrumbs, Button, CircularProgress, Link, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material"
import Teacher from "../../../components/UI/teacher"
import { useSelector, useDispatch } from 'react-redux'
import { checkStatus } from "../../../store/auth-slice"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { GetSingleExam, setQuestion } from "../../../store/teacher-slice"
import { FileUploadComponent } from "../../../util/upload"
import { colors } from "../../../util/them"
import SnackBarComponent from "../../../components/UI/error"


const SingleExam = () => {
    const dispatch = useDispatch()
    const { check_loading, check_error, id, token, refreshToken, isAuthenticated } = useSelector(state => state.auth)
    const teacher_details = useSelector(state => state.teacher)
    const router = useRouter();
    const { id: examIdVal } = router.query
    const questionRef = useRef(null)
    const option1Ref = useRef("")
    const option2Ref = useRef("")
    const option3Ref = useRef("")
    const option4Ref = useRef("")
    const [image, setImage] = useState(null)
    const [selected, setSelected] = useState('1')
    const [clearImage, setClearImage] = useState(false)
    const [totalError, setTotalError] = useState(null)
    const [mes, setMess] = useState(null)

    const pushVal = (val) => {
        setImage(val)
        setClearImage(false)
    }
    const createQuestion = () => {
        const options = [option1Ref.current.value, option2Ref.current.value, option3Ref.current.value, option4Ref.current.value]
        const question = questionRef.current.value
        let answer;
        if (question === "") {
            setTotalError("Question must be provided")
            return;
        }
        if ((!option1Ref.current.value || !option2Ref.current.value || !option3Ref.current.value || !option4Ref.current.value)) {
            setTotalError("All Options are Required")
            return;
        }

        if (selected == 1) {
            answer = option1Ref.current.value
        } else if (selected == 2) {
            answer = option2Ref.current.value
        } else if (selected == 3) {
            answer = option3Ref.current.value
        } else if (selected == 4) {
            answer = option4Ref.current.value
        }

        dispatch(setQuestion({
            id,
            token, refreshToken,
            image,
            options,
            question,
            answer,
            exam_id: router.query.id
        }))
        option1Ref.current.value = ""
        option2Ref.current.value = ""
        option3Ref.current.value = ""
        option4Ref.current.value = ""
        questionRef.current.value = ""
        setSelected("1")
        setImage("")
        setClearImage(true)
    }

    const selectChanged = (event) => {
        setSelected(event.target.value)
    }
    const { question_loading, question_error, question_message } = teacher_details

    useEffect(() => {
        dispatch(checkStatus())
    }, [dispatch])
    useEffect(() => {
        if (!check_loading && !check_error) {
            if (!isAuthenticated) {
                router.replace("/teacher")
            }
        }
    }, [check_loading, check_error, isAuthenticated, router])

    useEffect(() => {
        if (examIdVal) {
            dispatch(GetSingleExam({
                exam_id: examIdVal,
                id, token, refreshToken
            }))
        }
    }, [dispatch, examIdVal, token, refreshToken, id])

    useEffect(() => {
        if (!question_loading && question_error) {
            setTotalError(question_error)
        }

    }, [question_loading, question_error])

    useEffect(() => {
        if (question_message) {
            setMess(question_message)
        }
    }, [question_message])

    console.log(question_message, mes)

    return <>
        <SnackBarComponent
            open={totalError}
            close={() => setTotalError(null)}
            type={"error"}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            duration={60000}
            message={totalError}
        />
        <SnackBarComponent
            open={mes}
            close={() => setMess(null)}
            type={"success"}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            duration={60000}
            message={mes}
        />
        <Teacher now={"exam"} id="home">
            {check_loading ? <Stack
                sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress variant="indeterminate" />
            </Stack> :
                teacher_details.exam_loading ?
                    <Stack sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}><CircularProgress variant="indeterminate" /></Stack> :
                    teacher_details.exam_class.length < 1 ? "No class selected for this exam" :
                        <Stack sx={{
                            height: "97%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            marginBottom: "1rem"
                        }}>
                            <Breadcrumbs separator=">" sx={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                marginLeft: "10px",
                                marginTop: "3px"
                            }}>
                                <span onClick={() => router.push("/teacher/dashboard")} underline="hover" style={{
                                    fontSize: "1.4rem",
                                    fontWeight: "600",
                                    cursor: "pointer"
                                }}>Home</span>
                                <Typography sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600"
                                }}>add question</Typography>
                            </Breadcrumbs>
                            <Stack direction={"row"} sx={{
                                justifyContent: "space-between",
                                width: "90%",
                                alignItems: "center",
                                height: "1rem",
                                padding: "10px 0px"
                            }}>
                                <Stack sx={{
                                    height: "100%"
                                }}>
                                    <Typography sx={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        color: colors.side_blue_brown
                                    }}>Subject: {teacher_details.exam.subject}</Typography>
                                    <Typography sx={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        color: colors.side_blue_brown
                                    }}>Duration: {teacher_details.exam.time}</Typography>
                                    <Typography sx={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        color: colors.side_blue_brown
                                    }}>Numbers of Questions: {teacher_details.question_length != 0 ? teacher_details.question_length : teacher_details.exam.length}</Typography>
                                </Stack>
                                <Stack direction={"row"} sx={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                                    <Typography sx={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        color: colors.side_blue_brown
                                    }}>
                                        Classes Involved:</Typography>
                                    <ul>
                                        {
                                            teacher_details.exam_class.map((el, i) => (
                                                <li key={el}>{el}</li>
                                            ))}</ul>
                                </Stack>
                            </Stack>
                            <Stack sx={{
                                width: "70%",
                                height: "75%",
                                display: "flex",
                                flexFlow: "row wrap",
                                padding: "2rem 2rem",
                                alignItems: 'center',
                                justifyContent: "center"
                            }}>
                                <Typography sx={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "2rem",
                                    fontWeight: "700"
                                }}>
                                    Add Question
                                </Typography>
                                <TextField
                                    inputRef={questionRef}
                                    sx={{
                                        width: "90%",
                                        fontSize: "2rem",
                                    }}

                                    label={<Typography sx={{
                                        fontSize: "1rem",
                                        fontWeight: "600"
                                    }}>Question</Typography>}
                                    multiline
                                    helperText="Please Add Question"
                                >


                                </TextField>
                                <Stack sx={{
                                    width: "90%",
                                    height: "auto"
                                }}>
                                    <FileUploadComponent pushVal={pushVal} clearImage={clearImage} />
                                </Stack>
                                <Stack sx={{
                                    width: "90%"
                                }}>
                                    <Typography sx={{
                                        width: "100%",
                                        textAlign: "center",
                                        fontSize: "1.2rem",
                                        fontWeight: "600",
                                        margin: "1rem 0px"
                                    }}>
                                        Add Options
                                    </Typography>
                                    <TextField
                                        inputRef={option1Ref}
                                        sx={{
                                            width: "100%",
                                            fontSize: "2rem",
                                        }}

                                        label={<Typography sx={{
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}>Option 1</Typography>}
                                        multiline
                                        helperText="Add First Option"
                                    >
                                    </TextField>
                                    <TextField
                                        inputRef={option2Ref}
                                        sx={{
                                            width: "100%",
                                            fontSize: "2rem",
                                        }}

                                        label={<Typography sx={{
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}>Option 2</Typography>}
                                        multiline
                                        helperText="Add Second Option"
                                    >
                                    </TextField>
                                    <TextField
                                        inputRef={option3Ref}
                                        sx={{
                                            width: "100%",
                                            fontSize: "2rem",
                                        }}

                                        label={<Typography sx={{
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}>Option 3</Typography>}
                                        multiline
                                        helperText="Add Third Oprion"
                                    >
                                    </TextField>
                                    <TextField
                                        inputRef={option4Ref}
                                        sx={{
                                            width: "100%",
                                            fontSize: "2rem",
                                        }}

                                        label={<Typography sx={{
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}>Option 4</Typography>}
                                        multiline
                                        helperText="Add fourth Option"
                                    >
                                    </TextField>
                                </Stack>
                                <Stack sx={{ width: "90%" }}>
                                    <Typography sx={{
                                        width: "100%",
                                        textAlign: "center",
                                        fontSize: "1.2rem",
                                        fontWeight: "600",
                                        margin: "1rem 0px"
                                    }}>
                                        Add Answer
                                    </Typography>
                                    <TextField
                                        onChange={selectChanged}
                                        sx={{
                                            width: "100%",
                                            fontSize: "2rem",
                                        }}
                                        select
                                        label={<Typography sx={{
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}>
                                            Pick answer
                                        </Typography>}
                                        fullWidth
                                        value={selected}
                                        helperText="Pick correct answer from options provided"
                                    >
                                        <MenuItem value={1}>Option 1</MenuItem>
                                        <MenuItem value={2}>Option 2</MenuItem>
                                        <MenuItem value={3}>Option 3</MenuItem>
                                        <MenuItem value={4}>Option 4</MenuItem>
                                    </TextField>
                                </Stack>
                                <Stack sx={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Button onClick={createQuestion} sx={{
                                        width: "50%",
                                        fontWeight: "750",
                                        fontSize: "1.2rem"
                                    }}>Add Question</Button>
                                </Stack>
                            </Stack>

                        </Stack>
            }

        </Teacher>
    </>
}
export default SingleExam