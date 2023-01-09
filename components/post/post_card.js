import { Paper, Box, Typography, Button } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { deleteSinglePost } from "../../store/post-slice"
import { image_url } from "../../util/base-url"

const PostCard = ({ from, title, image, _id, type, data, reload, original }) => {
    const router = useRouter()
    const clicked = () => {
        router.push("/post/" + _id)
    }
    const dispatch = useDispatch()


    const deletePost = () => {
        dispatch(deleteSinglePost({
            ...data,
            postId: _id
        }))
        reload()
    }

    return (<>
        <Paper sx={{
            boxShadow: ".1px .1px .1px 1 rgba(230, 196, 166, 0.5)",
            width: {
                xs: from ? "50%" : original ? "50%" : "35%",
                md: "20rem"
            },
            height: "30rem",
            overflow: "hidden"
        }}>
            <Box sx={{
                width: "100%",
                height: "25rem",
                position: "relative"
            }}>
                <Image layout="fill" src={image_url + "/" + image} alt={title + " image"} />
            </Box>
            <Typography sx={{
                textAlign: "center",
                fontWeight: {
                    xs: "500",
                    sm: "500",
                    md: "600",
                    lg: "700"
                },
                textTransform: "uppercase",
                margin: ".5rem 0px",
                fontSize: {
                    xs: ".5rem",
                    sm: ".6rem",
                    md: ".7rem",
                    lg: ".8rem"
                }
            }}>{title.length > 60 ? title.slice(0, 60) + " ..." : title}</Typography>
            <Box sx={{
                width: "100%",
                justifyContent: type === "Admin" ? "space-evenly" : "center",
                alignItems: "center",
                display: "flex",
                flexFlow: "row"
            }}>

                <Button sx={{
                    width: {
                        xs: "60%",
                        sm: "50%",
                        md: "50%",
                        lg: "40%"
                    },
                    fontSize: {
                        xs: ".5rem",
                        sm: ".6rem",
                        md: ".7rem",
                        lg: ".8rem"
                    }
                }} variant={"contained"} onClick={type === "Admin" ? () => router.push("/post/update/" + _id) : clicked}>{type === "Admin" ? "Update" : "Read More"}</Button>
                {
                    type === "Admin" && <Button sx={{
                        width: {
                            lg: "30%"
                        },
                        fontSize: {
                            xs: ".5rem",
                            sm: ".6rem",
                            md: ".7rem",
                            lg: ".8rem"
                        }
                    }} variant={"contained"} onClick={deletePost}>Delete</Button>
                }
            </Box>
        </Paper>
    </>)
}
export default PostCard