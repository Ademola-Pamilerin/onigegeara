import HeadComponent from "../../../../components/header/head"
import MainNav from "../../../../components/navigation/main-nav"
import { Box, Button, Stack, TextField, Typography, Paper } from "@mui/material"
import SnackBarComponent from "../../../../components/UI/error"
import { useRef, useState } from "react"



const Edit_Us = () => {
    const aboutRef = useRef("")
    const missionRef = useRef("")
    const whoRef = useRef("")
    const whatRef = useRef("")
    const [showErr, setShowErr] = useState(false)
    const [TotalError, setTotalError] = useState("")

    const [showSucc, setShowSucc] = useState(false)
    const [TotalSuccess, setTotalSuccess] = useState("")
    const [loading, setLoading] = useState(false)



    const aboutSubmitHandler = async () => {
        setLoading(true)
        const aboutMess = aboutRef.current.value
        if (aboutMess.length < 1) {
            setShowErr(true)
            setTotalError("Vision field is required")
            return
        }
        const response = await fetch("/api/test", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ message: aboutMess.trim() })
        })
        if (!response.ok) {
            const error = await response.json()
            setLoading(false)
            setShowErr(true)
            setTotalError(error.message)
        }
        const values = await response.json()
        setLoading(false)
        aboutRef.current.value = ""
        setTotalSuccess(values.message)
        setShowSucc(true)

    }

    const missionSubmitHandler = async () => {
        const missionMess = missionRef.current.value
        setLoading(true)
        if (missionMess.length < 1) {
            setShowErr(true)
            setTotalError("Mission Field is required")
            return
        }
        const response = await fetch("/api/test", {
            method: "Put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ message: missionMess.trim() })
        })
        if (!response.ok) {
            const error = await response.json()
            setLoading(false)
            setShowErr(true)
            setTotalError(error.message)
        }
        const values = await response.json()
        missionRef.current.value = ""
        setLoading(false)
        setTotalSuccess(values.message)
        setShowSucc(true)
    }
    const whoSubmitHandler = async () => {
        const missionMess = whoRef.current.value
        setLoading(true)
        if (missionMess.length < 1) {
            setShowErr(true)
            setTotalError("who we are field is required")
            return
        }
        const response = await fetch("/api/tests", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ message: missionMess.trim() })
        })
        if (!response.ok) {
            const error = await response.json()
            setLoading(false)
            setShowErr(true)
            setTotalError(error.message)
        }
        const values = await response.json()
        whoRef.current.value = ""
        setLoading(false)
        setTotalSuccess(values.message)
        setShowSucc(true)
    }
    const whatSubmitHandler = async () => {
        setLoading(true)
        const missionMess = whatRef.current.value
        if (missionMess.length < 1) {
            setShowErr(true)
            setTotalError("What we do field is required")
            return
        }
        const response = await fetch("/api/test2", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ message: missionMess.trim() })
        })
        if (!response.ok) {
            setLoading(false)
            const error = await response.json()
            setShowErr(true)
            setTotalError(error.message)
        }
        const values = await response.json()
        whatRef.current.value = ""
        setLoading(false)
        setTotalSuccess(values.message)
        setShowSucc(true)
    }
    return (
        <>
            <SnackBarComponent
                open={showErr}
                message={TotalError}
                close={() => setShowErr(false)}
                duration={10000}
                type={"error"}
            />
            <SnackBarComponent
                open={loading}
                message={TotalError}
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
            <HeadComponent title={"Home Page Edit"} content={"Edit Data on Homepage here"} />
            <Stack sx={{
                margin: "0px 0px 3rem 0px",
                width: "100%"
            }}>
                <MainNav />
            </Stack>
            <Stack sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
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
                }}>Edit About In Home Page</Typography>
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
                        }}>Our Vision</Typography>
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
                <Paper sx={{
                    boxShadow: ".1px .1px .1px 1px grey",
                    width: "60%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem 0px",
                    margin: "1rem 0px"
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
                        }}>Our Mission</Typography>
                        <Stack sx={{
                            width: "60%",
                            justifyContent: "center"
                        }}>
                            <Box sx={{
                                width: "100%",
                                justifyContent: "center",
                            }}>
                                <TextField inputRef={missionRef} placeholder="" fullWidth multiline maxRows={5} />
                            </Box>
                            <Box sx={{
                                width: "100%",
                                margin: "1rem 0px 0px 0px",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Button disabled={loading} onClick={missionSubmitHandler} variant="contained" sx={{
                                    fontSize: "2rem"
                                }}>Submit</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
                <Paper sx={{
                    boxShadow: ".1px .1px .1px 1px grey",
                    width: "60%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem 0px",
                    margin: "1rem 0px"
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
                        }}>WHO WE ARE</Typography>
                        <Stack sx={{
                            width: "60%",
                            justifyContent: "center"
                        }}>
                            <Box sx={{
                                width: "100%",
                                justifyContent: "center",
                            }}>
                                <TextField inputRef={whoRef} placeholder="" fullWidth multiline maxRows={5} />
                            </Box>
                            <Box sx={{
                                width: "100%",
                                margin: "1rem 0px 0px 0px",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Button disabled={loading} onClick={whoSubmitHandler} variant="contained" sx={{
                                    fontSize: "2rem"
                                }}>Submit</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
                <Paper sx={{
                    boxShadow: ".1px .1px .1px 1px grey",
                    width: "60%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2rem 0px",
                    margin: "1rem 0px"
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
                        }}>What WE DO</Typography>
                        <Stack sx={{
                            width: "60%",
                            justifyContent: "center"
                        }}>
                            <Box sx={{
                                width: "100%",
                                justifyContent: "center",
                            }}>
                                <TextField inputRef={whatRef} placeholder="" fullWidth multiline maxRows={5} />
                            </Box>
                            <Box sx={{
                                width: "100%",
                                margin: "1rem 0px 0px 0px",
                                justifyContent: "center",
                                display: "flex"
                            }}>
                                <Button disabled={loading} onClick={whatSubmitHandler} variant="contained" sx={{
                                    fontSize: "2rem"
                                }}>Submit</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            </Stack>

        </>
    )
}
export default Edit_Us