import { Stack, Box, Button, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import { colors } from '../../util/them'

const CardEvent = (props) => (
    <Paper sx={{
        height: {
            xs: "14rem",
            sm: "20rem",
            md: "25rem",
            lg: "20rem"
        },
        width: "80%",
        marginY: "20px",
        display: "flex",
        flexFlow: "column",
        flex: 12
    }}>
        <Stack sx={{
            width: "100%",
            justifyContent: "center",
            height: {
                xs: "50%",
                sm: "70%",
                md: "70%",
                lg: "60%"
            },
            alignItem: "center",
            
        }}>
            <Box sx={{
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "100%"
                },
                height: "100%",
                position: "relative",
                marginBottom: "10px",
            }}>
                <Image src={props.src} alt={props.alt} layout="fill" objectFit='cover' objectPosition="top center" />
            </Box>
        </Stack>
        <Box sx={{
            width: "100%",
            textAlign: "left",
            paddingX: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography sx={{
                width: "95%",
                fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                    md: "1.3rem",
                    lg: "1.5rem"
                },
                fontWeight: "600",
                marginBottom: "10px"
            }}>
                {props.content.length > 20 ? `${props.content.slice(0, 40)} ....` : props.content}
            </Typography>
        </Box>
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: 'relative',
            height: 'auto'
        }}>
            <Button variant={"contained"} sx={{
                width: {
                    xs: "50%",
                    sm: "30%",
                    md: "50%",
                    lg: "12rem"
                },
                fontSize: {
                    xs: ".5rem",
                    sm: "1rem",
                    md: "1rem",
                    lg: "1.5rem"
                },
                position: "absolute",
                marginRight: '10px',
                borderRadius: "20px",
                fontWeight: 700,
                backgroundColor: colors.side_blue,
                ...props.styles
                // top: {
                //     xs: "20px",
                //     sm: "10px",
                //     md: "20px",
                //     lg: "30px"
                // }

            }}>
                {props.btn}
            </Button>
        </Box>
    </Paper>
)

export default CardEvent