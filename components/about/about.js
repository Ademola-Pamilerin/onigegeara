import { Stack, Typography } from "@mui/material"
import AboutChild from "./about-child"
const About = (props) => {






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
                <AboutChild title={"OUR VISION"} type="norms" content={``} />
                <AboutChild type="norms" title={"OUR MISSION"} content={``} />
                <AboutChild type="norms" title={"What we stand for"} content={``} />
                <AboutChild increase_box={true} type={"list"} title={"What We Do"} content={<>
                    <Typography sx={{
                        width: "100%",
                        height: "auto",
                        fontSize: {
                            xs: "1rem",
                            sm: "1.5rem",
                            md: "1.8rem",
                            lg: "1.5rem"
                        },
                        padding: "0px 10px",
                        marginY: "5px",
                        textAlign: "center"
                    }}>Admission of eligible Students</Typography>
                    <Typography sx={{
                        fontSize: {
                            xs: "1rem",
                            sm: "1.5rem",
                            md: "1.8rem",
                            lg: "1.5rem"
                        },
                        width: "100%",
                        height: "auto",
                        padding: "0px 10px",
                        marginY: "5px",
                        textAlign: "center"
                    }}>Assisting in the Development of Sound Education</Typography>
                    <Typography sx={{
                        fontSize: {
                            xs: "1rem",
                            sm: "1.5rem",
                            md: "1.8rem",
                            lg: "1.5rem"
                        },
                        width: "100%",
                        height: "auto",
                        padding: "0px 10px",
                        marginY: "5px",
                        textAlign: "center"
                    }}>Ensure that educational Standard are maintained</Typography>
                    <Typography sx={{
                        fontSize: {
                            xs: "1rem",
                            sm: "1.5rem",
                            md: "1.8rem",
                            lg: "1.5rem"
                        },
                        width: "96%",
                        height: "auto",
                        padding: "0px 10px",
                        marginY: "5px",
                        textAlign: "center",
                        wordWrap: "break-word"
                    }}>Giving Children the vision of the great potentials which lie beyond examination</Typography>

                </>} />
            </Stack>
        </Stack>
    </Stack >)
}



export default About