import { createSlice } from '@reduxjs/toolkit'
import { request_url } from '../util/base-url'


const exam_slice = createSlice({
    name: "exam",
    initialState: {
        exam_id: null,
        subject: null,
        numbers: 0,
        infoLoading: true,
        infoErr: null,
        time: null,
        class: [],
        exam_loading: false,
        exam_error: null,
        message: null
    },
    reducers: {
        getExamInfo(state, action) {
            state.exam_id = action.payload.id
            state.subject = action.payload.subject
            state.numbers = action.payload.length
            state.infoLoading = false
            state.infoErr = null
            state.time = action.payload.time
            state.class = action.payload.class
        },
        showNotification(state, action) {
            if (action.payload.type === "loading") {
                state.infoLoading = true
                state.infoErr = null
            } else if (action.payload.type === "error") {
                state.infoLoading = false
                state.infoErr = action.payload.error

            } else {
                state.loading = false
                state.error = null
            }
        },
        exam_Loading(state, action) {
            state.exam_loading = true
            state.exam_error = null
        },
        startExamination(state, action) {
            state.exam_loading = false
            state.exam_error = null
        },
        exam_error(state, action) {
            state.exam_loading = false
            state.exam_error = action.payload.error
        },
        showMessage(state, action) {
            state.exam_loading = false
            state.exam_error = null
            state.message = action.payload.message
        },
        setTime(state, action) {
            state.time = action.payload.time
        }
    }
})


const exam_action = exam_slice.actions
export const exam_reducer = exam_slice.reducer

export const examInfo = (data) => {
    return async (dispatch) => {
        dispatch(exam_action.exam_Loading())
        try {
            console.log(data)
            const response = await fetch(`${request_url}/exam/info/${data.exam_id}`, {
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
            dispatch(exam_action.getExamInfo({
                subject: values.subject,
                time: values.time,
                length: values.length,
                class: values.class,
                id: values.exam_id
            }))
        }
        catch (error) {
            console.log(error)
            dispatch(exam_action.exam_error({
                error: error.message
            }))
        }
    }
}
export const startExam = (data) => {
    return async (dispatch) => {
        dispatch(exam_action.exam_Loading())
        try {
            const response = await fetch(`${request_url}/exam/start/${data.exam_id}`, {
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
                } else if (err.message === "Failed to fetch") {
                    throw new Error("Please check you internet connection");
                }
                else {
                    throw new Error(err.message);
                }
            }
            const values = await response.json()
            console.log(values)
            localStorage.setItem("Token", values.token)
            localStorage.setItem("Refresh_Token", values.refresh_token)
            if (values.message) {
                dispatch(exam_action.showMessage({ message: values.message }))
            } else {
                dispatch(exam_action.startExamination())
            }

        }
        catch (error) {
            dispatch(exam_action.exam_error({ error: error.message }))
        }
    }
}

export const getTime = () => {
    return dispatch => {
        // const minutes = localStorage.getItem("Minutes")
        // const seconds = localStorage.getItem("Seconds")
        // if (!(!minutes || !seconds)) {
        //     dispatch(exam_action.setTime({ time: `${minutes}:${seconds}` }))
        // }
        console.log("getting time")
    }
}

export const setTime = (minutes, seconds) => {
    return (dispatch) => {
        localStorage.setItem("Minutes", minutes)
        localStorage.setItem("Seconds", seconds)
    }
}

export default exam_slice