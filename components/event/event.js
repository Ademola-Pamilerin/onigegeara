import { CircularProgress, Stack, Typography } from '@mui/material'
import { colors } from '../../util/them'
import CardEvent from './card-event'
import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHomePagePost } from '../../store/post-slice'
import PostCard from '../post/post_card'
const Events = () => {
    const { home_posts, home_loading, home_error } = useSelector(state => state.post)


    return <Stack sx={{
        width: "100%"
    }}>
        <Typography sx={{
            width: "100%",
            textAlign: "center",
            textDecoration: "underline",
            color: colors.side_blue_brown,
            fontWeight: 900,
            fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.6rem",
                lg: "2rem"
            },
            marginY: "5px"
        }}>
            NEWS & EVENTS
        </Typography>
        <Stack sx={{
            width: "100%",
            flexFlow: {
                xs: "column",
                sm: "column",
                md: 'row',
                lg: "row"
            },
            justifyContent: "center",
            alignItems: "center",
            height: {
                xs: "auto",
                sm: "auto",
                md: "auto",
                lg: "auto"
            },
            overflow: "hidden"
        }}>
            {home_loading && <Stack sx={{ alignItems: "center", width: "100%" }}><CircularProgress variant={"indeterminate"} /></Stack>}
            {!home_loading && home_error && <Typography sx={{ alignItems: "center", width: "100%", textAlign: "center" }}>{home_error}</Typography>}
            {!home_loading && !home_error && home_posts && home_posts.length < 1 ?
                <Stack sx={{ textAlign: "center", marginY: "1rem" }}>No Post Yet</Stack> :
                <Stack sx={{
                    flexFlow: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row"
                    },
                    justifyContent: "space-evenly",
                    width: "100%",
                    alignItems: "center"
                }}>
                    {home_posts.map((el) => (
                        <PostCard from={"event"} key={el._id} _id={el._id} image={el.image[0].path} title={el.title} />
                    ))}
                </Stack>
            }
        </Stack>
    </Stack>
}
export default Events