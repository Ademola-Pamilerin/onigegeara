import { Stack, Typography } from "@mui/material"

const StudentField = (props) => {
    return <Stack direction={"row"} sx={{
        width: "80%"
    }}>
        <Typography sx={{
            padding: "10px 12px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            backgroundColor: "rgba(243, 227, 227, 1)",
            color: "black",
            fontSize: "1rem",
            fontWeight: '700'
        }}>{props.field}</Typography>
        <Typography sx={{
            padding: "10px 12px",
            width: "150%",
            backgroundColor: "rgba(188, 186, 186, 1)",
            color: "black"
        }}>{props.value}</Typography>
    </Stack>
}
export default StudentField