import { Stack, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'


const HomeModule = (props) => {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPlay(true)
        }, 4000)
        return () => clearTimeout(timeout)
    })


    return (
        <Stack
            display='block'
            sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%"
                },
                position: "relative",
                zIndex: 20,

            }}>
            <Stack sx={{
                position: "absolute",
                height: "90vh",
                width: "100%",
                backgroundColor: "navy",
                zIndex: 50,
                opacity: 0.3
            }}>

            </Stack>
            <Carousel
                sx={{
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "100%"
                    },
                    height: "90vh",
                    position: "relative",
                    zIndex: 6,
                }}
                autoPlay={play}
                indicators={true}
                cycleNavigation
                animation='slide'
                duration={"1000"}
                fullHeightHover
                navButtonsAlwaysVisible={false}
                stopAutoPlayOnHover
                swipe
                interval={"5000"}
            >
                <Stack sx={{
                    position: "relative",
                    height: "90vh",
                    width: "100%"
                }}>
                    <Image
                        objectFit='cover'
                        layout='fill'
                        src={require("../../static/01.jpeg")}
                        alt="Logo 1"
                        objectPosition="50% 30%"
                        priority
                    />
                </Stack>
                <Stack sx={{
                    position: "relative",
                    height: "90vh",
                    width: "100%"
                }}>
                    <Image
                        objectFit='cover'
                        layout='fill'
                        src={require("../../static/02.jpeg")}
                        alt="Logo 2"
                        objectPosition="50% 10%"

                    /></Stack>
                <Stack sx={{
                    position: "relative",
                    height: "90vh",
                    width: "100%"
                }}><Image
                        objectFit='cover'
                        layout='fill'
                        src={require("../../static/03.jpeg")}
                        alt="Logo 2"
                        objectPosition="50% 5%"

                    /></Stack>
                <Stack sx={{
                    position: "relative",
                    height: "90vh",
                    width: "100%"
                }}><Image
                        objectFit='cover'
                        layout='fill'
                        src={require("../../static/04.jpeg")}
                        alt="Logo 2"

                        objectPosition="50% 20%"
                    />
                </Stack>
            </Carousel>
        </Stack >
    )
}
export default HomeModule