import { createSlice } from "@reduxjs/toolkit";
import { request_url } from "../util/base-url";

const adminSlice = createSlice({
    name: "Admin",
    initialState: {
        loading: false,
        error: null,
        student_loading: false,
        student_err: null,
        new_student_loading: false,
        new_student_error: false,
        class_loading: true,
        class: [],
        class_error: null,
        all_student_loading: true,
        all_student_error: true,
        all_students: [],
        currentIndex: 0,
        allNumber: 0,
        all_teachers: [],
        all_teachers_error: null,
        all_teahers_loading: true,
        admin_subject_loading: true,
        admin_subjects: [],
        admin_subject_error: null,
        assign_loading: false,
        assign_error: null,
        roles_error: null,
        roles_loading: false,
        toggle_error: null,
        toggle_loading: false,
        delete_loading: false,
        delete_error: null,
        reset_error: null,
        reset_loading: false,
        create_loading: false,
        create_error: null
    },
    reducers: {
        showNotification(state, action) {
            if (action.payload.type === "loading") {
                state.loading = true
                state.error = null
            } else if (action.payload.type === "error") {
                state.loading = false
                state.error = action.payload.error
            } else {
                state.loading = false
                state.error = null
            }
        },
        showStudentNotification(state, action) {
            if (action.payload.type === "loading") {
                state.student_loading = true
                state.student_err = null
            } else if (action.payload.type === "error") {
                state.student_loading = false
                state.student_err = action.payload.error
            } else {
                state.student_loading = false
                state.student_err = null
            }
        },
        showClassStudentNotification(state, action) {
            console.log(action.payload)
            if (action.payload.type === "loading") {
                state.class_loading = true
                state.class_error = null
            } else if (action.payload.type === "error") {
                state.class_loading = false
                state.class_error = action.payload.error
            } else {
                state.class_loading = false
                state.class_error = null
                state.class = action.payload.class
            }
        },
        showNewStudentNotificationClass(state, action) {
            if (action.payload.type === "loading") {
                state.new_student_loading = true
                state.new_student_error = null
            } else if (action.payload.type === "error") {
                state.new_student_loading = false
                state.new_student_error = action.payload.error
            } else {
                state.new_student_loading = false
                state.new_student_error = null
            }
        },
        showAllStudentNotificateion(state, action) {
            if (action.payload.type === "loading") {
                state.all_student_loading = true
                state.all_student_error = null
            } else if (action.payload.type === "error") {
                state.all_student_loading = false
                state.all_student_error = action.payload.error
            } else {
                state.all_student_loading = false
                state.all_student_error = null
                state.all_students = action.payload.students
                state.currentIndex = action.payload.currentNumber
                state.allNumber = action.payload.allStudents
            }
        },
        showAllTeacherNotificateion(state, action) {
            if (action.payload.type === "loading") {
                state.all_teahers_loading = true
                state.all_teachers_error = null
            } else if (action.payload.type === "error") {
                state.all_teahers_loading = false
                state.all_teachers_error = action.payload.error
            } else {
                state.all_teahers_loading = false
                state.all_teachers_error = null
                state.all_teachers = action.payload.teachers

            }
        },
        adminSubjects(state, action) {
            if (action.payload.type === "loading") {
                state.admin_subject_loading = true
                state.admin_subject_error = null
            } else if (action.payload.type === "error") {
                state.admin_subject_loading = false
                state.admin_subject_error = action.payload.error
            } else {
                state.admin_subject_loading = false
                state.admin_subject_error = null
                state.admin_subjects = action.payload.subjects

            }
        },
        assignSubjects(state, action) {
            if (action.payload.type === "loading") {
                state.assign_loading = true
                state.assign_error = null
            } else if (action.payload.type === "error") {
                state.assign_loading = false
                state.assign_error = action.payload.error
            } else {
                state.assign_loading = false
                state.assign_error = null
            }
        },
        assignRoles(state, action) {
            if (action.payload.type === "loading") {
                state.roles_loading = true
                state.roles_error = null
            } else if (action.payload.type === "error") {
                state.roles_loading = false
                state.roles_error = action.payload.error
            } else {
                state.roles_loading = false
                state.roles_error = null
            }
        },
        toggler(state, action) {
            if (action.payload.type === "loading") {
                state.toggle_loading = true
                state.toggle_error = null
            } else if (action.payload.type === "error") {
                state.toggle_loading = false
                state.toggle_error = action.payload.error
            } else {
                state.toggle_loading = false
                state.toggle_error = null
            }
        },
        deleter(state, action) {
            if (action.payload.type === "loading") {
                state.delete_loading = true
                state.delete_error = null
            } else if (action.payload.type === "error") {
                state.delete_loading = false
                state.delete_error = action.payload.error
            } else {
                state.delete_loading = false
                state.delete_error = null
            }
        },
        passwordReset(state, action) {
            if (action.payload.type === "loading") {
                state.reset_loading = true
                state.reset_error = null
            } else if (action.payload.type === "error") {
                state.reset_loading = false
                state.reset_error = action.payload.error
            } else {
                state.reset_loading = false
                state.reset_error = false
            }
        },
        createNotification(state, action) {
            if (action.payload.type === "loading") {
                state.create_loading = true
                state.create_error = null
            } else if (action.payload.type === "error") {
                state.create_loading = false
                state.create_error = action.payload.error
            } else {
                state.create_loading = false
                state.create_error = null
            }
        }
    }
})

export const AdminReducer = adminSlice.reducer
export const AdminAction = adminSlice.actions

export const studentClass = ({ token, refreshToken, id }) => {
    return async (dispatch) => {
        dispatch(AdminAction.showClassStudentNotification({ type: "loading" }))
        try {
            const response = await fetch(`${request_url}/exam/class/all`, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
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
            localStorage.setItem("Id", id)
            dispatch(AdminAction.showClassStudentNotification({ type: "success", class: values.class }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.showClassStudentNotification({
                error: error.message,
                type:"error"
            }))
        }
    }
}
export const getAllStudent = ({ token, refreshToken, id, page, name, class: queryClas }) => {
    return async (dispatch) => {
        dispatch(AdminAction.showAllStudentNotificateion({ type: "loading" }))
        try {
            let url;
            if (!name && !queryClas) {
                console.log("Ademola")
                url = `${request_url}/exam/std/all?page=${!page ? 1 : page}`
            } else if (!queryClas && name) {
                console.log("Ademola11")
                url = `${request_url}/exam/std/all?page=${!page ? 1 : page}&name=${name}`
            } else if (!name && queryClas) {
                console.log("Ademola1133")
                url = `${request_url}/exam/std/all?page=${!page ? 1 : page}&class=${queryClas}`
            }
            else if (name && queryClas) {
                url = `${request_url}/exam/std/all?page=${!page ? 1 : page}&name=${name}&class=${queryClas}`
            }
            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
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
            localStorage.setItem("Id", id)
            console.log(values)
            const students = values.students.map(el => ({
                id: el._id,
                firstname: el.firstname,
                lastname: el.lastname,
                class: el.class.name,
                regNo: el.regNo,
                gender: el.gender,
                class_id: el.class._id,
            }))
            const currentNumber = values.currentNumber
            const allStudents = values.allStudents
            dispatch(AdminAction.showAllStudentNotificateion({ type: "success", students, currentNumber, allStudents }))
        }
        catch (error) {
            dispatch(AdminAction.showAllStudentNotificateion({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const getUnverifiedTeeacher = ({ token, refreshToken, id, query }) => {
    return async (dispatch) => {
        dispatch(AdminAction.showAllTeacherNotificateion({ type: "loading" }))
        try {
            let url;
            if (query == "unVerified") {
                url = `${request_url}/user/teachers/all?not_verified=${true}`
            } else {
                url = `${request_url}/user/teachers/all`
            }

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.showAllTeacherNotificateion({ type: "success", teachers: values.teachers }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.showAllTeacherNotificateion({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const getAllSubjects = ({ token, refreshToken, id }) => {
    return async (dispatch) => {
        dispatch(AdminAction.adminSubjects({ type: "loading" }))
        try {
            let url;
            url = `${request_url}/exam/sub/all`

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.adminSubjects({ type: "success", subjects: values.subjects }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.adminSubjects({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const AssignSubjects = ({ token, refreshToken, id, data, teacher_id }) => {
    return async (dispatch) => {
        dispatch(AdminAction.assignSubjects({ type: "loading" }))
        try {
            let url;
            url = `${request_url}/user/teacher/update/${teacher_id}`

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                method: "Put",
                body: JSON.stringify(data)
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.assignSubjects({ type: "success" }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.assignSubjects({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const AssignRole = ({ token, refreshToken, id, data, teacher_id }) => {
    return async (dispatch) => {
        dispatch(AdminAction.assignRoles({ type: "loading" }))
        try {
            let url;
            url = `${request_url}/user/teacher/${teacher_id}`

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                method: "Put",
                body: JSON.stringify(data)
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.assignRoles({ type: "success" }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.assignRoles({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const Switcher = ({ token, refreshToken, id, teacher_id }) => {
    return async (dispatch) => {
        dispatch(AdminAction.toggler({ type: "loading" }))
        try {
            let url;
            url = `${request_url}/user/toggle/${teacher_id}`

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                method: "GET"
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.toggler({ type: "success" }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.toggler({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const deleteTeacher = ({ token, refreshToken, id, teacher_id }) => {
    return async (dispatch) => {
        dispatch(AdminAction.deleter({ type: "loading" }))
        try {
            let url;
            url = `${request_url}/user/teacher/remove/${teacher_id}`

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                method: "DELETE"
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.deleter({ type: "success" }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.deleter({
                error: error.message,
                type:"error"
            }))
        }
    }
}

export const ResetPassword = ({ token, refreshToken, id, teacher_id, password }) => {
    return async (dispatch) => {
        dispatch(AdminAction.deleter({ type: "loading" }))
        try {
            let url;
            url = `${request_url}/user/teacher/reset/${teacher_id}`

            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ password })
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.deleter({ type: "success" }))
        }
        catch (error) {
            console.log(error)
            dispatch(AdminAction.deleter({
                type:"error",
                error: error.message
            }))
        }
    }
}

export const createAction = ({ token, refreshToken, id, type, val }) => {
    return async (dispatch) => {
        dispatch(AdminAction.createNotification({ type: "loading" }))
        try {
            let url;
            let result;
            if (type == "Subject") {
                url = `${request_url}/exam/new/subject`
                result = { name: val }

            } else {
                url = `${request_url}/exam/new/class`
                result = { name: val }
            }


            const response = await fetch(url, {
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({name:val})
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
            localStorage.setItem("Id", id)
            console.log(values)

            dispatch(AdminAction.createNotification({ type: "success" }))
        }
        catch (error) {
            dispatch(AdminAction.createNotification({
                error: error.message,
                type:"error"
            }))
        }
    }
}



export default adminSlice