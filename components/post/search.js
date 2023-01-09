import { Box, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { searchPost } from "../../store/post-slice"


const Search = (props) => {
    const [inputval, setInput] = useState("")
    const dispatch = useDispatch()
    const post_auth = useSelector(state => state.post)


    const enterClick = () => {
        dispatch(searchPost({ search: event.target.value, page: 1 }))
    }

    const onChange = (event) => {
        setInput(event.target.value)
        dispatch(searchPost({ search: event.target.value, page: 1 }))
        props.changed(event.target.value)
    }

    return <>
        <Stack sx={{
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "1rem 0px",
            flexFlow: "row"
        }}>
            <input
                placeholder={"Enter title to search for a any event here "}
                onChange={onChange}
                style={{
                    width: "80%",
                    height: "3rem",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    border: "2px solid grey",
                }}
            />
            <Typography sx={{
                fontSize: "1rem",
                fontWeight: "700",
                border: "2px solid grey",
                height: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "15%",
                cursor: "pointer"
            }}
                onClick={enterClick}
            >Search</Typography>
        </Stack>
    </>
}
export default Search