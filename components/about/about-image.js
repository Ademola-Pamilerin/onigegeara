import { Stack, Box } from '@mui/material'
import Image from 'next/image'
const AboutImage = () => {
    return (
        <Stack sx={{
            width: "100%",
            height: {
                md: '100vh',
                lg: '95rem'
            },
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <Box sx={{
                width: "80%",
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                height: {
                    md: '100vh',
                    lg: '90%'
                },
                flexFlow: "column"
            }}>
                <Box sx={{
                    width: "80%",
                    position: "relative",
                    height: "100%"
                }}>
                    <Image
                        layout="fill"
                        src={require("../../static/ogac-5.png")}
                        objectFit={"cover"}
                        objectPosition={"top right"}
                        alt={"About onag class room"}
                    />
                </Box >
                <Box sx={{
                    height:"5rem"
                }}></Box>
                <Box sx={{
                    width: "80%",
                    position: "relative",
                    height: "100%"
                }}>
                    <Image
                        layout="fill"
                        src={require("../../static/ogac-4.png")}
                        objectFit={"cover"}
                        objectPosition={"right"}
                        alt={"About onag class room"}
                    />
                </Box>
            </Box>
        </Stack>
    )
}
export default AboutImage