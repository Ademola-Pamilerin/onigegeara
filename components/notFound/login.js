import { Paper, Stack } from "@mui/material"
import { useEffect } from "react"
import { useRouter } from "next/router"

const LoginToContinue = (props) => {
    const router = useRouter()

    useEffect(() => {
        router.push("/student")
    }, [router])

    return <Stack sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        margin:"2rem 0px"
    }}>
        Please Log in to continue
        <br />
        Redirecting....
    </Stack>
}
export default LoginToContinue