import { Box, Paper, Typography, Stack, Button, CircularProgress } from "@mui/material"
import { colors } from '../../util/them';
import useInput from '../../hooks/useInput'
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SnackBarComponent from "../UI/error";
import { request_url } from '../../util/base-url'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../../store/auth-slice";
import Message from "../UI/message";


const SignUp = (props) => {

    const [Totalerror, setTotalError] = useState("")
    const [show, setShow] = useState(false)
    const [loggin, setLoggin] = useState(false)

    const dispatch = useDispatch()
    const auth_details = useSelector(state => state.auth)

    const {
        onChange: first_name_changed,
        onTouchend: first_name_blur,
        onTouchStart: first_name_focused_handler,
        value: first_name_input_value,
        hasError: first_name_has_error,
        fixError: first_name_fix_error,
        focus: first_name_focused,
        touched: first_name_touched,
        errorMessage: first_name_error_message

    } = useInput("text", "First Name")
    const {
        onChange: last_name_changed,
        onTouchend: last_name_blur,
        onTouchStart: last_name_focused_handler,
        value: last_name_input_value,
        hasError: last_name_has_error,
        fixError: last_name_fix_error,
        focus: last_name_focused,
        touched: last_name_touched,
        errorMessage: last_name_error_message

    } = useInput("text", "Last Name")
    const {
        onChange: email_changed,
        onTouchend: email_blur,
        onTouchStart: email_focused_handler,
        value: email_input_value,
        hasError: email_has_error,
        fixError: email_fix_error,
        focus: email_focused,
        touched: email_touched,
        errorMessage: email_error_message

    } = useInput("text", "Email")
    const {
        onChange: password_changed,
        onTouchend: password_blur,
        onTouchStart: password_focused_handler,
        value: password_input_value,
        hasError: password_has_err,
        fixError: password_fix_error,
        focus: password_focused,
        touched: password_touched,
        errorMessage: password_error_message

    } = useInput("text", "Password")


    const Submit = async () => {
        if (!first_name_input_value) {
            setTotalError("Please provide value in First name field")
            return;
        }
        else if (!last_name_input_value) {
            setTotalError("Please provide value in Last name field")
            return;
        }
        else if (!email_input_value) {
            setTotalError("Please provide value in Email field")
            return;
        }
        else if (!password_input_value) {
            setTotalError("Please provide value in Email field")
            return;
        }
        else {
            dispatch(authActions.showNotification({ type: "loading" }))
            const value = JSON.stringify({
                firstname: first_name_input_value,
                lastname: last_name_input_value,
                email: email_input_value,
                password: password_input_value
            })

            try {
                const response = await fetch(`${request_url}/user/teacher/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: value
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
                const data = await response.json();
                dispatch(authActions.showNotification({
                    type: "success"
                }))
                setLoggin(true)
                // router.replace("/student/profile")
            }
            catch (error) {
                setLoggin(false)
                dispatch(authActions.showNotification({
                    type: "error",
                    error: error.message
                }))
                setTotalError(error.message)
            }




        }
    }

    useEffect(() => {
        if (first_name_has_error) {
            setTotalError(first_name_fix_error)
        } else if (last_name_has_error) {
            setTotalError(last_name_fix_error)
        }
        else if (email_has_error) {
            setTotalError(email_fix_error)
        } else if (password_has_err) {
            setTotalError(password_fix_error)
        }
        return () => {
            setTotalError("")
        }
    }, [
        first_name_has_error,
        first_name_fix_error,
        last_name_has_error,
        password_has_err,
        password_fix_error,
        last_name_fix_error,
        email_has_error,
        email_fix_error
    ])


    const { error, loading, isAuthenticated } = auth_details

    useEffect(() => {
        if (!loading && error) {
            setTotalError(error)
        }
    }, [loading, error])

    console.log(isAuthenticated)

    return <>
        {loggin ? <Message message={"Please verify your Account from Admin"} />
            :
            <>
                <SnackBarComponent
                    type={loggin ? "success" : "error"}
                    message={Totalerror ? Totalerror : loggin ? "Signing up" : ""}
                    open={Totalerror ? true : loggin ? true : false}
                    close={() => setTotalError("")}
                    duration={loggin ? 60000 : Totalerror ? 6000 : 0}
                />
                <Paper sx={{
                    backgroundColor: {
                        xs: "black",
                        lg: "black"
                    },
                    height: {
                        md: "25rem",
                        lg: "30rem"
                    },
                    width: {
                        xs: "80%",
                        sm: "70%",
                        md: "70%",
                        lg: "60%"
                    },
                    opacity: 0.7,
                    boxShadow: ".1px .1px .1px 1 rgba(230, 196, 166, 0.5)",
                    borderRadius: {
                        xs: "40px",
                        sm: "30px",
                        lg: "30px"
                    },
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexFlow: "column"
                }} className={"paper"}>

                    <Typography sx={{
                        width: "100%",
                        textAlign: "center",
                        textDecoration: "underline",
                        fontSize: {
                            xs: "1.5rem",
                            sm: '2.2rem',
                            lg: "2rem"
                        },
                        fontWeight: {
                            xs: 600,
                            sm: 600,
                            md: 700,
                            lg: 800
                        },
                        color: "white"
                    }}>Create New Account</Typography>
                    <Stack sx={{
                        width: "100%",
                        display: "flex",
                        flexFlow: 'row wrap',
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexFlow: "row",
                            height: {
                                xs: "3rem",
                                sm: "4rem",
                                md: "4rem",
                                lg: "4rem"
                            },
                            width: "40%",
                            padding: {
                                xs: 0,
                                sm: "0px 10px",
                                md: "5px"
                            },
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px"
                            },
                            border: first_name_has_error ? "1px solid red" : "none",
                            margin: "1rem 0px"

                        }}>
                            <input
                                type="text"
                                onChange={first_name_changed}
                                onFocus={first_name_focused_handler}
                                onBlur={first_name_blur}
                                value={first_name_input_value}
                                className={"input"}
                                placeholder={"First Name"}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexFlow: "row",
                            height: {
                                xs: "3rem",
                                sm: "4rem",
                                md: "4rem",
                                lg: "4rem"
                            },
                            width: "40%",
                            padding: {
                                xs: 0,
                                sm: "0px 10px",
                                md: "5px"
                            },
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px"
                            },
                            border: last_name_has_error ? "1px solid red" : "none",
                            margin: "1rem 0px",
                        }}>
                            <input
                                type={"text"}
                                onChange={last_name_changed}
                                onFocus={last_name_focused_handler}
                                onBlur={last_name_blur}
                                value={last_name_input_value}
                                className={"input"}
                                placeholder={"Last Name"}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexFlow: "row",
                            height: {
                                xs: "3rem",
                                sm: "4rem",
                                md: "4rem",
                                lg: "4rem"
                            },
                            width: "40%",
                            padding: {
                                xs: 0,
                                sm: "0px 10px",
                                md: "5px"
                            },
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px"
                            },
                            border: email_has_error ? "1px solid red" : "none",
                            margin: "1rem 0px"

                        }}>
                            <input
                                type="email"
                                onChange={email_changed}
                                onFocus={email_focused_handler}
                                onBlur={email_blur}
                                value={email_input_value}
                                className={"input"}
                                placeholder={"Email"}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexFlow: "row",
                            height: {
                                xs: "3rem",
                                sm: "4rem",
                                md: "4rem",
                                lg: "4rem"
                            },
                            width: "40%",
                            padding: {
                                xs: 0,
                                sm: "0px 10px",
                                md: "5px"
                            },
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: {
                                xs: "10px",
                                sm: "15px",
                                md: "20px"
                            },
                            border: password_has_err ? "1px solid red" : "none",
                            margin: "1rem 0px",
                        }}>
                            <input
                                type={show ? "text" : "password"}
                                onChange={password_changed}
                                onFocus={password_focused_handler}
                                onBlur={password_blur}
                                value={password_input_value}
                                className={"input"}
                                placeholder={"Your Password"}
                                style={{
                                    width: "90%",
                                    overflow: "scroll",
                                    display: "block",
                                    marginRight: "10px"
                                }}
                            />
                            <span onClick={() => { setShow(prev => !prev) }} style={{
                                right: "10px",
                                cursor: "pointer",
                                width: "10%",
                                display: "block"
                            }}>
                                {!show ? <Visibility sx={{
                                    fontSize: "2rem"
                                }} /> :
                                    <VisibilityOff sx={{
                                        fontSize: "2rem"
                                    }} />}
                            </span>
                        </Box>

                    </Stack>
                    <Button
                        onClick={Submit}
                        variant={"contained"} sx={{
                            color: "rgba(252, 252, 252, 1)",
                            backgroundColor: "rgba(255, 122, 0, 1)",
                            width: "15rem",
                            borderRadius: {
                                xs: "10px",
                                sm: "10px",
                                md: "20px"
                            },
                            fontSize: {
                                xs: "1.3rem",
                                sm: "2rem",
                                md: "1.8rem",
                                lg: "2rem"
                            },
                            fontWeight: {
                                xs: 600,
                                sm: 800,
                                md: 600,
                                lg: ""
                            },
                            height: {
                                xs: "3rem",
                                sm: "4rem",
                                lg: "4rem"
                            },
                            '&:hover': {
                                color: "rgba(252, 252, 252, 1)",
                                backgroundColor: "rgba(255, 122, 0, 1)",
                            }
                        }}

                    >
                        {loading ? <CircularProgress variant="indeterminate" /> : "REGISTER"}
                    </Button>
                    <Stack sx={{
                        width: "80%",
                        color: "white",
                        textAlign: "center",
                        fontSize: "1rem",
                        flexFlow: "row",
                        justifyContent: "center",
                        alignItem: "center"
                    }}>
                        Already have an account, login <span style={{
                            marginLeft: "3px",
                            textDecoration: "underline",
                            cursor: "pointer"
                        }} onClick={props.clicked}> here</span>
                    </Stack>
                </Paper>
            </>
        }
    </>
}

export default SignUp