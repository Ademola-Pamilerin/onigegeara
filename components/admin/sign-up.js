import { Box, Paper, Typography, Stack, Button, CircularProgress } from "@mui/material"
import { colors } from '../../util/them';
import useInput from '../../hooks/useInput'
import { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SnackBarComponent from "../UI/error";
import { request_url } from '../../util/base-url'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../UI/message";
import { AdminAction } from "../../store/admin-slice";
import { useRouter } from "next/router";
import { authActions } from "../../store/auth-slice";


const AdminSignUp = (props) => {

    const [Totalerror, setTotalError] = useState("")
    const [show, setShow] = useState(false)
    const [loggin, setLoggin] = useState(false)


    const router = useRouter()

    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.admin)

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
            dispatch(AdminAction.showNotification({ type: "loading" }))
            const value = JSON.stringify({
                email: email_input_value,
                password: password_input_value
            })

            try {
                const response = await fetch(`${request_url}/user/admin/register`, {
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
                // console.log("Ademola11")
                const data = await response.json();
                // console.log("Ademola1")
                localStorage.setItem("Token", data.token)
                localStorage.setItem("Refresh_Token", data.refresh_token)
                localStorage.setItem("Id", data.id)
                dispatch(AdminAction.showNotification({
                    type: "success",
                }))
                // console.log("Ademola")
                dispatch(authActions.loginStudent({
                    token: data.token,
                    refreshToken: data.refresh_token,
                    type: "Admin",
                    id: data.id
                }))
                router.push("/ogac/admin/admin")
            }
            catch (error) {
                setLoggin(false)
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
    }, [
        password_has_err,
        password_fix_error,
        email_has_error,
        email_fix_error
    ])



    useEffect(() => {
        if (!loading && error) {
            setTotalError(error)
        }
    }, [loading, error])


    return (
        <>
            <SnackBarComponent
                type={loggin ? "success" : "error"}
                message={Totalerror ? Totalerror : loggin ? "logging up" : ""}
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
                    flexFlow: 'column',
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
                        width: "60%",
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
                        width: "60%",
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
            </Paper>
        </>)

}

export default AdminSignUp