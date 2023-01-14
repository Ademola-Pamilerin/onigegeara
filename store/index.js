import { configureStore } from '@reduxjs/toolkit'
import { AdminReducer } from './admin-slice'
import { authReducer } from './auth-slice'
import { exam_reducer } from './exam-slice'
import { post_reducer } from './post-slice'
import { question_reducer } from './question'
import { studentReducers } from './student-slice'
import { subscription_reducer } from './subscription'
import { TeacherReducer } from './teacher-slice'


const store = configureStore({
    reducer: {
        auth: authReducer,
        student: studentReducers,
        exam: exam_reducer,
        question: question_reducer,
        teacher: TeacherReducer,
        admin: AdminReducer,
        post: post_reducer,
        subscribe:subscription_reducer
    }
})
export default store