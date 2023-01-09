import { createSlice } from '@reduxjs/toolkit'
import { request_url } from '../util/base-url'

const studentSlice = createSlice({
    name: "Stduent",
    initialState: {
        name: null,
        class: null,
        id: null,
        loading: true,
        error: null,
        admNo: null,
        exams: [],
        examErr: null,
        examLoading: false
    },
    reducers: {
        fetchStudent(state, action) {
            const { firstname, lastname, id, class: stdClass } = action.payload.data.user
            state.name = `${action.payload.data.user.lastname} ${action.payload.data.user.firstname}`
            state.class = action.payload.data.user.class.name
            state.id = action.payload.data.user._id
            state.admNo = action.payload.data.user.regNo
            state.loading = false
            state.error = null
        },
        showNotification(state, action) {
            if (action.payload.type === "loading") {
                state.loading = true
                state.name = null
                state.class = null
                state.id = null
            } else if (action.payload.type === "error") {
                state.error = action.payload.error
                state.name = null
                state.class = null
                state.id = null
                state.loading = false
            } else {
                state.loading = false
                state.error = null
            }
        },
        fetchExams(state, action) {
            state.examErr = action.payload.error
            state.examLoading = false
            state.exams = action.payload.exams

        },
        showExamNotification(state, action) {
            if (action.payload.type === "loading") {
                state.examLoading = true
                state.examErr = null
            } else if (action.payload.type === "error") {
                state.examErr = action.payload.error
                state.examLoading = false
            } else {
                state.examErr = null
                state.examLoading = false
            }
        },
    },
})

const studentAction = studentSlice.actions


export const getStudentData = (data) => {
    return async (dispatch) => {
        dispatch(studentAction.showNotification({
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
            dispatch(studentAction.showNotification({
                type: "success"
            }))
            dispatch(studentAction.fetchStudent({
                data: values
            }))

        }
        catch (error) {
            dispatch(studentAction.showNotification({
                type: "error",
                error: error.message
            }))
        }
    }

}

export const getStudentExams = (data) => {
    return async (dispatch) => {
        dispatch(studentAction.showExamNotification({
            type: "loading"
        }))
        try {
            const response = await fetch(`${request_url}/exam/student/question`, {
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
            dispatch(studentAction.fetchExams(values))
        }
        catch (error) {
            dispatch(studentAction.showExamNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}




export const studentReducers = studentSlice.reducer

export default studentSlice