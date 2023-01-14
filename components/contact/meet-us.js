import { AddIcCall, LocationOn } from "@mui/icons-material"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import SnackBarComponent from "../UI/error"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { new_subscribe } from "../../store/subscription"


const MeetUs = () => {
    const emailRef = useRef()
    const [error, setError] = useState(null)
    const [showError, setShowError] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [messageVal, setMessageVal] = useState(null)

    const dispatch = useDispatch()
    const { loading: store_loading, error: store_error, message } = useSelector(state => state.subscribe)


    const submitHandler = () => {
        const emailVal = emailRef.current.value;
        if (!emailVal || emailVal.length < 1) {
            setShowError(true)
            setError("please enter your email")
        } else {
            dispatch(new_subscribe({ email: emailVal }))

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
        }
        emailRef.current.value = ""
    }, [message])

    return <>
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
            Meet us
        </Box>
        <Stack>
            <Box sx={{
                width: "100%",
                display: "flex",
                textAlign: "center",
                display: "flex",
                flexFlow: {
                    xs: "column"
                }
            }}>
                <IconButton disableRipple>
                    <LocationOn />
                </IconButton>
                <Typography>
                    Onigege Ara Street, Ishara, Remo North, Ogun State, Nigeria
                </Typography>
            </Box>
            <Box sx={{
                width: "100%",
                display: "flex",
                textAlign: "center",
                display: "flex",
                flexFlow: {
                    xs: "column"
                }
            }}>
                <IconButton disableRipple>
                    <AddIcCall />
                </IconButton>
                <Typography>
                    <a href="tel:+2348033746834" style={{
                        color: "black",
                        cursor: "pointer"
                    }}>+234 8033 7468 34</a>
                </Typography>
            </Box>
            <Box sx={{
                width: "100%",
                display: "flex",
                textAlign: "center",
                display: "flex",
                flexFlow: {
                    xs: "column"
                },
                alignItems: "center",
                padding: "1rem 0px",
                justifyContent: "space-evenly",
            }}>
                <Typography sx={{
                    fontSize: {
                        xs: "1rem",
                        sm: "1.5rem"
                    },
                    borderTop: "1px solid grey",
                    fontWeight: 700,
                    width: "100%",
                    margin: " 0px 0px .7rem 0px"
                }}>Subscribe to our newsletter</Typography>
                <TextField fullWidth placeholder="enter your email here" inputRef={emailRef} />
                <Button onClick={submitHandler} variant={"contained"} sx={{
                    width: {
                        xs: "40%"
                    },
                    margin: ".8rem 0px"
                }}>Subscribe</Button>
            </Box>
        </Stack>
    </>
}
export default MeetUs