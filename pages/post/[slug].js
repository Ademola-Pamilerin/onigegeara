import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import HeadComponent from "../../components/header/head"
import { image_url, request_url } from '../../util/base-url'
import MainNav from "../../components/navigation/main-nav"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchPost } from "../../store/post-slice"
import PostCard from "../../components/post/post_card"

const SinglePage = ({ post, similarPost, error }) => {
    const dispatch = useDispatch()
    const { all_posts, all_error, all_loading } = useSelector(state => state.post)
    const [totalError, setTotalError] = useState("")
    const [showErr, setShowErr] = useState(false)
    const sharedPost = all_posts.filter(el => el._id.toString() === post_id.toString())

    useEffect(() => {
        dispatch(searchPost({ page: 1, title: "" }))
    }, [dispatch])

    useEffect(() => {
        if (error) {
            setTotalError(error)
            setShowErr(true)
        }
        else {
            setShowErr(false)
        }
    }, [error])

    return <>
        <HeadComponent title={post ? post.title : "loading"} content={post ? post.title : "Loading Post"} />
        <Stack>
            <MainNav />
        </Stack>
        {error && totalError && <Stack sx={{
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            height: "70vh",
            fontSize: "2rem",
            alignItems: "center"
        }}><Typography sx={{
            width: "70%", textAlign: "center"
        }}>{totalError}</Typography></Stack>}
        {!error && !totalError && <Stack sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "70%",
                textAlign: "center",
                fontSize: {
                    xs: "",
                    sm: "",
                    md: "",
                    lg: "1.5rem"
                },
                textTransform: "uppercase",
                margin: "1rem 0px",
                fontWeight: "700"
            }}>
                {post.title}
            </Box>

            <Box sx={{
                position: "relative",
                width: "30rem",
                height: "30rem"
            }}>
                <Image layout={"fill"} alt={post.title + " Image"} src={image_url + "/" + post.image[0].path} />
            </Box>
            <Box sx={{
                marginY: "1rem",
                fontSize: {
                    xs: "",
                    sm: "",
                    md: "",
                    lg: "1.5rem"
                },
                width: "70%"
            }}>
                {post.content}
            </Box>
            <Box sx={{ width: "100%" }}>
                {all_loading ?
                    <Stack sx={{ justifyContent: "center", alignItems: "center" }}><CircularProgress variant="indeterminate" /></Stack> :
                    similarPost.length < 1 ? <Stack sx={{ justifyContent: "center", alignItems: "center" }}><CircularProgress variant="indeterminate" /></Stack> :
                        <Stack sx={{ width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                            {similarPost.map(el => (
                                <PostCard key={el._id} _id={el._id} title={el.title} image={el.image[0].path} />
                            ))}
                        </Stack>
                }
            </Box>
        </Stack >}
    </>
}

export const getServerSideProps = async (context) => {
    const { slug } = context.params

    try {
        const fetcher = await fetch(`${request_url}/post/post/` + slug, {
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
                post: result.post,
                similarPost: result.similarPost
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


export default SinglePage