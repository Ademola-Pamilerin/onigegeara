import { Box, Button, Stack, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import SnackBarComponent from "../UI/error"

const ContactPage = props => {
    const nameRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const [showMessage, setShowMessage] = useState(false)


    const submitHandler = () => {
        const inputVal = nameRef.current.value;
        const emailVal = emailRef.current.value;
        const messageVal = messageRef.current.value;

        if (!inputVal || !emailVal || !messageVal) {
            setShowError(true)
            setError("please fil out all fields in the form")
        }
    }

    return <>
        <SnackBarComponent
            open={showError}
            type={"error"}
            close={() => setShowError(false)}
            message={error}
            duration={50000}
        />
        <Box sx={{
            fontSize: {
                xs: "1rem",
                sm: "1.5rem"
            },
            fontWeight: 700,
            width: "100%",
            textAlign: "center",
            borderBottom: "1px solid grey",
            paddingBottom: ".5rem"
        }}>
            Feedback
        </Box>
        <Stack sx={{
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "100%"
        }}>
            <Box sx={{
                width: "100%",
                alignItems: "center"
            }}>
                <TextField inputRef={nameRef} fullWidth placeholder="please enter your name here" required label={"Name"} />
            </Box>
            <Box sx={{
                width: "100%",
                alignItems: "center"
            }}>
                <TextField inputRef={emailRef} fullWidth type={"email"} required placeholder="please enter your email here" label={"Email"} />
            </Box>
            <Box sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: {
                    xs: "6rem"
                }
            }}>
                <textarea ref={messageRef} className={"text_area"} rows={5} placeholder={"your message here"} />
            </Box>

            <Box sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: "1rem"
            }}>
                <Button
                    onClick={submitHandler}
                    sx={{
                        width: {
                            xs: "80%",
                            sm: "40%",
                            md: "10rem"
                        }
                    }} variant="contained"> Submit </Button>
            </Box>
        </Stack>
    </>
}
export default ContactPage