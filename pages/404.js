import MainNav from '../components/navigation/main-nav'
import Footer from '../components/footer/footer'
import { Stack, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router';


const NotFound = () => {
    const router = useRouter()
    return (<>
        <MainNav />
        <Stack sx={{
            height: "50vh",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <Typography sx={{
                width: "100%",
                fontSize: "3rem",
                textAlign: "center"
            }}>This page cannot be found</Typography>
            <Button sx={{
                width: "auto",
                padding: "1rem",
                fontSize: "3rem",
                textAlign: "center"
            }} variant={"contained"} onClick={() => router.back()}>Go Back</Button>
        </Stack>
        {/* <Footer /> */}
    </>)
}

export default NotFound