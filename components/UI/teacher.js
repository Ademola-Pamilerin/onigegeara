import { Box, Button, ButtonGroup, Stack } from '@mui/material'
import { colors } from '../../util/them'
import { useRouter } from 'next/router'
import Image from 'next/image'


const Teacher = (props) => {

    const { now } = props

    const router = useRouter()


    const btnClicked = (path) => {
        router.push(`/teacher/dashboard/${path}`)
    }

    return <>
        <Stack direction={"row"} spacing={.3} sx={{
            flex: 12,
            width: "100%",
            backgroundColor: colors.backgroun_color,
            height: "100vh",
            overflow: "hidden"
        }}>
            <Stack sx={{
                flex: 3,
                width: "100%",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto",
                position: "relative"
            }}>
                <Stack sx={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                    height: "100vh"
                }}>
                    <Box sx={{
                        position: "relative",
                        height: "100vh",
                        width: "100%"
                    }}>
                        <Image
                            src={require("../../static/ogac-1.png")}
                            layout={"fill"}
                            objectFit={"cover"}
                            objectPosition={"center center"}
                            alt={"Teacher's Dashboard image"} />
                    </Box>
                </Stack>

                <ButtonGroup sx={{
                    width: "80%",
                    flexFlow: "column",
                    justifyContent: "space-between",
                    // marginBottom: "1rem",
                    // padding: "20px 0px",
                    height: "100%",
                    position: "relative",
                    zIndex: 30
                }}>
                    <Button sx={{
                        backgroundColor: now === "home" ? "white" : colors.side_blue,
                        color: now == "home" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "1rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#home")}>DashBoard</Button>

                    <Button sx={{
                        backgroundColor: now === "exam" ? "white" : colors.side_blue,
                        color: now == "exam" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "0rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} onClick={() => btnClicked("#exam")} variant={"contained"}>Set Exam</Button>
                    <Button sx={{
                        backgroundColor: now === "result" ? "white" : colors.side_blue,
                        color: now === "result" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "1rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#student")}>Result</Button>
                    <Button sx={{
                        backgroundColor: now === "class" ? "white" : colors.side_blue,
                        color: now == "class" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "0rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#student")}>Class</Button>
                    <Button sx={{
                        backgroundColor: now === "All Exams" ? "white" : colors.side_blue,
                        color: now == "All Exams" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "1rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#exam")}>Exams</Button>
                    <Button sx={{
                        backgroundColor: now === "subject" ? "white" : colors.side_blue,
                        color: now == "subject" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "0rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#subects")}>Subjects</Button>
                    <Button sx={{
                        backgroundColor: now === "assign" ? "white" : colors.side_blue,
                        color: now == "assign" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "1rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#exam")}>Assign Exam</Button>
                    <Button sx={{
                        backgroundColor: now === "account" ? "white" : colors.side_blue,
                        color: now == "account" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "0rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#account")}>Account Details</Button>
                    <Button sx={{
                        backgroundColor: now === "delete" ? "white" : colors.side_blue,
                        color: now == "delete" ? colors.side_blue : "white",
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        margin: "1rem 0px",
                        padding: "20px 10px",
                        '&:hover': {
                            background: "white",
                            color: colors.side_blue
                        }
                    }} variant={"contained"} onClick={() => btnClicked("#account")}>Delete Account</Button>
                </ButtonGroup>
            </Stack>
            <Stack sx={{
                flex: 9,
                width: "100%",
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "auto",
                overflowX: "hidden",
                position: "relative",
                zIndex: 30
            }}>
                {props.children}
            </Stack>
        </Stack>
    </>
}
export default Teacher