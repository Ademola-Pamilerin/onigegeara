import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadComponent from "../../../components/header/head"
import MainNav from "../../../components/navigation/main-nav"
import SnackBarComponent from "../../../components/UI/error"
import { checkStatus } from "../../../store/auth-slice"
import { updatePost } from "../../../store/post-slice"
import { request_url } from "../../../util/base-url"

const NewPost = ({ error, post }) => {

    const dispatch = useDispatch()
    const { check_loading, check_error, isAuthenticated, token, refreshToken, id, } = useSelector(state => state.auth)
    const [showErr, setShowErr] = useState(false)
    const [totalErr, setTotalError] = useState("")
    const router = useRouter()
    const { new_error, new_message } = useSelector(state => state.post)
    const [title, setTitle] = useState(post ? post.title : "")
    const [content, setContent] = useState(post ? post.content : "")



    const submitHandler = () => {
        if (title.trim().length < 1) {
            setShowErr(true)
            setTotalError("please provide title to your post")
        }
        else if (content.trim().length < 1) {
            setShowErr(true)
            setTotalError("please provide content to your post")
        } else {
            const data = { title, content, id: post._id }
            dispatch(updatePost({ id, token, refreshToken, data }))
            router.replace("/ogac/admin/post")
        }
    }


    useEffect(() => {
        dispatch(checkStatus())
    })
    useEffect(() => {
        if (!isAuthenticated && !check_loading) {
            router.replace("/")
        }
    }, [isAuthenticated, router, check_loading])
    useEffect(() => {
        if (new_error) {
            setShowErr(true)
            setTotalError(new_error)
        }
        if (error) {
            setShowErr(true)
            setTotalError(error)
        }
    }, [new_error, error])
    // useEffect(() => {
    //     if (new_message) {
    //         router.replace("/post")
    //     }
    //     questionRef.current.value = ""
    //     option1Ref.current.value = ""
    // }, [new_message, router])

    return (
        <>
            <HeadComponent
                title={"Update Post"}
                content={"Create A new Post, available for admin only"}
            />
            <Stack>
                <MainNav type={"Admin"} />
            </Stack>
            {check_loading ? <Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <CircularProgress variant="indeterminate" />
            </Stack> : <><SnackBarComponent
                open={showErr}
                close={() => setShowErr(false)}
                message={totalErr}
                type={"error"}
            />
                <Stack sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "auto",
                    width: "100%"
                }}>
                    {!error && <Stack sx={{
                        width: "60%"
                    }}>
                        <Typography sx={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "700"
                        }}>
                            Update Post
                        </Typography>
                        <TextField
                            onChange={(event) => setTitle(event.target.value)}
                            value={title}
                            sx={{
                                width: "90%",
                                fontSize: "2rem",
                            }}

                            label={<Typography sx={{
                                fontSize: "1rem",
                                fontWeight: "600"
                            }}>Title here</Typography>}
                            multiline
                            helperText="Add Post Title"
                        >


                        </TextField>
                        <Stack sx={{
                            width: "90%"
                        }}>
                            <Typography sx={{
                                width: "100%",
                                textAlign: "center",
                                fontSize: "1.2rem",
                                fontWeight: "600",
                                margin: "1rem 0px"
                            }}>
                                Add Caption
                            </Typography>
                            <TextField
                                onChange={(event) => setContent(event.target.value)}
                                rows={5}
                                column={5}
                                sx={{
                                    width: "100%",
                                    fontSize: "2rem",
                                }}
                                value={content}
                                label={<Typography sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600"
                                }}>Content</Typography>}
                                multiline
                                helperText="Add Post Caption"
                            >
                            </TextField>

                        </Stack>
                        <Stack sx={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "2rem 0px"
                        }}>
                            <Button
                                variant={"contained"} onClick={submitHandler} sx={{
                                    width: "40%",
                                    fontWeight: "750",
                                    fontSize: "1.2rem"
                                }}>Update Post</Button>
                        </Stack>
                    </Stack>}
                </Stack>
            </>
            }

        </>
    )
}

export const getServerSideProps = async (context) => {
    const { id } = context.params
    try {
        const fetcher = await fetch(`${request_url}/post/post/` + id, {
            header: {
                "Content-Type": "application/json"
            }
        })
        if (!fetcher.ok) {
            const err = await fetcher.json();
            if (!err) {
                throw new Error("Request failed!");
            } else if (err.message === "Failed to fetch") {
                throw new Error("Please check you internet connection");
            }
            else {
                throw new Error(err.message);
            }
        }
        const result = await fetcher.json()
        return {
            props: {
                post: result.post
            }
        }
    }
    catch (error) {
        return {
            props: {
                error: error.message
            }
        }
    }

}

export default NewPost