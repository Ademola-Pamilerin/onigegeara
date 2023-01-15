import classes from './footer.module.css'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { colors } from '../../util/them'
import { fontWeight } from '@mui/system'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
    return <Stack sx={{
        height: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        position: "relative",
        zIndex: 10
    }}>
        <Stack sx={{
            position: "relative",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        }}>
            <Box sx={{
                height: "25vh",
                position: "absolute",
                width: "60%",
                zIndex: 10,
            }}>
                <Image layout='fill' src={require("../../static/ogac-logo.png")} alt={"footer background image"} objectFit={"cover"} objectPosition={"center center"} />
            </Box>
        </Stack>
        <Box sx={{
            backgroundColor: colors.side_blue,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexFlow: "column",
            opacity: 0.95,
            position: "absolute",
            zIndex: 20
        }}>
            <Box sx={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography sx={{
                    fontSize: {
                        xs: "1rem",
                        sm: "1.4rem",
                        md: "1rem",
                        lg: "1.5rem"
                    },
                    fontWeight: {
                        xs: 500,
                        sm: 600,
                        md: "3rem",
                        lg: ""
                    },
                    color: colors.backgroun_color,
                    textAlign: {
                        xs: "center",
                    }
                }}>
                    ONI-GEGE ARA
                    <br />GROUP OF SCHOOLS
                </Typography>
                <Typography sx={{
                    fontSize: {
                        xs: "1rem",
                        sm: "1.4rem",
                        md: "1rem",
                        lg: "1.5rem"
                    },
                    fontWeight: 500,
                    color: colors.backgroun_color,
                    textAlign: "center",
                    width: "100%"
                }}>
                    Onigege Ara Street, Ishara, Remo North, Ogun State, Nigeria
                </Typography>
                <Typography sx={{
                    fontSize: {
                        xs: "1rem",
                        sm: "1.4rem",
                        md: "1rem",
                        lg: "1.5rem"
                    },
                    fontWeight: 500,
                    color: colors.backgroun_color
                }}>
                    <Link href="tel:+2348033746834"><a style={{
                        color: "white"
                    }}>+234 8033 7468 34</a></Link>
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexFlow: "column",
                marginTop: "10px",
                justifyContent: "center",
                width: "100%",
                alignItem: "center",
                alignItems: "center"
            }}>
                <Typography sx={{
                    fontSize: {
                        xs: "1.2rem",
                        sm: "1.2rem",
                        md: "1.2rem",
                        lg: "1.2rem"
                    },
                    color: "white",
                    fontWeight: "300"
                }}>&copy; OGAC {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>

    </Stack>
}

export default Footer