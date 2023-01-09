import { Box, Button, Stack, Typography } from "@mui/material"
import { colors } from "../../util/them"

const AboutChild = ({ increase_box, btn, title, content, type }) => {
    return <Box sx={{
        width: {
            xs: "100%",
            sm: "100%",
            md: '80%',
            lg: increase_box ? "55%" : "40%"
        },
        paddingX: "10px",
        lineHeight: "1rem",
        wordSpacing: "-3px",
        justifyContent: "center",
        alignItems: "center",
        margin: {
            xs: "10px 0px"
        },
    }}>

        <Stack sx={{
            width: "100%",
            display: "flex",
            padding: {
                xs: "0",
                sm: "0",
                md: '10px 1rem',
                lg: " "
            },
            flexFlow: "column",
            justifyContent: "center",
            alignItems: {
                xs: "center"
            },
            height: "auto"
        }}>
            <Typography sx={{
                display: "flex",
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: {
                    xs: "1.3rem",
                    sm: "1.7rem",
                    md: "2rem",
                    lg: "2.5rem"
                },
                fontWeight: {
                    xs: "800",
                    md: "600",
                    lg: "700"
                },
                color: colors.side_blue_brown,
                width: {
                    xs: "100%",
                    lg: "100%"
                },
                height: "auto",
                justifyContent: "center",
                alignItems: "center",
                letterSpacing: {
                    xs: "6px",
                    sm: "8px"
                }
            }}>
                {title}
            </Typography>
            <Stack sx={{
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.backgroun_color,
                boxShadow: ".1px .1px .1px 1px " + colors.backgroun_color,
                height: "auto",
                padding: {
                    xs: "1rem 0px"
                }
            }}>
                {
                    type == "norms" ? (<Typography sx={{
                        margin: "5px",
                        padding: {
                            xs: 0
                        },
                        fontSize: {
                            xs: "1rem",
                            sm: "1.5rem",
                            md: "1.8rem",
                            lg: "1.5rem"
                        },
                        width: "90%",
                        fontWeight: {
                            xs: "200",
                            md: "200",
                            lg: "1.5rem"
                        },
                        letterSpacing: {
                            xs: ".5px"
                        },
                        textAlign: "center"
                    }}>
                        {content}
                    </Typography>) :
                        <Stack s={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "center"
                        }}>
                            {content}
                        </Stack>

                }
                {btn && <Stack sx={{
                    width: "90%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingLeft: "10px",
                    marginBottom: "10px"
                }}>
                    <Button variant="contained" sx={{
                        backgroundColor: colors.side_blue,
                        color: colors.backgroun_color,
                        borderRadius: "20px",
                        fontSize: {
                            xs: "1rem",
                            md: "1.5rem"
                        },
                        '&:hover': {
                            backgroundColor: colors.backgroun_color,
                            color: colors.side_blue,
                            borderRadius: "20px",
                            fontSize: {
                                xs: "1rem",
                                md: "1.5rem"
                            }
                        },
                        fontWeight: 700
                    }} >{btn}</Button>
                </Stack>}
            </Stack>
        </Stack>
    </Box >
}

export default AboutChild