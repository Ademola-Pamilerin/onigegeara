import { Box, Paper, Stack } from "@mui/material"
import ContactPage from "../components/contact/contact-page"
import MeetUs from "../components/contact/meet-us"
import Footer from "../components/footer/footer"
import HeadComponent from "../components/header/head"
import MainNav from "../components/navigation/main-nav"

const Contact = (props) => {

    return <>
        <Stack>
            <HeadComponent
                title={"Onigege Ara Contact Page"}
                content={"This is  the contact page of onigege Ara school, Reach out to ONAG here"} />

            <Stack>
                <MainNav />
            </Stack>
            <Box sx={{
                width: "100%",
                textAlign: "center",
                fontSize: {
                    xs: "2rem",
                    fontWeight: 700,
                    color: "#3d394a"
                }
            }}>
                Our Contact
            </Box>
            <Stack sx={{
                flexFlow: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row"
                },
                width: "100%",
                justifyContent: {
                    xs: "space-evenly",
                    sm: "space-evenly",
                    md: "space-evenly",
                    lg: "space-evenly"
                },
                alignItems: "center",
                height: "auto"
            }}>
                <Paper sx={{
                    height: "auto",
                    boxShadow: ".1px .1px .1px grey",
                    width: "70%",
                    marginTop: "1rem",
                    padding: ".8rem"
                }}>
                    <MeetUs />
                </Paper>
                <Paper sx={{
                    height: "65vh",
                    boxShadow: ".1px .1px .1px grey",
                    width: "70%",
                    marginTop: ".5rem",
                    marginBottom: "1rem",
                    padding: ".8rem"
                }}>
                    <ContactPage />
                </Paper>
            </Stack>
        </Stack>
        <Stack sx={{
            width: "100%"
        }}>
            <Footer />
        </Stack>

    </>
}

export default Contact