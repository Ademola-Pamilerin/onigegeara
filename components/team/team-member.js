import { Avatar, Box, Button, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { colors } from "../../util/them"
import CardEvent from "../event/card-event"

const TeamMember = ({ name, role, src, alt }) => {
    return <Stack sx={{
        width: {
            xs: "80%",
            sm: "95%",
            md: "90%",
            lg: '100%'
        },
        // flex: "3",
        height: {
            xs: "15rem",
            sm: "20rem",
            md: "20rem",
            lg: "30rem"
        },
        flexFlow: "column",
        justifyContent: {
            xs: "space-evenly",
            sm: "center"
        },
        alignItems: "center",
        marginY: "5px",
        boxShadow: ".1px .1px .1px 1px " + colors.middle_grey,
        overflow: "hidden",
        padding: 0

    }}>
        <Box sx={{
            width: "70%",
            height: "50%",
            display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "flex"
            },
            position: "relative",
            justifyContent: "center",
        }}>
            <Image layout="fill" src={src} alt={alt} />
        </Box>
        <Box sx={{
            width: "100%",
            height: "30%",
            // backgroundColor: colors.admin_background,
            position: "relative",
            display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "flex"
            },
            flexFlow: "column",
            backgroundImage: "url(../../static/ogac-1.png)",
            justifyContent: "center"
        }}>
            <Typography sx={{
                width: "100%",
                fontSize: {
                    xs: ".8rem",
                    sm: "1rem",
                    md: "1.2rem",
                    lg: "1.2rem"
                },
                textAlign: "center"
            }}>
                Name: {name}
            </Typography>
            <Typography sx={{
                width: "100%",
                textAlign: "center",
                fontSize: {
                    xs: ".8rem",
                    sm: "1rem",
                    md: "1.2rem",
                    lg: "1.2rem"
                },
                display: "block"
            }}>
                Role: {role}
            </Typography>

        </Box>
        {/* <Box className="no-display" sx={{
            display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none"
            },
            width: {
                xs: "80%",
                sm: "50%"
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CardEvent src={src} content={content} alt={""} styles={{
                top: {
                    xs: "18px",
                    sm: "8px"
                }
            }} />
        </Box> */}
    </Stack>
}

export default TeamMember