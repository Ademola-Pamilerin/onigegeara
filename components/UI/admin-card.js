import { Paper, Stack, Typography } from "@mui/material"
import Image from "next/image"

const AdminCard = ({ src, alt, title, content }) => {
    return (<Paper sx={{
        width: "40%",
        height: "auto"
    }}>
        <Stack sx={{
            width: "100%",
            height: "50%",
            margin: "0",
            padding: "0",
            position: "relative"
        }}>
            <Image
                alt={alt}
                src={src}
                layout={"fill"}
                objectFit={"cover"}
                objectPosition={"top center"}
            />
        </Stack>
        <Stack>
            <Typography variant={"h3"}>{title}</Typography>
            <Typography variant={"caption"}>{content}</Typography>
        </Stack>
    </Paper>)
}
export default AdminCard