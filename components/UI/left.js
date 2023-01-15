import { Stack, Box, Typography, CircularProgress } from "@mui/material"
import Image from 'next/image'
import { colors } from "../../util/them"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getStudentData } from "../../store/student-slice"
import { examInfo } from "../../store/exam-slice"
import { useRouter } from 'next/router';
import { reloadQuestion } from "../../store/question"
import Timer from "./timer"


const ExaminationLeft = () => {

    const dispatch = useDispatch()
    const { token, refreshToken, id } = useSelector(state => state.auth)
    const student_details = useSelector(state => state.student)
    const question_details = useSelector(state => state.question)
    const exam_details = useSelector(state => state.exam)
    const router = useRouter()
    useEffect(() => {
        dispatch(getStudentData({
            token,
            refreshToken,
            id
        }))

    }, [dispatch, token, refreshToken, id])
    useEffect(() => {
        if (router.query.id) {
            dispatch(examInfo({
                token,
                refreshToken,
                id,
                exam_id: router.query.id
            }))
        }
    }, [token, id, router, dispatch, refreshToken])

    const reloadQuestionHandler = () => {
        dispatch(reloadQuestion({
            token, refreshToken, id
        }))
    }


    let time;
    if (exam_details.time) {
        const val = exam_details.time.split(":")
        time = +val[0] * 60 + +val[1]
    }

    return <Stack sx={{
        display: 'flex',
        flexFlow: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
        height: "100vh",
        overflow: "none",
        flex: 2.4,
        position: "relative"
    }}>
        <Stack sx={{
            width: "100%",
            position: "absolute",
            zIndex: -1
        }}>
            <Box sx={{
                position: "relative",
                height: "100vh"
            }}>
                <Image layout="fill" src={require("../../static/ogac-1.png")} alt={"Background Image for Examination"} objectFit={"conver"} objectPosition={"center center"} />
            </Box>
        </Stack>
        <Box sx={{
            height: "10rem",
            width: "14rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
            flex: 9,
            position: "relative",
            zIndex: 20
        }}>
            <Box sx={{
                height: "10rem",
                width: "14rem",
                position: "relative",
                backgroundColor:"silver"
            }}>
                <Image style={{ mixBlendMode: "darken" }} alt={'ONAG LOGO'} src={require("../../static/ogac-logo.png")} layout={"fill"} objectPosition={"center"} objectFit={"cover"} />
            </Box>
            <Typography sx={{
                fontSize: "1.2rem",
                fontWeight: 700
            }}>
                ONI-GEGE ARA
                <br />
                GROUP OF SCHOOLS
            </Typography>
            <Typography sx={{
                fontSize: "1rem",
                fontWeight: 500,
            }}>
                COMPUTER BASED EXAM
            </Typography>
            <Typography sx={{
                fontSize: "1.2rem",
                fontWeight: 800,
            }}>
                {student_details.loading ?
                    <CircularProgress variant={"indeterminate"} /> :
                    <>{student_details.name}
                        <br />
                        {student_details.class}
                    </>
                }
            </Typography>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
            flex: 3,
            position: "relative",
            zIndex: 20
        }}>
            <Typography sx={{
                fontWeight: 700,
                margin: "10px 0px"
            }} >{exam_details.loading ?
                <CircularProgress variant={"indeterminate"} /> :
                <>
                    {exam_details.subject}
                    <br />
                    {exam_details.numbers} Questions
                    <br />
                    {exam_details.time}
                </>}</Typography>

            <Typography>
                Question:
                <br />
                {question_details.remaining}
            </Typography>
        </Box>
        <Box
            onClick={reloadQuestionHandler}
            sx={{
                width: "100%",
                height: "auto",
                flex: 1,
                justifyContent: "center",
                marginY: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                position: "relative",
                zIndex: 20
            }}>
            <Typography sx={{
                width: "100%",
                backgroundColor: colors.side_blue,
                textAlign: "center",
                fontSize: "1.2rem",
                fontWeight: 700,
                height: "100%",
                color: colors.backgroun_color,
                display: "flex",
                justifyContent: "center",
                alignItems: 'center'
            }}>
                Reload Question
            </Typography>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
            flex: 1,
            justifyContent: "center",
            position: "relative",
            zIndex: 20
        }}>
            <Typography sx={{
                width: "100%",
                backgroundColor: colors.side_blue,
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 700,
                height: "100%",
                color: colors.backgroun_color,
                display: "flex",
                justifyContent: "center",
                alignItems: 'center'
            }}>
                {time != undefined && <Timer time={time} />}
            </Typography>
        </Box>
    </Stack >
}

export default ExaminationLeft
