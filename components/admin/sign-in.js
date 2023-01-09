import { Box, Paper, Typography, Stack, Button, CircularProgress } from "@mui/material"
import { colors } from '../../util/them';
import useInput from '../../hooks/useInput'
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SnackBarComponent from "../UI/error";
import { request_url } from '../../util/base-url'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "../../store/auth-slice";
import Message from "../UI/message";
import { useRouter } from 'next/router'
import { AdminAction } from "../../store/admin-slice";


const AdminSignIn = (props) => {

    const [Totalerror, setTotalError] = useState("")
    const [show, setShow] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [loggin, setLoggin] = useState(false)

    const dispatch = useDispatch()
    const auth_details = useSelector(state => state.auth)
    const { error, loading } = useSelector(state => state.admin)
    const router = useRouter()

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
        if (!email_input_value) {
            setTotalError("Please provide value in Email field")
            return;
        }
        else if (!password_input_value) {
            setTotalError("Please provide value in Email field")
            return;
        }
        else {
            const value = JSON.stringify({ email: email_input_value, password: password_input_value })
            dispatch(AdminAction.showNotification({ type: "loading" }))
            try {
                const response = await fetch(`${request_url}/user/admin/login`, {
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
                localStorage.setItem("Token", data.token)
                localStorage.setItem("Refresh_Token", data.refresh_token)
                localStorage.setItem("Id", data.id)
                dispatch(AdminAction.showNotification({
                    type: "success",
                }))
                dispatch(authActions.loginStudent({
                    token: data.token,
                    refreshToken: data.refresh_token,
                    type: "Admin",
                    id: data.id
                }))
                router.replace("/ogac/admin/admin")

            }
            catch (error) {
                dispatch(AdminAction.showNotification({
                    type: "error",
                    error: error.message
                }))
                setTotalError(error.message)
            }
        }
    }


    useEffect(() => {
        if (email_has_error) {
            setTotalError(email_fix_error)
        } else if (password_has_err) {
            setTotalError(password_fix_error)
        }
        return () => {
            setTotalError("")
        }
    }, [password_has_err, email_has_error, email_fix_error, password_fix_error])
    useEffect(() => {
        if (!loading && error) {
            setTotalError(error)
        }
    }, [loading, error])



    return <>
        {showMessage ? <Message message={"Please verify your Account from Admin"} /> :
            <>
                <SnackBarComponent
                    type={loggin ? "success" : "error"}
                    message={Totalerror ? Totalerror : loggin ? "Loggin in" : ""}
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
                        lg: "40%"
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
                    }}>LOGIN</Typography>
                    <Box sx={{
                        display: "flex",
                        flexFlow: "row",
                        height: {
                            xs: "3rem",
                            sm: "4rem",
                            md: "4rem",
                            lg: "4rem"
                        },
                        width: {
                            xs: "90%",
                            sm: "85%",
                            md: "80%"
                        },
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
                        border: email_has_error ? "1px solid red" : "none"

                    }}>
                        <input
                            type="email"
                            onChange={email_changed}
                            onFocus={email_focused_handler}
                            onBlur={email_blur}
                            value={email_input_value}
                            className={"input"}
                            placeholder={"Your Email"}
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
                        width: {
                            xs: "90%",
                            sm: "85%",
                            md: "80%"
                        },
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
                    <Button
                        variant={"contained"} sx={{
                            color: "rgba(252, 252, 252, 1)",
                            backgroundColor: "rgba(255, 122, 0, 1)",
                            width: {
                                xs: "10rem",
                                sm: "15rem",
                                md: "15rem",
                                lg: "70%"
                            },
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
                        onClick={Submit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress variant="indeterminate" /> : "Sign In"}
                    </Button>
                </Paper>
            </>
        }
    </>
}

export default AdminSignIn