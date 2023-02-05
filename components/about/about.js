import { Stack, Typography } from "@mui/material"
import AboutChild from "./about-child"
const About = ({ data }) => {

    const whoVal = data.who
    const newWho = whoVal.split("?")
    console.log(newWho)
    return (<Stack sx={{
        width: "100%",
        paddingX: "10px"
    }}>
        <Stack sx={{
            width: "100%",
            flex: 12,
            flexFlow: "row"
        }}>
            <Stack sx={{
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "10px",
                flexFlow: "row wrap"
            }}>
                <AboutChild title={"OUR VISION"} type="norms" content={data.vision} />
                <AboutChild type="norms" title={"OUR MISSION"} content={data.mission} />
                <AboutChild type="norms" title={"What we stand for"} content={data.what} />
                <AboutChild increase_box={true} type={"list"} title={"What We Do"} content={<>
                    {
                        newWho.map((el, i) => (
                            <Typography key={i} sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1.5rem",
                                    md: "1.8rem",
                                    lg: "1.5rem"
                                },
                                width: "100%",
                                height: "auto",
                                padding: "0px 0px",
                                marginY: "5px",
                                textAlign: "center"
                            }}>{el}</Typography>
                        ))
                    }

                </>} />
            </Stack>
        </Stack>
    </Stack >)
}



export default About