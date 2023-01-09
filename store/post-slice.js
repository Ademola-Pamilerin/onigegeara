import { createSlice } from '@reduxjs/toolkit'
import { request_url } from '../util/base-url'

const PostSlice = createSlice({
    name: "Post",
    initialState: {
        new_loading: false,
        new_error: null,
        new_message: null,
        all_error: null,
        all_loading: true,
        all_posts: [],
        pageNumber: 0,
        totalNumber: 0,
        home_loading: true,
        home_error: null,
        home_posts: [],
        admin_loading: false,
        admin_error: null,
        admin_done: false
    },
    reducers: {
        showNotification(state, action) {
            if (action.payload.type === "loading") {
                state.new_loading = true
                state.new_error = null
                state.new_message = null
            } else if (action.payload.type === "error") {
                state.new_loading = false
                state.new_error = action.payload.error
                state.new_message = null
            } else {
                state.new_loading = false
                state.new_error = null
                state.new_message = "Successful"
            }
        },
        showAllNotification(state, action) {
            if (action.payload.type === "loading") {
                state.all_loading = true
                state.all_error = null
            } else if (action.payload.type === "error") {
                state.all_loading = false
                state.all_error = action.payload.error
            } else {
                state.all_loading = false
                state.all_error = null
                state.all_posts = action.payload.posts
                state.pageNumber = action.payload.pageVal
                state.totalNumber = action.payload.totalPage
            }
        },
        homePagePost(state, action) {
            if (action.payload.type === "loading") {
                state.home_loading = true
                state.home_error = null
            } else if (action.payload.type === "error") {
                state.home_loading = false
                state.home_error = action.payload.error
            } else {
                state.home_loading = false
                state.home_error = null
                state.home_posts = action.payload.posts
            }
        },
        adminDelete(state, action) {
            if (action.payload.type === "loading") {
                state.admin_loading = true
                state.admin_error = null
            } else if (action.payload.type === "error") {
                state.admin_loading = false
                state.admin_error = action.payload.error
            } else {
                state.admin_loading = false
                state.admin_error = null
                state.admin_done = true
            }
        }
    }
})

export const post_action = PostSlice.actions
export const post_reducer = PostSlice.reducer


export const createNewPost = ({ id, token, refreshToken, data, page }) => {
    const formData = new FormData()

    return async (dispatch) => {
        dispatch(post_action.showNotification({ type: "loading" }))
        try {
            for (let key in data) {
                console.log(data[key])
                formData.append(key, data[key])
            }
            const response = await fetch(`${request_url}/post/new`, {
                method: "POST",
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                },
                body: formData
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
            const value = await response.json()
            const { token: tokenVal, refresh_token, id: idVal } = value
            localStorage.setItem("Token", tokenVal)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("Id", idVal)
            dispatch(post_action.showNotification({ type: "success" }))


        }
        catch (error) {
            console.log(error.message)
            dispatch(post_action.showNotification({ type: "error", error: error.message }))
        }
    }
}

export const getAllPost = ({ search, page }) => {
    return async (dispatch) => {
        dispatch(post_action.showAllNotification({ type: "loading" }))
        try {
            let url;
            if (!search.length > 0) {
                url = `${request_url}/post/user/all?page=${!page ? 1 : page}`
            } else {
                url = `${request_url}/post/user/all?page=${!page ? 1 : page}&title=${search}`
            }
            const response = await fetch(url, {
                headers: {
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
            dispatch(post_action.showAllNotification({ posts: values.posts, type: "success", totalPage: values.allPosts, pageVal: values.currentNumber }))
        }
        catch (error) {
            dispatch(post_action.showAllNotification({ error: error.message, type: "error" }))
        }
    }
}

export const searchPost = ({ search, page }) => {
    return async (dispatch) => {
        dispatch(post_action.showAllNotification({ type: "loading" }))
        try {
            let url;
            if (!search.length > 0) {
                url = `${request_url}/post/user/all?page=${!page ? 1 : page}`
            } else {
                url = `${request_url}/post/user/all?page=${!page ? 1 : page}&title=${search}`
            }
            const response = await fetch(url, {
                headers: {
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
            dispatch(post_action.showAllNotification({ posts: values.posts, type: "success", totalPage: values.allPosts, pageVal: values.currentNumber }))
        }
        catch (error) {
            dispatch(post_action.showAllNotification({ error: error.message, type: "error" }))
        }
    }
}

// /home/post
export const getHomePagePost = () => {
    return async (dispatch) => {
        dispatch(post_action.homePagePost({ type: "loading" }))
        try {
            let url = `${request_url}/post/home/post`
            const response = await fetch(url, {
                headers: {
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
            dispatch(post_action.homePagePost({ posts: values.posts }))
        }
        catch (error) {
            dispatch(post_action.homePagePost({ error: error.message, type: "error" }))
        }
    }
}

export const deleteSinglePost = (data) => {
    return async (dispatch) => {
        dispatch(post_action.adminDelete({ type: "loading" }))
        try {
            let url = `${request_url}/post/post/${data.postId}`
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data.token,
                    "RefreshToken": data.refresh_token,
                    "Id": data.id
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
            localStorage.setItem("Refresh_Token", values.refresh_token)
            localStorage.setItem("Id", data.id)
            localStorage.setItem("Token", values.token)
            dispatch(post_action.adminDelete({ type: "success" }))
        }
        catch (error) {
            dispatch(post_action.adminDelete({ error: error.message, type: "error" }))
        }
    }
}

export const updatePost = ({ id, token, refreshToken, data }) => {
    console.log(data)
    return async (dispatch) => {
        dispatch(post_action.showNotification({ type: "loading" }))
        try {
            const response = await fetch(`${request_url}/post/post/${data.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: data.content, title: data.title })
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
            const value = await response.json()
            const { token: tokenVal, refresh_token, id: idVal } = value
            localStorage.setItem("Token", tokenVal)
            localStorage.setItem("Refresh_Token", refresh_token)
            localStorage.setItem("Id", idVal)
            dispatch(post_action.showNotification({ type: "success" }))
        }
        catch (error) {
            dispatch(post_action.showNotification({ type: "error", error: error.message }))
        }
    }
}


export default PostSlice