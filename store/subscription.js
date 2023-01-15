import { createSlice } from "@reduxjs/toolkit";
import { request_url } from "../util/base-url";

const Subscription_slice = createSlice({
    initialState: {
        loading: false,
        error: null,
        message: null,
        message_loading: false,
        message_error: null,
        message_reply: null
    },
    name: "subscription",
    reducers: {
        subscribe(state, action) {
            if (action.payload.type === "loading") {
                state.loading = true
                state.error = null
                state.message = null
            } else if (action.payload.type === "error") {
                state.error = action.payload.error
                state.message = null
                state.loading = false
            } else {
                state.message = action.payload.message
                state.loading = false
                state.error = null
            }
        },
        message(state, action) {
            if (action.payload.type === "loading") {
                state.message_loading = true
                state.message_error = null
                state.message_reply = null
            } else if (action.payload.type === "error") {
                state.message_error = action.payload.error
                state.message_reply = null
                state.message_loading = false
            } else {
                state.message_reply = action.payload.message
                state.message_loading = false
                state.message_error = null
            }
        }
    }
})

export const subscribe_action = Subscription_slice.actions
export const subscription_reducer = Subscription_slice.reducer

export const new_subscribe = ({ email }) => {
    return async (dispatch) => {
        dispatch(subscribe_action.subscribe({ type: "loading" }))
        try {
            const response = await fetch(`${request_url}/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
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
            const result = await response.json();
            const { message } = result
            dispatch(subscribe_action.subscribe({ type: "success", message }))
        }
        catch (error) {
            dispatch(subscribe_action.subscribe({ type: "error", error: error.message }))
        }
    }
}

export const unsubscribe = ({ email }) => {
    return async (dispatch) => {
        dispatch(subscribe_action.subscribe({ type: "loading" }))
        try {
            const response = await fetch(`${request_url}/unsubscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
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
            const result = await response.json();
            const { message } = result
            dispatch(subscribe_action.subscribe({ type: "success", message }))
        }
        catch (error) {
            dispatch(subscribe_action.subscribe({ type: "error", error: error.message }))
        }
    }
}


export const directMessage = ({ name, email, message }) => {
    return async (dispatch) => {
        dispatch(subscribe_action.message({ type: "loading" }))
        try {
            const response = await fetch(`${request_url}/direct_message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, message, name })
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
            const result = await response.json();
            const { message } = result
            dispatch(subscribe_action.message({ type: "success", message }))
        }
        catch (error) {
            dispatch(subscribe_action.message({ type: "error", error: error.message }))
        }
    }
}

export default Subscription_slice
