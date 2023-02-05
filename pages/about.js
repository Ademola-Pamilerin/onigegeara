import { Box, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from "@mui/material"
import Image from "next/image"
import HeadComponent from "../components/header/head"
import MainNav from "../components/navigation/main-nav"
import Footer from '../components/footer/footer'
import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import ImagePath from '../static/03.jpeg';
import Word from "../components/UI/words"
import fs from "fs/promises"
import path from 'path'


const AboutPage = ({ word, error: err }) => {
    const [expanded, setExpanded] = useState(false)
    const handleChange = (value, index) => {
        setExpanded(value ? index : false)
    }
    return <Stack>
        <HeadComponent
            title={"About OGAC"}
            content={"Read more about OGAC here, know about our History and Learn more about the school"}
        />
        <Stack sx={{
            margin: "0px 0px 3rem 0px"
        }}>
            <MainNav />
        </Stack >
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
                <Image layout="fill" src={ImagePath} alt={"ONIGEGE ARA OFFICIAL SCHOOL IMAGE"} priority />
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
                {word ? <Word word={word} /> : err ? <Stack>
                    An Error Occured Please Try Again
                </Stack> : <Stack sx={{
                    height: "6rem",
                    justifyContent: "center",
                    alignItems: "center"
                }}><CircularProgress variant={"indeterminate"} /></Stack>}
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

export const getServerSideProps = async () => {
    try {
        const promise = fs.readFile(path.join(process.cwd(), "data", "biography.json"))
        const data = await promise;
        const result = JSON.parse(data)
        return {
            props: {
                word: result.message,
                error: null
            }
        }

    } catch (error) {
        return {
            props: {
                error: error.message,
                word: "null"
            }
        }
    }


}



export default AboutPage