import { createSlice } from '@reduxjs/toolkit'
import useHttp from '../hooks/useHttp'
import { request_url } from '../util/base-url'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        token: null,
        refreshToken: null,
        id: null,
        error: null,
        loading: false,
        navigate: false,
        redirect: false,
        exam_active: false,
        check_loading: true,
        time: null,
        time_loading: true,
        time_error: null,
        active_exam_error: null,
        active_exam_loading: true,
        active_exam: null,
        exam_active: false,
        type: ""
    },
    reducers: {
        loginStudent(state, action) {
            const { id, token, refreshToken, type } = action.payload
            state.id = id
            state.token = token
            state.refreshToken = refreshToken
            state.isAuthenticated = true
            state.navigate = true
            state.redirect = false
            state.loading = false
            state.type = type

        },
        showNotification(state, action) {
            if (action.payload.type === "loading") {
                state.loading = true
                state.error = null
                state.navigate = false
                state.redirect = false
            } else if (action.payload.type === "error") {
                state.loading = false
                state.navigate = false
                state.error = action.payload.error
                state.redirect = false
            } else {
                state.loading = false
                state.error = null
                state.redirect = false
                state.navigate = true
            }
        },
        logoutStudent(state, payload) {
            state.id = null
            state.token = null
            state.refreshToken = null
            state.navigate = false
            state.isAuthenticated = false
            state.redirect = true
            state.loading = false
        },
        authenticated(state, action) {
            if (action.payload.type === "NO") {
                state.isAuthenticated = false
                state.redirect = true
                state.token = null
                state.id = null
                state.refreshToken = null
                state.loading = false
                state.check_loading = false
            }
            else {
                state.isAuthenticated = true
                state.redirect = false
                state.token = action.payload.token
                state.id = action.payload.id
                state.refreshToken = action.payload.refreshToken
                state.loading = false
                state.check_loading = false
            }
        },
        showTimeNotification(state, action) {
            if (action.payload.type === "loading") {
                state.time_loading = true
                state.time_error = null
            } else if (action.payload.type === "error") {
                state.time_loading = false
                state.time_error = action.payload.error
            } else {
                state.time_loading = false
                state.time_error = null
                state.time = action.payload.time
            }
        },
        setActiveExam(state, action) {
            console.log(action.payload)
            state.active_exam = action.payload.active_exam
            state.exam_active = action.payload.exam_active
        },
        showActiveNotification(state, action) {
            if (action.payload.type === "loading") {
                state.active_exam_loading = true
                state.active_exam_error = null
            } else if (action.payload.type === "error") {
                state.active_exam_loading = false
                state.active_exam_error = action.payload.error
            } else {
                state.active_exam_loading = false
                state.active_exam_error = null
            }
        },
    }
})

export const authActions = authSlice.actions

export const sendStudentLoginRequest = (regNo) => {
    return async (dispatch) => {
        console.log("loading")
        dispatch(authActions.showNotification({
            type: "loading"
        }))
        try {
            const response = await fetch(`${request_url}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ regNo })
            })
            const isOnline = window.navigator.onLine;
            console.log(isOnline)
            if (!response.ok) {
                const err = await response.json();
                // if (!isOnline) {
                //     throw new Error(`Like your are behind proxy, 
                //     please connect to internet to continue`);
                // }
                console.log(err.message)
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
            console.log(data)
            dispatch(authActions.loginStudent({
                token: data.token,
                refreshToken: data.refresh_token,
                id: data.id,
            }))

        }
        catch (error) {
            dispatch(authActions.showNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}
export const checkStatus = () => {
    return (dispatch) => {
        const accessToken = localStorage.getItem("Token")
        const id = localStorage.getItem("Id")
        const refreshToken = localStorage.getItem("Refresh_Token")
        if (!accessToken || accessToken == "undefined" || accessToken == undefined || !refreshToken || refreshToken == "undefined" || refreshToken == undefined || !id || id == "undefined" || id == undefined) {
            dispatch(authActions.authenticated({
                type: "NO"
            }))
        } else {
            dispatch(authActions.authenticated({
                type: "YES",
                token: accessToken,
                id: id,
                refreshToken
            }))
        }
    }
}

export const logoutStudent = () => {
    return (dispatch) => {
        dispatch(authActions.showNotification({
            type: "loading"
        }))
        localStorage.clear()
        dispatch(authActions.logoutStudent())
    }
}

export const checkTime = (data) => {
    return async (dispatch) => {
        dispatch(authActions.showTimeNotification({ type: "loading" }))
        try {
            console.log(data)
            const response = await fetch(`${request_url}/user/time`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id,
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                const err = await response.json();
                if (!err) {
                    throw new Error("Request failed!");
                } else if (err.message == "Failed to fetch") {
                    throw new Error("Please check you internet connection");
                }
                else {
                    throw new Error(err.message);
                }
            }
            const values = await response.json();
            localStorage.setItem("Token", values.token)
            localStorage.setItem("Refresh_Token", values.refresh_token)

            let min1 = +localStorage.getItem("Minutes")
            let sec1 = +localStorage.getItem("Seconds")

            let min2 = +values.time.split(":")[0]
            let sec2 = +values.time.split(":")[1]

            console.log(min2, isNaN(min1))

            let real_time;
            if (isNaN(min1)) {
                real_time = `${min2}:${sec2}`
                console.log('not a number')
                console.log(real_time)
                dispatch(authActions.showTimeNotification({
                    type: "success",
                    time: real_time
                }))
                return;
            }
            else if ((!min1 || (min1 == undefined)) && min2) {
                real_time = `${min2}:${sec2}`
                console.log('me2')
                console.log(real_time)
                dispatch(authActions.showTimeNotification({
                    type: "success",
                    time: real_time
                }))
                return;
            }
            else if (min1 == -1 || min1 < 0) {
                real_time = `${min2}:${sec2}`
                console.log(real_time)
                console.log(real_time)
                dispatch(authActions.showTimeNotification({
                    type: "success",
                    time: real_time
                }))
                return;
            }
            else {
                if ((min1 < min2)) {
                    real_time = `${min1}:${sec1}`
                    console.log('3')
                    console.log(real_time)
                    dispatch(authActions.showTimeNotification({
                        type: "success",
                        time: real_time
                    }))
                    return;
                } else if (min1 > min2) {
                    real_time = `${min2}:${sec2}`
                    console.log('m4')
                    console.log(real_time)
                    dispatch(authActions.showTimeNotification({
                        type: "success",
                        time: real_time
                    }))
                    return;
                } else if (min1 == min2) {
                    if (sec1 < sec2) {
                        console.log('me5')
                        real_time = `${min1}:${sec1}`
                        console.log(real_time)
                        dispatch(authActions.showTimeNotification({
                            type: "success",
                            time: real_time
                        }))
                        return;
                    } else {
                        console.log('me6')
                        real_time = `${min2}:${sec2}`
                        console.log(real_time)
                        dispatch(authActions.showTimeNotification({
                            type: "success",
                            time: real_time
                        }))
                        return;
                    }
                }
            }


        }
        catch (error) {
            console.log(error)
            dispatch(authActions.showNotification({ type: "error", error: error.message }))
        }


    }
}

export const setActiveExam = (data) => {

    console.log(data)
    return async (dispatch) => {
        dispatch(authActions.showActiveNotification({
            type: "loading"
        }))
        try {
            const response = await fetch(`${request_url}/user/student/${data.id}`,
                {
                    headers: {
                        "Authorization": data.token,
                        "RefreshToken": data.refreshToken,
                        "Id": data.id,
                        "Content-Type": "application/json"
                    }
                }
            )
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
            const values = await response.json()
            localStorage.setItem("Token", values.token)
            localStorage.setItem("Refresh_Token", values.refresh_token)
            localStorage.setItem("Id", values.user._id)
            dispatch(authActions.showActiveNotification({
                type: 'success'
            }))

            dispatch(authActions.setActiveExam({
                exam_active: values.user.exam_active,
                active_subject: values.user.exam_active ? values.user.active_subject : null,
                active_exam: values.user.exam_active ? values.user.active_exam : null,
            }))
        }
        catch (error) {
            dispatch(authActions.showActiveNotification({
                type: "error",
                error: error.message
            }))
        }

    }
}


export const authReducer = authSlice.reducer
export default authSlice