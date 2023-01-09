import SignIn from "../../../components/teacher/sign-in"
import { Stack, Box, Paper } from '@mui/material'
import HeadComponent from '../../../components/header/head'
import MainNav from "../../../components/navigation/main-nav"
import { colors } from '../../../util/them'
import AdminSignIn from "../../../components/admin/sign-in"

const Teacher_Auth = (props) => {


    return (<Stack sx={{
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }}>
        <HeadComponent
            content={"This is the official Onigege Ara Adminstration login page"}
            title={"OGAC Administratin Authorization"}
        />
        <MainNav />
        <Stack sx={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Stack
                sx={{
                    flexFlow: "row",
                    backgroundColor: colors.side_blue,
                    height: "10vh",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    color: "white",
                    padding: "1rem 2rem",
                    fontWeight: 700,
                    margin: "1rem 0px",
                    borderRadius: "25px",
                    width: "80%"
                }}
            >
                <span
                    style={{
                        fontSize: "2rem", cursor: "pointer", color: "rgba(255, 122, 0, 1)",
                        '&:hover': {
                            color: "white"
                        }
                    }}>ADMINISTRATION SIGN IN</span>
            </Stack>
            <Stack sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundImage: "url(../../static/ogac-1.png)",
                backgroundSize: " cover",
                backgroundPosition: "top left",
                padding: "2rem 0",
                margin: "1rem 0"
            }}>
                <AdminSignIn/>
            </Stack>
        </Stack>
    </Stack>
    )
}

export default Teacher_Auth