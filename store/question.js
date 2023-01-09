import { createSlice } from '@reduxjs/toolkit'
import { request_url } from '../util/base-url'

const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        index: 0,
        prevIndex: 0,
        nextIndex: 0,
        answers: [],
        question: null,
        remaining: 0,
        loading: true,
        error: null,
        image: null,
        answer: null,
        all: true,
        allErr: null,
        allQuest: [],
        answer_err: null,
        answer_loading: true,
        my_answer: "",
        question_id: null,
        next: false,
        input: "",
        submit_loading: false,
        submit_error: null,
        submit_success: false
    },
    reducers: {
        getStartQuestion(state, action) {
            const { question, my_answer, remaining, answers, current, next, prev, image, id } = action.payload
            state.index = current
            state.prevIndex = prev
            state.nextIndex = next
            state.question = question
            state.loading = false
            state.answers = answers
            state.error = null
            state.remaining = remaining
            state.image = image
            state.question_id = id
            state.my_answer = my_answer
            state.input = ""
        },
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
        allNotification(state, action) {
            if (action.payload.type === "loading") {
                state.all = true
                state.allErr = null
            } else if (action.payload.type === "error") {
                state.all = false
                state.allErr = action.payload.error
            } else {
                state.all = false
                state.allErr = null
            }
        },
        answerNotification(state, action) {
            if (action.payload.type === "loading") {
                state.answer_loading = true
                state.next = false
                state.answer_err = null
            } else if (action.payload.type === "error") {
                console.log(action.payload.error)
                state.answer_loading = false
                state.next = false
                state.answer_err = action.payload.error
            } else {
                state.answer_loading = false
                state.answer_err = null
            }
        },
        submitNotification(state, action) {
            if (action.payload.type === "loading") {
                state.submit_loading = true
                state.submit_error = null
                state.submit_success = false
            } else if (action.payload.type === "error") {
                state.submit_loading = false
                state.submit_error = action.payload.error
                state.submit_success = false
            } else {
                state.submit_loading = false
                state.submit_error = null
                state.submit_success = true
            }
        },
        allQuestion(state, action) {
            state.all = false
            state.allErr = null
            state.allQuest = action.payload.questions
            state.index = action.payload.currentIndex
            state.input = ""
        },
        answerQuestion(state, action) {
            state.next = true
            state.input = ""
        },
        chooseAnswer(state, action) {
            state.input = action.payload
        }
    }
})



export const question_action = questionsSlice.actions
export const question_reducer = questionsSlice.reducer


export const getStartQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.showNotification({ type: "loading" }))
        try {
            const index = localStorage.getItem("current_Index")
            let url;
            if (index) {
                url = +index > 1 ?
                    `${request_url}/exam/student/exam/question?page=${index}` :
                    `${request_url}/exam/student/exam/question`
            }
            else {
                url = `${request_url}/exam/student/exam/question`
            }
            const response = await fetch(`${url}`, {

                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id
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
            const value = await response.json()
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("current_Index", value.current)
            dispatch(question_action.getStartQuestion({
                question: value.question.question,
                current: value.current,
                prev: value.prev,
                next: value.next,
                answers: value.question.answers,
                image: value.question.image,
                remaining: value.done,
                id: value.question._id,
                my_answer: value.answer
            }))
        }
        catch (error) {
            console.log(error)
            dispatch(question_action.showNotification({
                type: "error",
                error: error.message
            }))

        }

    }
}
export const getNextQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.showNotification({ type: "loading" }))
        try {
            const response = await fetch(`${request_url}/exam/student/exam/question?page=${data.current + 1}`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id
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
            const value = await response.json()
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("current_Index", value.current)
            dispatch(question_action.getStartQuestion({
                question: value.question.question,
                current: value.current,
                prev: value.prev,
                next: value.next,
                answers: value.question.answers,
                image: value.question.image,
                remaining: value.done,
                id: value.question._id,
                my_answer: value.answer
            }))
        }
        catch (error) {
            dispatch(question_action.showNotification({
                type: "error",
                error: error.message
            }))

        }

    }
}

export const getPreviousQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.showNotification({ type: "loading" }))

        try {
            const url = data.current === 2 ?
                `${request_url}/exam/student/exam/question` :
                `${request_url}/exam/student/exam/question/${data.current - 1}`
            const response = await fetch(`${url}`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id
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
            const value = await response.json()
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("current_Index", value.current)
            dispatch(question_action.getStartQuestion({
                question: value.question.question,
                current: value.current,
                prev: value.prev,
                next: value.next,
                answers: value.question.answers,
                image: value.question.image,
                remaining: value.done,
                id: value.question._id,
                my_answer: value.answer
            }))
        }
        catch (error) {
            dispatch(question_action.showNotification({
                type: "error",
                error: error.message
            }))

        }

    }
}

export const reloadQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.showNotification({ type: "loading" }))
        const indexVal = localStorage.getItem("current_Index")
        try {
            let url;
            if (indexVal) {
                url = +indexVal > 1 ?
                    `${request_url}/exam/student/exam/question?page=${indexVal}` :
                    `${request_url}/exam/student/exam/question`
            }
            else {
                url = `${request_url}/exam/student/exam/question`
            }
            const response = await fetch(`${url}`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id
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
            const value = await response.json()
            console.log(value)
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("current_Index", value.current)
            dispatch(question_action.getStartQuestion({
                question: value.question.question,
                current: value.current,
                prev: value.prev,
                next: value.next,
                answers: value.question.answers,
                image: value.question.image,
                remaining: value.done,
                id: value.question._id,
                my_answer: value.answer
            }))
        }
        catch (error) {
            dispatch(question_action.showNotification({
                type: "error",
                error: error.message
            }))

        }

    }
}

export const getAllQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.allNotification({
            type: "loading"
        }))
        try {

            const response = await fetch(`${request_url}/exam/complete/exam`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id
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
            const value = await response.json()
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            const currentIndex = localStorage.getItem("current_Index")
            dispatch(question_action.allQuestion({ questions: value.questions, currentIndex }))
        } catch (error) {
            dispatch(question_action.allNotification({
                type: "error",
                error: error.message
            }))
        }
    }
}

export const getIndexQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.showNotification({ type: "loading" }))
        try {
            const url = data.index == 1 ?
                `${request_url}/exam/student/exam/question` :
                `${request_url}/exam/student/exam/question?page=${data.index}`
            const response = await fetch(`${url}`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id
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
            const value = await response.json()
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("current_Index", value.current)
            dispatch(question_action.getStartQuestion({
                question: value.question.question,
                current: value.current,
                prev: value.prev,
                next: value.next,
                answers: value.question.answers,
                image: value.question.image,
                remaining: value.done,
                id: value.question._id,
                my_answer: value.answer
            }))
            // console.log(value)
        }
        catch (error) {
            dispatch(question_action.showNotification({
                type: "error",
                error: error.message
            }))

        }

    }
}


//we need answer and time in minutes and seconds
export const answerQuestion = (data) => {
    return async (dispatch) => {
        dispatch(question_action.answerNotification({ type: "loading" }))
        try {

            const response = await fetch(`${request_url}/exam/answer/${data.quest_id}`, {
                method: "PUT",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    answer: data.answer,
                    time: data.time
                })
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
            const value = await response.json()
            const { token, refresh_token } = value
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("current_Index", value.current)
            dispatch(question_action.answerQuestion())
        }
        catch (error) {
            console.log(error)
            dispatch(question_action.answerNotification({
                type: "error",
                error: error.message
            }))

        }

    }
}


export const SubmitExam = (data) => {
    return async (dispatch) => {
        dispatch(question_action.submitNotification({ type: "loading" }))
        try {

            const response = await fetch(`${request_url}/exam/submit/${data.exam_id}`, {
                method: "GET",
                headers: {
                    "Authorization": data.token,
                    "RefreshToken": data.refreshToken,
                    "Id": data.id,
                    "Content-Type": "application/json"
                },
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
            const value = await response.json()
            const { token, refresh_token } = value
            const idVal = localStorage.getItem("Id")
            localStorage.removeItem("Seconds")
            localStorage.removeItem("Minutes")
            localStorage.removeItem("current_Index")
            localStorage.setItem("Token", token)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("Id", idVal)
            dispatch(question_action.submitNotification({
                type: "success"
            }))

        }
        catch (error) {
            console.log(error)
            dispatch(question_action.submitNotification({
                type: "error",
                error: error.message
            }))

        }
    }
}


export default questionsSlice