import { Box, Button, TextField } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeadComponent from "../components/header/head"
import MainNav from "../components/navigation/main-nav"
import SnackBarComponent from "../components/UI/error"
import { unsubscribe } from "../store/subscription"

const Unsubscribe = () => {
    const emailRef = useRef()
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [messageVal, setMessageVal] = useState(null)

    const dispatch = useDispatch()
    const { loading: store_loading, error: store_error, message } = useSelector(state => state.subscribe)


    const submitHandler = () => {
        const email = emailRef.current.value
        if (!emailRef || emailRef.length < 1) {
            setShowError(true)
            setError("please enter your email")
        }
        else {
            dispatch(unsubscribe({ email }))
        }
    }
    useEffect(() => {
        if (store_error) {
            setShowError(true)
            setError(store_error)
        }
    }, [store_error])
    useEffect(() => {
        if (message) {
            setShowMessage(true)
            setMessageVal(message)
            emailRef.current.value=""
        }
    }, [message])


    return <Stack>
        <SnackBarComponent
            open={showError}
            type={"error"}
            close={() => setShowError(false)}
            message={error}
            duration={50000}
        />
        <SnackBarComponent
            open={showMessage}
            type={"success"}
            close={() => setShowMessage(false)}
            message={messageVal}
            duration={50000}
        />

        <Stack>
            <MainNav />
        </Stack>
        <HeadComponent
            title={"Unsubscribe"}
            content={"Use this page to unsubscribe from our mails"}
        />
        <Stack sx={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            marginTop: "2rem"
        }}>
            Unsubscribe here
        </Stack>
        <Box sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Box sx={{
                width: {
                    xs: "80%",
                    sm: "50%",
                    md: "30rem"
                },
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <TextField placeholder="enter your email here" type={"email"} inputRef={emailRef} sx={{
                    width: "70%",
                    margin: "1rem 0px"
                }} />
                <Button variant={"contained"} sx={{
                    width: "30%",
                    fontWeight: "700"
                }}
                    onClick={submitHandler}
                >Unsubscribe</Button>
            </Box>
        </Box>
    </Stack>
}


export default Unsubscribe