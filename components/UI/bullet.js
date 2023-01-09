import { Paper, Typography } from '@mui/material';
import { colors } from '../../util/them'
const Bullet = (props) => {
    return (
        <Paper sx={{
            height: "25vh",
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
            margin: "0px 10px",
            cursor: "pointer",
            marginY: props.margin ? props.margin : 0
        }} onClick={props.clicked}>
            <Typography sx={{
                height: "70%",
                width: "100%",
                fontWeight: "800",
                fontSize: "2.5rem",
                backgroundColor: colors.side_blue,
                color: colors.backgroun_color,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center"
            }}>{props.title}</Typography>
            <Typography sx={{
                height: "30%",
                width: "100%",
                fontWeight: "500",
                fontSize: "1.6rem",
                backgroundColor: colors.side_blue_background,
                color: colors.side_blue,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                lineHeight: "25px"
            }}>{props.content}</Typography>
        </Paper >
    )
}

export default Bullet