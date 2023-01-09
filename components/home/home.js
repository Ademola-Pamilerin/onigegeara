import { Stack, Box, useMediaQuery, Paper, Button } from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { side_blue } from '../../util/them'


function Item(props) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}


const HomeModule = (props) => {
    const small_screen = useMediaQuery("(max-width:600px)")
    // var items = [
    //     {
    //         name: "Random Name #1",
    //         description: "Probably the most random thing you have ever seen!"
    //     },
    //     {
    //         name: "Random Name #2",
    //         description: "Hello World!"
    //     }
    // ]
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
                autoPlay={true}
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
                <Image
                    objectFit='cover'
                    layout='fill'
                    src={require("../../static/01.jpeg")}
                    alt="Logo 1"
                    objectPosition="50% 30%"
                    priority
                />
                <Image
                    objectFit='cover'
                    layout='fill'
                    src={require("../../static/02.jpeg")}
                    alt="Logo 2"
                    objectPosition="50% 10%"
                    priority
                />
                <Image
                    objectFit='cover'
                    layout='fill'
                    src={require("../../static/03.jpeg")}
                    alt="Logo 2"
                    objectPosition="50% 5%"
                    priority
                />
                <Image
                    objectFit='cover'
                    layout='fill'
                    src={require("../../static/04.jpeg")}
                    alt="Logo 2"
                    priority
                    objectPosition="50% 20%"
                />
            </Carousel>



        </Stack >
    )
}
export default HomeModule