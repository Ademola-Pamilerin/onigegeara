import useInput from '../../hooks/useInput'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Stack, Button, CircularProgress, Select, InputLabel, MenuItem } from "@mui/material"
import { colors } from '../../util/them';
import { update_Teacher } from '../../store/teacher-slice';


const InputField = (props) => {
    const [Totalerror, setTotalError] = useState("")
    const dispatch = useDispatch()
    const teacher_details = useSelector(state => state.teacher)
    const auth_details = useSelector(state => state.auth)

    const { name, gender, email } = teacher_details

    const firstname = name ? name.split(" ")[0] : ""
    const lastname = name ? name.split(" ")[1] : ""
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

    } = useInput("text", "First Name", firstname)
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

    } = useInput("text", "Last Name", lastname)
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

    } = useInput("text", "Email", email)
    const {
        onChange: gender_changed,
        onTouchend: gender_blur,
        onTouchStart: gender_focused_handler,
        value: gender_input_value,
        hasError: gender_has_err,
        fixError: gender_fix_error,
        focus: gender_focused,
        touched: gender_touched,
        errorMessage: gender_error_message

    } = useInput("text", "Gender", gender)

    const { token, refreshToken, id } = auth_details


    const Submit = () => {
        const data = {
            firstname: first_name_input_value,
            lastname: last_name_input_value,
            email: email_input_value,
            gender: gender_input_value
        }

        dispatch(update_Teacher({
            token, refreshToken, id, data
        }))
        props.closeed()

    }


    useEffect(() => {
        if (first_name_has_error) {
            setTotalError(first_name_fix_error)
        } else if (last_name_has_error) {
            setTotalError(last_name_fix_error)
        }
        else if (email_has_error) {
            setTotalError(email_fix_error)
        } else if (gender_has_err) {
            setTotalError(gender_fix_error)
        }
        return () => {
            setTotalError("")
        }
    }, [
        first_name_has_error,
        first_name_fix_error,
        last_name_has_error,
        gender_has_err,
        gender_fix_error,
        last_name_fix_error,
        email_has_error,
        email_fix_error
    ])

    return (<>
        <Stack sx={{
            width: "100%",
            display: "flex",
            flexFlow: 'column',
            justifyContent: "center",
            alignItems: "center"
        }}>
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
                color: colors.side_blue,
                opacity: 0.6
            }}>YOUR INFO</Typography>
            <Box sx={{
                display: "flex",
                flexFlow: "row",
                height: {
                    xs: "3rem",
                    sm: "4rem",
                    md: "4rem",
                    lg: "4rem"
                },
                width: "90%",
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
                width: "90%",
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
                width: "90%",
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
                    disabled
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
                width: "90%",
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
                border: gender_has_err ? "1px solid red" : "none",
                margin: "1rem 0px",
            }}>
                <select className={"input"} onFocus={gender_focused_handler} onBlur={gender_blur} value={gender_input_value} onChange={gender_changed}>
                    <option value selected sx={{ fontSize: ".8rem", fontWeight: "500" }}>select a value</option>
                    <option value={"male"}>Male</option>
                    <option value="female">Female</option>
                </select>
            </Box>
        </Stack>
        <Button
            disabled={!(first_name_touched || last_name_touched || email_touched || gender_touched)}
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
            {teacher_details.update_Loading ? <CircularProgress variant="indeterminate" /> : "Update"}
        </Button>
    </>)
}
export default InputField