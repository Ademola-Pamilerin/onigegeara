import SignIn from "../../components/teacher/sign-in"
import SignUp from "../../components/teacher/sign-up"

import { Stack, Box, Paper } from '@mui/material'

import { useState } from "react"
import HeadComponent from '../../components/header/head'
import MainNav from "../../components/navigation/main-nav"
import { colors } from '../../util/them'
import Image from "next/image"

const Teacher_Auth = (props) => {

    const [mode, setMode] = useState(true)
    const clicked = () => {
        setMode(prev => !prev)
    }
    return (<Stack sx={{
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }}>
        <HeadComponent
            content={"This is the official Onigege Ara teachers login page"}
            title={"OGAC Teacher login"}
        />
        <Stack sx={{
            margin: "0px 0px 3rem 0px",
            width: "100%"
        }}>
            <MainNav />
        </Stack>
        <Stack sx={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Stack
                sx={{
                    flexFlow: "row",
                    backgroundColor: colors.side_blue,
                    height: "10vh",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    color: "white",
                    padding: "1rem 2rem",
                    fontWeight: 700,
                    margin: "1rem 0px",
                    borderRadius: "25px",
                    width: "80%"
                }}
            >
                <span onClick={() => setMode(true)}
                    style={{
                        fontSize: "2rem", cursor: "pointer", color: mode ? "rgba(255, 122, 0, 1)" : colors.backgroun_color
                    }}>SIGN IN</span>
                <span style={{ color: "white", margin: "0px 10px", fontSize: "2rem" }}>||</span>
                <span style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                    color: !mode ? "rgba(255, 122, 0, 1)" : colors.backgroun_color
                }} onClick={() => setMode(false)}>SIGN UP</span>
            </Stack>
        </Stack>
        <Stack sx={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: "2rem 0",
            margin: "1rem 0",
            position: "relative"
        }}>
            <Stack sx={{
                width: "100%",
                position: "absolute",
                zIndex: -1
            }}>
                <Box sx={{
                    height: "80vh",
                    position: "relatuve",
                    width: "100%"
                }}>
                    <Image
                        src={require("../../static/ogac-1.png")}
                        alt={"Background image of Authetication Page"}
                        layout={"fill"}
                        objectFit="cover"
                        objectPosition={"center center"} />
                </Box>
            </Stack>
            <Stack sx={{
                position: "relative",
                height: "auto",
                zIndex: 10,
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {
                    mode ? <SignIn clicked={clicked} /> : <SignUp clicked={clicked} />
                }

            </Stack>
        </Stack>
    </Stack>
    )
}

export default Teacher_Auth