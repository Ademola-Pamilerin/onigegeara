import { Button, Paper, Stack, Typography, CircularProgress } from "@mui/material"
import { request_url } from "../../util/base-url"
import { colors } from "../../util/them"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import SnackBarComponent from "./error"
import { allStudentExam } from "../../store/teacher-slice"


const StudentCard = (props) => {

    const { token, refreshToken, id } = useSelector(state => state.auth)
    const [totalError, setTotalError] = useState()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const clicked = async (id) => {
        setLoading(true)
        setShow(false)
        try {
            const response = await fetch(`${request_url}/exam/re-assign/student/${props.exam_id}`, {

                method: "PUT",
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    student_id: props.id
                })

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
            setShow(false)
            setLoading(false)
            dispatch(allStudentExam({
                id, token, refreshToken, student_id: props.exam_id
            }))
        }
        catch (error) {
            setLoading(false)
            setShow(true)
            setTotalError(error.message)
        }

    }
    return <Paper sx={{
        width: "40%",
        display: "flex",
        flexFlow: "column",
        aligItems: "center",
        justifyContent: "center",
        padding: "1rem, 10px",
        margin: "1rem 0px",
        padding: "1rem 0px"
    }}>
        <SnackBarComponent
            type="error"
            message={totalError}
            close={() => setTotalError("")}
            open={show}
        />

        <Stack sx={{
            height: '80%',
            width: "100%"
        }}>
            <Typography sx={{
                color: colors.side_blue_brown,
                width: "100%",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "700"
            }}>{props.name}</Typography>
            <Typography sx={{
                width: "100%",
                textAlign: "center",
                color: colors.side_blue_brown,
                fontSize: "2rem",
                fontWeight: "700"
            }}>
                {props.class}</Typography>
            <Typography sx={{
                width: "100%",
                textAlign: "center",
                color: colors.side_blue_brown,
                fontSize: "2rem",
                fontWeight: "700"
            }}>
                {props.regNo}</Typography>
        </Stack>
        <Stack sx={{
            height: "20%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem"
        }}>
            <Button sx={{
                color: colors.side_blue_brown,
                width: "30%",
                height: "3rem"
            }} variant={"contained"} onClick={() => clicked()} disabled={loading}>
                {loading ? <CircularProgress variant={"indeterminate"} /> : "RE-ASSIGN"}
            </Button>
        </Stack>
    </Paper>
}

export default StudentCard