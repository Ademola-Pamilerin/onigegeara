import { Stack, Box, CircularProgress, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeadComponent from '../../components/header/head'
import MainNav from '../../components/navigation/main-nav'
import PostCard from '../../components/post/post_card'
import Search from '../../components/post/search'
import SnackBarComponent from '../../components/UI/error'
import { getAllPost } from '../../store/post-slice'


const AllPost = () => {
    const dispatch = useDispatch()
    const auth_state = useSelector(state => state.auth)
    const post_state = useSelector(state => state.post)
    const [page, setPage] = useState(1)
    const { all_error, all_loading, all_posts, pageNumber, totalNumber } = post_state
    const [totalErr, setTotalError] = useState("")
    const [showErr, setError] = useState(false)
    const [inputVla, setInputVal] = useState("")


    const changed = (value) => {
        setInputVal(value)
    }

    useEffect(() => {
        dispatch(getAllPost({ search: inputVla, page: page }))
    }, [dispatch, page, inputVla])

    useEffect(() => {
        if (all_error) {
            setError(true)
            setTotalError(all_error)
        }
    }, [all_error])


    return (<>
        <HeadComponent
            title={"Oni-gege Posts"}
            content={"View all post by Onigege Ara Group of schools"}
        />
        <Stack>
            <MainNav />
        </Stack>

        <SnackBarComponent
            message={totalErr}
            type={"error"}
            open={showErr}
            close={() => setError(false)}
            duration={6000}
        />

        <Stack>
            <Box>
                <Search changed={changed} />
            </Box>

            <Box>
                {all_loading ?
                    <Box sx={{ width: "100%", height: "70vh", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <CircularProgress variant='indeterminate' />
                    </Box>
                    :
                    <Box sx={{
                        width: "100%"
                    }}>
                        {!all_posts.length > 0 ?
                            <Box sx={{ width: "100%", height: "70vh", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                No Post Yet
                            </Box>
                            :
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexFlow: {
                                    xs: "column",
                                    sm: "row wrap"
                                },
                                justifyContent: {
                                    xs: "center",
                                    sm: "space-evenly"
                                },
                                alignItems: "center"
                            }}>
                                {all_posts.map(el => (
                                    <PostCard original={true} key={el._id} title={el.title} image={el.image[0].path} content={el.content} _id={el._id} />
                                ))}
                            </Box>
                        }
                    </Box>}
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "1rem 0px",
                position: "fixed",
                bottom: 0,
                left: 0
            }}>
                <Box

                    sx={{
                        width: "50%",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center"
                    }}>
                    <Button
                        disabled={page == 1}
                        variant={"contained"}
                        sx={{
                            width: "20%",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center"

                        }} onClick={() => setPage(prev => prev - 1)}>Prev</Button>
                </Box>
                <Box>
                    {pageNumber + "/" + totalNumber}
                </Box>
                <Box

                    sx={{
                        width: "50%",
                        width: "50%",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center"
                    }}>
                    <Button
                        disabled={pageNumber == totalNumber}
                        sx={{
                            width: "20%",
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center"
                        }} variant={"contained"} onClick={() => setPage(prev => prev + 1)}>Next</Button>
                </Box>
            </Box>
        </Stack>
    </>)

}

export default AllPost