import { useRef, useState } from "react"
import HeadComponent from "../../../../components/header/head"
import MainNav from "../../../../components/navigation/main-nav"
import { Box, Button, Stack, TextField, Typography, Paper } from "@mui/material"
import SnackBarComponent from "../../../../components/UI/error"



const EditAbout = () => {
    const aboutRef = useRef("")

    const [showErr, setShowErr] = useState(false)
    const [TotalError, setTotalError] = useState("")

    const [showSucc, setShowSucc] = useState(false)
    const [TotalSuccess, setTotalSuccess] = useState("")

    const [loading, setLoading] = useState(false)

    const aboutSubmitHandler = async () => {
        setLoading(true)
        const aboutMess = aboutRef.current.value
        if (aboutMess.length < 1) {
            setLoading(false)
            setShowErr(true)
            setTotalError("Vision field is required")
            return
        }
        const response = await fetch("/api/about", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ message: aboutMess.trim() })
        })
        if (!response.ok) {
            aetLoading(false)
            const error = await response.json()
            setShowErr(true)
            setTotalError(error.message)

        }
        const values = await response.json()
        setLoading(false)
        aboutRef.current.value = ""
        setTotalSuccess(values.message)
        setShowSucc(true)
    }

    return <>
        <SnackBarComponent
            open={showErr}
            message={TotalError}
            close={() => setShowErr(false)}
            duration={10000}
            type={"error"}
        />
        <SnackBarComponent
            open={loading}
            message={"Loading"}
            close={() => setLoading(false)}
            duration={10000}
            type={"warning"}
        />
        <SnackBarComponent
            open={showSucc}
            message={TotalSuccess}
            close={() => setShowSucc(false)}
            duration={10000}
            type={"success"}
        />
        <HeadComponent title={"Biography Edit"} content={"Edit Biography Here"} />
        <Stack sx={{
            margin: "0px 0px 3rem 0px",
            width: "100%"
        }}>
            <MainNav />
        </Stack>
        <Stack sx={{
            alignItems: "center",
            justfifyContent: "center"
        }}>
            <Typography sx={{
                width: "100%",
                marginBottom: "1rem",
                textAlign: "center",
                fontSize: {
                    xs: "1.2rem",
                    sm: "2rem",
                    md: "2rem",
                },
                fontWeight: {
                    xs: "600",
                    sm: "700",
                    md: "800",
                    lg: "700"
                },
            }}>Edit About</Typography>
            <Paper sx={{
                boxShadow: ".1px .1px .1px 1px grey",
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem 0px"
            }}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexFlow: "column",
                    alignItems: "center"
                }}>
                    <Typography sx={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: {
                            xs: "1.2rem",
                            sm: "2rem",
                            md: "2rem",
                        },
                        fontWeight: {
                            xs: "600",
                            sm: "700",
                            md: "800",
                            lg: "700"
                        },
                    }}>Our Biography</Typography>
                    <Stack sx={{
                        width: "60%",
                        justifyContent: "center"
                    }}>
                        <Box sx={{
                            width: "100%",
                            justifyContent: "center",
                        }}>
                            <TextField inputRef={aboutRef} placeholder="" fullWidth multiline maxRows={5} />
                        </Box>
                        <Box sx={{
                            width: "100%",
                            margin: "1rem 0px 0px 0px",
                            justifyContent: "center",
                            display: "flex"
                        }}>
                            <Button disabled={loading} onClick={aboutSubmitHandler} variant="contained" sx={{
                                fontSize: "2rem"
                            }}>Submit</Button>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Stack>
    </>
}
export default EditAbout