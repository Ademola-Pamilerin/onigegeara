import { Paper } from "@mui/material"
import { colors } from '../../util/them'


const Message = (props) => {
    return <Paper sx={{
        fontSize: "2rem",
        height: "10rem",
        width: "40rem",
        padding: "1rem 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontWeight: "700",
        color: colors.side_blue,
        boxShadow: ".1px .1px .1px 1px " + colors.side_blue
    }}>{props.message}</Paper>
}

export default Message