import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadComponent from "../../components/header/head"
import MainNav from "../../components/navigation/main-nav"
import SnackBarComponent from "../../components/UI/error"
import { checkStatus } from "../../store/auth-slice"
import { createNewPost } from "../../store/post-slice"
import { FileUploadComponent } from "../../util/upload"

const NewPost = () => {

    const dispatch = useDispatch()
    const { check_loading, check_error, isAuthenticated, token, refreshToken, id, } = useSelector(state => state.auth)
    const [showErr, setShowErr] = useState(false)
    const [totalErr, setTotalError] = useState("")
    const router = useRouter()
    const questionRef = useRef(null)
    const option1Ref = useRef("")
    const [image, setImage] = useState(null)
    const [selected, setSelected] = useState('')
    const [clearImage, setClearImage] = useState(false)
    const { new_error, new_message } = useSelector(state => state.post)


    const pushVal = (val) => {
        setImage(val)
        setClearImage(false)
    }

    const submitHandler = () => {
        if (questionRef.current.value.trim().length < 1) {
            setShowErr(true)
            setTotalError("please provide title to your post")
        }
        else if (option1Ref.current.value.trim().length < 1) {
            setShowErr(true)
            setTotalError("please provide content to your post")
        } else {
            const title = questionRef.current.value
            const content = option1Ref.current.value
            const data = { title, content, image }
            dispatch(createNewPost({ id, token, refreshToken, data }))
            router.push("/ogac/admin/post")
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
    }, [new_error])
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
                title={"New Post"}
                content={"Create A new Post, available for admin only"}
            />
            <Stack sx={{
                margin: "0px 0px 3rem 0px"
            }}>
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
                    <Stack sx={{
                        width: "60%"
                    }}>
                        <Typography sx={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "700"
                        }}>
                            Create A New Post
                        </Typography>
                        <TextField
                            inputRef={questionRef}
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
                            width: "90%",
                            height: "auto"
                        }}>
                            <FileUploadComponent pushVal={pushVal} clearImage={clearImage} />
                        </Stack>
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
                                inputRef={option1Ref}
                                rows={5}
                                column={5}
                                sx={{
                                    width: "100%",
                                    fontSize: "2rem",
                                }}

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
                                }}>Add Post</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </>
            }

        </>
    )
}
export default NewPost