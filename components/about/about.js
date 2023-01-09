import { ListItem, Stack, Typography } from "@mui/material"
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
                <AboutChild title={"OUR VISION"} type="norms" content={`ONIGEGE ARA- A first class academic body/education provider, adding 
                value to educational goals of its numerous stakeholders and producing individual
                 that will be useful to themselves, the nation and the world at large`} />
                <AboutChild type="norms" title={"OUR MISSION"} content={`ONIGEGE ARA- An academic institution making qualitative education, affordable
                ,providing and maintaining sound academics training, encouraging moral excellence among youths, providing sustainable human resources development
                ,providing ambassadors that will uphold and strengthen the effort of our past heroes`} />
                <AboutChild type="norms" title={"What we stand for"} content={`
                ONIGEGE ARA -An academic institution, approved by the government and appraised by the people to prepare learners to
                acquire basic training leading to the award of public certificate-FIS, BECE, WASSCE, NECO, JAMB, GCE etc`} />
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