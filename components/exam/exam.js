import { CircularProgress, Stack, Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import ExamOptions from './exam_options'
import { useDispatch, useSelector } from 'react-redux'
import { checkStatus, checkTime } from '../../store/auth-slice'
import { getStartQuestion } from '../../store/question'
import Image from 'next/image'
import { request_url } from '../../util/base-url'


const SingleExam = (props) => {
    const dispatch = useDispatch()
    const { token, refreshToken, id, time } = useSelector(state => state.auth)
    const question_details = useSelector(state => state.question)

    useEffect(() => {
        dispatch(checkStatus({
            token, refreshToken, id
        }))
    })
    useEffect(() => {
        dispatch(checkTime({
            token,
            refreshToken,
            time,
            id,
        }))
    }, [dispatch, token, refreshToken, id, time])
    useEffect(() => {
        dispatch(getStartQuestion({
            token: token,
            refreshToken: refreshToken,
            id: id
        }))
    }, [token, refreshToken, id, dispatch])

    return (
        <Stack sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: question_details.loading ? "50rem" : "100%"
        }}>
            {question_details.loading ? <CircularProgress variant={"indeterminate"} /> : <><Stack>
                <Typography sx={{
                    fontSize: "1.7rem",
                    fontWeight: "500",
                    textAlign: "center",
                    width: "95%",
                    padding: "1rem",
                    overflowWrap: "break-word"
                }}>{question_details.question}</Typography>
                {question_details.image && <Stack sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}><Box sx={{
                    position: "relative",
                    height: "40rem",
                    width: "35rem",
                }}>
                        <Image
                            alt="question image"
                            src={`${request_url}/${question_details.image}`}
                            layout='fill'
                            objectFit='cover'
                            objectPosition={"top center"}

                            priority />
                    </Box></Stack>}
            </Stack>
                <ExamOptions answers={question_details.answers} />
            </>
            }

        </Stack>
    )
}

export default SingleExam