import { DataArray } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { request_url } from "../util/base-url";

const TeacherSlice = createSlice({
    name: "teacher",
    initialState: {
        name: null,
        gender: null,
        loading: true,
        error: null,
        email: null,
        update_error: null,
        update_loading: false,
        update_message: null,
        delete_loading: false,
        delete_error: null,
        subject_error: null,
        subject_loading: null,
        subject: {},
        classes: [],
        submit_loading: false,
        submit_error: null,
        submit_message: null,
        my_exam_loading: true,
        my_exam: [],
        my_exam_error: null,
        exam_class: [],
        exam_loading: true,
        exam_error: null,
        exam: null,
        question_loading: false,
        question_error: null,
        question_message: null,
        question_length: 0,
        student_loading: true,
        student_error: null,
        students: [],
        assign_loading: false,
        assign_error: null,
        student_exam_loading: true,
        student_exam_error: null,
        students_exam: [],

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
        teacherDetail(state, action) {
            const { firstname, email, lastname, gender } = action.payload
            state.name = `${firstname} ${lastname}`
            state.gender = gender
            state.error = null
            state.loading = false
            state.email = email
        },
        showUpdateNotification(state, action) {
            if (action.payload.type === "loading") {
                state.update_error = null
                state.update_loading = true
                state.update_message = "Updating Your Account"
            } else if (action.payload.type === "error") {
                state.update_error = action.payload.error
                state.update_loading = false
                state.update_message = null
            } else {
                state.update_error = null
                state.update_loading = false
                state.update_message = "Updated Your Account"

            }
        },
        showDeleteNotification(state, action) {
            if (action.payload.type === "loading") {
                state.delete_loading = true
                state.delete_error = null
            } else if (action.payload.type === "error") {
                state.delete_loading = false
                state.delete_error = action.payload.error
            } else {
                state.delete_loading = false
                state.delete_error = false


            }
        },
        showSubjectNotification(state, action) {
            if (action.payload.type === "loading") {
                state.subject_loading = true
                state.subject_error = null
            } else if (action.payload.type === "error") {
                state.subject_loading = false
                state.subject_error = action.payload.error
            } else {
                state.subject_loading = false
                state.subject_error = false


            }
        },
        showSubmitNotification(state, action) {
            if (action.payload.type === "loading") {
                state.submit_loading = true
                state.submit_error = null
                state.submit_message = null
            } else if (action.payload.type === "error") {
                state.submit_loading = false
                state.subject_error = action.payload.error
                state.submit_message = null
            } else {
                state.submit_loading = false
                state.submit_error = false
                state.submit_message = "Examination Created Successfully"


            }
        },
        setSubjectandClass(state, action) {
            state.subject_error = null
            state.subject_loading = false
            state.classes = action.payload.classes
            state.subject = action.payload.subject
        },
        showMyExamNotification(state, action) {
            if (action.payload.type === "loading") {
                state.my_exam_error = null
                state.my_exam_loading = true
                state.my_exam = []
            } else if (action.payload.type === "error") {
                state.my_exam_error = action.error
                state.my_exam_loading = false
                state.my_exam = []
            } else {
                state.my_exam_error = null
                state.my_exam_loading = false
                state.my_exam = action.payload.exams
            }
        },
        showExamNotification(state, action) {
            if (action.payload.type === "loading") {
                state.exam_class = [];
                state.exam_loading = true;
                state.exam_error = null;
            } else if (action.payload.type === "error") {
                state.exam_class = [];
                state.exam_loading = false;
                state.exam_error = action.payloaderror;
            } else {
                state.exam_class = action.payload.classes;
                state.exam_loading = false;
                state.exam_error = null;
                state.exam = action.payload.exam
            }
        },
        showQuestionNotification(state, action) {
            if (action.payload.type === "loading") {
                state.question_message = null;
                state.question_loading = true;
                state.question_error = null;
            } else if (action.payload.type === "error") {
                state.question_message = null;
                state.question_loading = false;
                state.question_error = action.payload.error;
            } else {
                state.question_message = action.payload.message;
                state.question_loading = false;
                state.question_error = null;
                state.question_length = action.payload.length
            }
        },
        showExamStudentNotification(state, action) {
            if (action.payload.type === "loading") {
                state.student_loading = true
                state.student_error = null
                state.students = []
            } else if (action.payload.type === "error") {
                state.student_loading = false
                state.student_error = error.status
                state.students = []
            } else {
                state.student_loading = false;
                state.student_error = null
                state.students = action.payload.students
            }
        },
        showStudent(state, action) {
            if (action.payload.type === "loading") {
                state.student_exam_loading = true
                state.student_exam_error = null
                state.students_exam = []
            } else if (action.payload.type === "error") {
                state.student_exam_loading = false
                state.student_exam_error = action.payload.error
                state.students_exam = []
            } else {
                state.student_exam_loading = false;
                state.student_exam_error = null
                state.students_exam = action.payload.students
            }
        },
        showAssignStudent(state, action) {
            if (action.payload.type === "loading") {
                state.assign_loading = true
                state.assign_error = null
                state.students = []
            } else if (action.payload.type === "error") {
                state.assign_loading = false
                state.assign_error = action.payload.error
            } else {
                state.assign_loading = false
                state.assign_error = null

            }
        },

    }
})

export const TeacherReducer = TeacherSlice.reducer

export const TeacherAction = TeacherSlice.actions

export const Teacher_Details = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showNotification({ type: "loading" }))
        try {
            const url = `${request_url}/user/teacher/${data.id}`;

            const response = await fetch(url,
                {
                    headers: {
                        "Authorization": data.token,
                        "RefreshToken": data.refreshToken,
                        "Id": data.id,
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log("Ademola121")
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
            // console.log(values)
            localStorage.setItem("Token", values.token)
            localStorage.setItem("Refresh_Token", values.refresh_token)
            localStorage.setItem("Id", values.teacher._id)
            console.log("getting here")
            dispatch(TeacherAction.showNotification({
                type: "success"
            }))
            dispatch(TeacherAction.teacherDetail(values.teacher))

        }
        catch (error) {
            dispatch(TeacherAction.showNotification({
                type: "error",
                error: error.message
            }))
        }

    }
}
export const update_Teacher = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showUpdateNotification({ type: "loading" }))
        try {
            const { token, refreshToken, id, data: info } = data
            const jsonData = JSON.stringify(info)
            const url = `${request_url}/user/me/update/teacher`;
            const response = await fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
                    body: jsonData
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
            localStorage.setItem("Id", id)
            dispatch(TeacherAction.showUpdateNotification({
                type: "success"
            }))
            dispatch(TeacherAction.teacherDetail({
                email: values.email,
                gender: values.gender,
                firstname: values.firstname,
                lastname: values.lastname
            }))
        }
        catch (error) {
            dispatch(TeacherAction.showUpdateNotification({
                type: "error",
                error: error.message
            }))
        }

    }
}
export const delete_Account = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showDeleteNotification({ type: "loading" }))
        try {
            const { token, refreshToken, id, } = data
            const url = `${request_url}/user/teacher/remove/${data.id}`;
            const response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
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
            localStorage.clear()
            dispatch(TeacherAction.showDeleteNotification({
                type: "success"
            }))

        }
        catch (error) {
            dispatch(TeacherAction.showDeleteNotification({
                type: "error",
                error: error.message
            }))
        }

    }
}
export const fetchTeacherSubject = (data) => {

    return async (dispatch) => {
        dispatch(TeacherAction.showSubjectNotification({ type: "loading" }))
        try {
            console.log(data)
            const { token, refreshToken, id, } = data
            const url = `${request_url}/user/subject/teacher`
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
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
            localStorage.setItem("Id", id)
            const { result: result_val } = values
            let subject = []
            let classArr = []
            console.log(result_val)
            for (let key of result_val) {
                console.log(key)
                const isThere = subject.findIndex(el => el.id === key.subject._id)
                const class_there = classArr.findIndex(el => el.id === key.class._id)
                if (isThere < 0) {
                    subject.push({ id: key.subject._id, name: key.subject.name })
                }
                if (class_there) {
                    classArr.push({ id: key.class._id, name: key.class.name })
                }
            }
            dispatch(TeacherAction.setSubjectandClass({
                subject,
                classes: classArr
            }))
        }
        catch (error) {
            dispatch(TeacherAction.showSubjectNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}
export const createExamStore = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showSubmitNotification({ type: "loading" }))
        try {
            const { token, refreshToken, id, data: info } = data
            const jsonData = JSON.stringify(info)
            const url = `${request_url}/exam/exam-new/exam`;
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
                    body: jsonData
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
            localStorage.setItem("Id", id)
            dispatch(TeacherAction.showSubmitNotification({
                type: "success"
            }))
        }
        catch (error) {
            dispatch(TeacherAction.showSubmitNotification({
                type: "error",
                error: error.message
            }))
        }

    }
}

export const getTeacherExams = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showMyExamNotification({ type: "loading" }))
        try {
            const { id, refreshToken, token } = data
            const url = `${request_url}/exam/mine/exams`;
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
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
            localStorage.setItem("Id", id)
            const { result } = values
            const responseVal = result.map(el => {
                return {
                    exam_id: el.exam_id,
                    subject: el.subject,
                    class: el.class.map(val => val.name),
                    time: el.time,
                    length: el.length
                }
            })
            dispatch(TeacherAction.showMyExamNotification({ type: "success", exams: responseVal }))
        }
        catch (error) {
            dispatch(TeacherAction.showMyExamNotification({ type: "error", error: error.message }))
        }
    }
}

export const GetSingleExam = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showExamNotification({ type: "loading" }))
        try {
            const { token, refreshToken, id, } = data
            const url = `${request_url}/exam/teacher/${data.exam_id}`
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
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
            localStorage.setItem("Id", id)
            const { class: classes, exam: exam_val, length } = values
            console.log(classes, exam_val)
            // const updatedExam = exam.map(el => {
            //     return {
            //         time: el.time,
            //         length: el.questions.length,
            //         subject: el.subject.name
            //     }
            // })
            const time_val = exam_val.time
            const length_val = exam_val.questions.length
            const subject_name = exam_val.subject.name
            const updatedClass = classes.map(el => el.name)

            dispatch(TeacherAction.showExamNotification({
                type: "success",
                classes: updatedClass,
                exam: {
                    time: time_val, length: length ? length > length_val ? length : length_val : length_val, subject: subject_name
                }
            }))


        }
        catch (error) {
            console.log(error.message)
            dispatch(TeacherAction.showExamNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}

export const setQuestion = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showQuestionNotification({ type: "loading" }))
        try {
            const { token, refreshToken, id, options, image, question, answer, exam_id } = data
            const formData = new FormData();
            formData.append("question", question);
            formData.append("image", image);
            formData.append("options", options);
            formData.append("answer", answer);
            formData.append("exam_id", exam_id);

            const url = `${request_url}/exam/tset/question`;
            const response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,

                    },
                    body: formData
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
            localStorage.setItem("Id", id)
            dispatch(TeacherAction.showQuestionNotification({
                type: "success",
                message: "Question Added successfully",
                length: values.length
            }))
        }
        catch (error) {
            dispatch(TeacherAction.showQuestionNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}

export const student_question = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showExamStudentNotification({ type: "loading" }))
        try {
            const { token, refreshToken, id, exam_id } = data
            const formData = new FormData();
            formData.append("question", question);
            formData.append("image", image);
            formData.append("options", options);
            formData.append("answer", answer);
            formData.append("exam_id", exam_id);

            const url = `${request_url}/exam/user/exam"`;
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                    },
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
            localStorage.setItem("Id", id)
            console.log(values)
            // dispatch(TeacherAction.showExamStudentNotification({
            //     type: "success",
            //     student: ""
            // }))
        }
        catch (error) {
            dispatch(TeacherAction.showExamStudentNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}

export const allStudentExam = (data) => {
    return async (dispatch) => {
        dispatch(TeacherAction.showStudent({ type: "loading" }))
        try {
            const { token, refreshToken, id, student_id } = data
            const url = `${request_url}/exam/user/exam/${student_id}`
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                        "RefreshToken": refreshToken,
                        "Id": id,
                        "Content-Type": "application/json"
                    },
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
            localStorage.setItem("Id", id)
            const { result } = values
            const updatedExam = result.map(el => {
                return {
                    name: el.name,
                    regNo: el.regNo,
                    class: el.class,
                    student_id: el.student_id
                }
            })


            dispatch(TeacherAction.showStudent({
                type: "success",
                students: updatedExam

            }))

        }
        catch (error) {
            console.log(error.message)
            dispatch(TeacherAction.showStudent({
                type: "error",
                error: error.message
            }))
        }
    }
}


export default TeacherSlice