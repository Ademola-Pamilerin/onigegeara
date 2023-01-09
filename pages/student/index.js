import { Button, Paper, Stack, TextField, Typography, Box, CircularProgress } from "@mui/material"
import MainNav from "../../components/navigation/main-nav"
import SnackBarComponent from "../../components/UI/error"
import useHttp from "../../hooks/useHttp"
import useInput from "../../hooks/useInput"
import { colors } from "../../util/them"
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkStatus, sendStudentLoginRequest, authActions } from '../../store/auth-slice'
import { useRouter } from "next/router"
import { request_url } from "../../util/base-url"
import HeadComponent from "../../components/header/head"

const StudentLogin = () => {

    let {
        onChange: changed,
        onTouchStart: focused,
        onTouchend: blur,
        value: inputValue,
        errorMessage: error,
        fixError: errorFixMess,
        hasError,
        focus,
        touched
    } = useInput("text", "RegNo")

    const dispatch = useDispatch()
    const { loading, error: httpErr, navigate, isAuthenticated: isAuth } = useSelector(state => state.auth)
    const [Totalerror, setTotalError] = useState("")
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [load, setLoad] = useState(false)


    const handleClose = (event, reason) => {
        setOpen(false)
    }
    const submitHandler = async (event) => {
        dispatch(authActions.showNotification({ type: "loading" }))
        if (!inputValue) {
            setOpen(true)
            dispatch(authActions.showNotification({ type: "error", error: "Please Provide a value in RegNo field" }))
            setTotalError("Please Provide a value in RegNo field")
            return
        }
        else {
            try {
                const response = await fetch(`${request_url}/user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ regNo: inputValue })
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
                dispatch(authActions.showNotification({
                    type: "success"
                }))
                dispatch(authActions.loginStudent({
                    token: data.token,
                    refreshToken: data.refresh_token,
                    id: data.id,
                    type: "Student"
                }))
                setLoad(true)
                router.replace("/student/profile")
            }
            catch (error) {
                dispatch(authActions.showNotification({
                    type: "error",
                    error: error.message
                }))
            }
        }

    }


    useEffect(() => {
        if (!inputValue) {
            if (touched) {
                if (focus) {
                    setTotalError(null)
                    setOpen(false)
                }
                else {
                    if (errorFixMess) {
                        setTotalError(errorFixMess)
                        setOpen(true)
                    } else {
                        setTotalError(null)
                        setOpen(false)
                    }
                }
            }
        } else {
            if (focus) {
                if (focus) {
                    setTotalError(null)
                    setOpen(false)
                }
            } else {
                if (errorFixMess) {
                    setTotalError(errorFixMess)
                    setOpen(true)
                } else if (httpErr) {
                    setTotalError(httpErr)
                    setOpen(true)
                }
                else {
                    setTotalError(null)
                    setOpen(false)
                }
            }
        }
    }, [inputValue, touched, focus, errorFixMess, httpErr])


    return (
        <Stack sx={{
            height: "100vh",
        }} className={"height"}>
            <Stack sx={{
                height: {
                    xs: "10%",
                    sm: "5%",
                    md: "5%"
                }
            }}>
                <HeadComponent title={'ONAG Student Portal'} content={'This is the ONAG officail Student Portal Page'} />
                <MainNav />
            </Stack>
            <Stack sx={{
                width: "100%",
                height: {
                    xs: "calc(100vh - 10%)",
                    sm: "100%",
                    md: "calc(100vh - 5%)"
                },
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url(../../static/ogac-7.png)",
                backgroundSize: "cover",
                backgroundPosition: "top left"
            }}>
                <SnackBarComponent
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    close={handleClose}
                    open={open && (Totalerror !== null || "")}
                    type={"error"}
                    duration={6000}
                    message={Totalerror}
                />
                <SnackBarComponent
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    close={() => setLoad(false)}
                    open={load}
                    type={"success"}
                    duration={100000}
                    message={"Logging in"}
                />
                <Paper sx={{
                    backgroundColor: {
                        xs: "black",
                        lg: "rgba(230, 196, 166, 0.5)"
                    },
                    height: {
                        xs: "50%",
                        sm: "40%",
                        md: "25rem",
                        lg: "30rem"
                    },
                    width: {
                        xs: "80%",
                        sm: "70%",
                        md: "50%",
                        lg: "30%"
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
                            sm: '3rem',
                            lg: "2.5rem"
                        },
                        fontWeight: {
                            xs: 600,
                            sm: 600,
                            md: 700,
                            lg: 800
                        },
                        color: {
                            xs: "wheat",
                            lg: "rgba(0, 0, 0, 1)"
                        }
                    }}>STUDENT</Typography>
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
                        backgroundColor: colors.backgroun_color,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: {
                            xs: "10px",
                            sm: "15px",
                            md: "20px"
                        },
                        border: Totalerror ? "1px solid red" : "none"

                    }}>
                        <input
                            type="text"
                            onChange={changed}
                            onFocus={focused}
                            onBlur={blur}
                            value={inputValue}
                            className={"input"}
                        />
                    </Box>
                    <Button
                        onClick={(event) => submitHandler(event)}
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
                        disabled={loading}
                    >
                        {loading ? <CircularProgress variant={"indeterminate"} /> : "Log in"}

                    </Button>
                    {/* <button onClick={(event) => submitHandler(event)}>Log in</button> */}

                </Paper>

            </Stack>
        </Stack>
    )
}



export default StudentLogin