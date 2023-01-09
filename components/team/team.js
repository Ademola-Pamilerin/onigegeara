import { Box, Stack, Typography } from "@mui/material"
import { Fragment } from "react"
import { colors } from "../../util/them"
import TeamMember from "./team-member"

const Team = () => {

    const TeamMembers = [
        { src: require("../../static/avatar.jpg"), btn: "Contact", alt: "Prince Abayomi", name: "Prince Abayomi Adebayo Olusegun", role: "Proprietor" },
        { src: require("../../static/avatar.jpg"), btn: "Contact", alt: "Wahab Akeem Abayomi", name: "Wahab Akeem Abayomi", role: "Principal" },
        { src: require("../../static/avatar.jpg"), btn: "Contact", alt: "Abosede Abodurin", name: "Abayomi Abosede Abodunrin", role: "Academic Supervisor" }
    ]

    return <Stack sx={{
        width: "100%",
        height: "auto",
        backgroundColor: colors.backgroun_color
    }}>
        <Typography sx={{
            width: "100%",
            textDecoration: "underline",
            fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.5rem",
                lg: "1.4rem"

            },
            fontWeight: '700',
            color: colors.side_blue_brown,
            textAlign: "center",
        }}>
            MEET OUR ADMINISTRATIVE TEAM
        </Typography>
        <Stack sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexFlow: {
                xs:"column",
                sm:"row",
            },
            // padding: "0px 10px",
            flex: 12
        }}>
            {TeamMembers.map((el, i) => (

                <TeamMember role={el.role} name={el.name} src={el.src} alt={"team member photo"} btn={el.btn} key={i} />

            ))}
        </Stack>
    </Stack>
}

export default Team