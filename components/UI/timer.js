import { CircularProgress, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTime } from '../../store/exam-slice'
import { SubmitExam } from '../../store/question'


const Timer = () => {

    const auth_details = useSelector(state => state.auth)
    const exam_details = useSelector(state => state.exam)
    const router = useRouter()


    const dispatch = useDispatch()
    const [exam_minutes, set_exam_einuted] = useState(0);
    const [exam_seconds, set_seconds] = useState(0)
    const [minutes, setMinutes] = useState(exam_minutes)
    const [seconds, setSeconds] = useState(exam_seconds)
    const [finished, setFinieshed] = useState(false)
    const [timeToSubmit, setTimeToSubmit] = useState(5)
    const [submit, setSubmit] = useState(false)


    // console.log(exam_details.time)


    const { time, time_loading, time_error } = auth_details

    const { exam_id } = exam_details
    const { id, token, refreshToken } = auth_details
    const local_seconds_var = +localStorage.getItem("Seconds")
    const local_minutes_var = +localStorage.getItem("Minutes")
    console.log(time, time_loading, local_minutes_var, local_minutes_var)

    useEffect(() => {
        const local_seconds = +localStorage.getItem("Seconds")
        const local_minutes = +localStorage.getItem("Minutes")

        console.log(local_seconds, local_minutes, "Ademola")
        console.log(time)
        if ((!local_seconds || !local_minutes) && time) {
            setMinutes(+time.split(":")[0])
            setSeconds(+time.split(":")[1])
        } else if (local_seconds || local_minutes) {
            setMinutes(local_minutes)
            setSeconds(local_seconds)
        }
    }, [time])
    const reduceTimer = useCallback(() => {
        if (minutes === 0 && seconds === 0) {
            setSeconds(0)
            setMinutes(0)
            setFinieshed(true)
            return;
        }
        if (seconds < 1) {
            setSeconds(59)
            setMinutes(prev => prev - 1)
        } else {
            setSeconds(prev => prev - 1)
        }
    }, [minutes, seconds])

    const reduceTimerExamSubmit = useCallback(() => {
        if (timeToSubmit === 0) {
            dispatch(SubmitExam({
                exam_id,
                id, token, refreshToken
            }))
            router.replace("/student/profile")
            return;
        }
        setTimeToSubmit(prev => prev - 1)
    }, [timeToSubmit, exam_id, id, token, refreshToken, dispatch, router])

    useEffect(() => {
        let interval;
        if (finished) {
            interval = setInterval(() => {
                reduceTimerExamSubmit()
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [timeToSubmit, finished, reduceTimerExamSubmit])


    useEffect(() => {
        dispatch(setTime(minutes, seconds))
    }, [minutes, seconds, dispatch])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!finished) {
                reduceTimer()
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [reduceTimer, finished])


    return (<span>

        <Dialog open={finished} >
            <DialogTitle sx={{
                fontSize: "3rem",
                fontWeight: 700,
                textAlign: "center"
            }}>Time Exceeded</DialogTitle>
            <DialogContent sx={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 700
            }}>
                Exam will be submitted Automatically in <span style={{
                    fontSize: "1.1rem"
                }}>{timeToSubmit}</span> seconds
            </DialogContent>
        </Dialog>


        <>
            {time_loading ? <CircularProgress variant={"indeterminate"} /> : <>
                {minutes > 9 ? minutes : "0" + minutes}:{seconds > 9 ? seconds : "0" + seconds}
            </>
            }</>
    </span>
    )
}


export default Timer