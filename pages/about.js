import { Box, Stack, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import Image from "next/image"
import HeadComponent from "../components/header/head"
import MainNav from "../components/navigation/main-nav"
import ImagePath from '../static/03.jpeg';
import Footer from '../components/footer/footer'
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";


const AboutPage = () => {
    const [expanded, setExpanded] = useState(false)
    const handleChange = (value, index) => {
        setExpanded(value ? index : false)
    }
    return <Stack>
        <HeadComponent
            title={"About OGAC"}
            content={"Read more about OGAC here, know about our History and Learn more about the school"}
        />
        <Stack>
            <MainNav />
        </Stack>
        <Stack sx={{
            width: '100%',
            justifyContent: "center",
            alignItems: "center",
            marginY: "1rem"
        }}>
            <Box sx={{
                position: "relative",
                height: {
                    xs: "30vh",
                    sm: "50vh",
                    md: "25rem",
                    lg: "30rem"
                },
                width: {
                    xs: "50vw",
                    sm: "50vw",
                    md: "24rem",
                    lg: "30rem"
                }
            }}>
                <Image layout="fill" src={ImagePath} alt={"ONIGEGE ARA OFFICIAL SCHOOL IMAGE"} />
            </Box>
        </Stack>
        <Stack sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography sx={{
                fontWeight: "600",
                fontSize: "2rem",
                textAlign: "center",
                width: "100%"
            }}>BIOGRAPHY OF THE SCHOOL</Typography>
            <Typography sx={{
                width: "80%",
                textAlign: "center",
                marginBottom: "1rem",
                fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "1.8rem",
                    lg: "1.5rem"
                },
            }}>
                The idea of establish a school was for the first time in 1987.
                Fund was a big constraint, but planning was on gradually until in 1990 when I obtained government
                form for registration. The form was filled but kept till June 1994,
                when I stood all odds and submitted the form in the ministry of education.
                The school started on October 3rd, 1994 in the town of Ishara,
                then under the Ikene Local Government in a rented apartment in Obalende. The school ran for 2 years
                before securing government approved.
                The nursery was approved on 1st February 1996.In June, 200.
                The school obtained approved for the primary school. The management decided to open a secondary school
                to further assist the community in the area of quality education.
                The Junior Secondary School got government approved in February, 2001 while the senior secondary school was approved in November, 2003.
                The school was given certificate of recognition in the year 2001.
                Being the first registered private school in Remo-North the registration number is OGS/APPSS/RMN/001.
                Onigegeara School is established to cater for the need of
                children in the immediate environment in particular and parent of low  income can access quality education.
                To achieve the land able goal, the fees has been made low to nearest minimum. The school is a blessing to the entire community.
                The note of the school is “learning for life totality”.
                This means that our struggle and target is to produce a complete human being that is academically sound and morally upright.
                The name “Onigegeara” was chosen from a list of suggests
                names, but one paramount consideration was that the name has to be a Yoruba name.
            </Typography>


            <Accordion onChange={(event, isExpanded) => handleChange(isExpanded, "panel1")} expanded={expanded === "panel1"} sx={{
                width: "80%",
                margin: ".5rem 0px",
            }}>
                <AccordionSummary id="school_meaning" aria-controls="meaning_control" expandIcon={<ExpandMore />}>
                    <Typography sx={{
                        fontWeight: {
                            xs: 600,
                            sm: 650,
                            md: 700
                        },
                        fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.3rem"
                        }
                    }}>Onigegeara Meaning</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="list_style">
                        <li style={{
                            fontSize: "1.5rem"
                        }}>Wonderful</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Success Pen</li>
                    </ul>
                </AccordionDetails>
            </Accordion>
            <Accordion onChange={(event, isExpanded) => handleChange(isExpanded, "panel2")} expanded={expanded === "panel2"} sx={{
                width: "80%",
                margin: ".5rem 0px",
            }}>
                <AccordionSummary id="school_meaning" aria-controls="meaning_control" expandIcon={<ExpandMore />}>
                    <Typography sx={{
                        fontWeight: {
                            xs: 600,
                            sm: 650,
                            md: 700
                        },
                        fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.3rem"
                        }
                    }}>Our focus</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="list_style">
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: ".5rem"
                        }}>God</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: ".5rem"
                        }}>Life</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: ".5rem"
                        }}>Posterity</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: ".5rem"
                        }}>Humanity</li>
                    </ul>
                </AccordionDetails>
            </Accordion>
            <Accordion onChange={(event, isExpanded) => handleChange(isExpanded, "panel3")} expanded={expanded === "panel3"} sx={{
                width: "80%",
                margin: ".5rem 0px",
            }}>
                <AccordionSummary id="school_meaning" aria-controls="meaning_control" expandIcon={<ExpandMore />}>
                    <Typography sx={{
                        fontWeight: {
                            xs: 600,
                            sm: 650,
                            md: 700
                        },
                        fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.3rem"
                        }
                    }}>Our Core Values</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="list_style">
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Godliness</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Discipline</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Responsibility</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Patriotism</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Creativity</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Dignity</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Good moral</li>
                        <li style={{
                            fontSize: "1.5rem",
                            marginTop: "1rem"
                        }}>Academic Excellent</li>
                    </ul>
                </AccordionDetails>
            </Accordion>



            <Stack sx={{ width: "100%" }}>
                <Footer />
            </Stack>
        </Stack>
    </Stack>
}

export default AboutPage