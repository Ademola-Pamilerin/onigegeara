import { Stack, Paper, Typography, Breadcrumbs, Link } from "@mui/material"
import NewExamComponent from "../../../components/exam/new-exam"
import Teacher from "../../../components/UI/teacher"
import { colors } from "../../../util/them"
import { useRouter } from "next/router"

const NewExam = () => {
    const router = useRouter()
    return (<>
        <Teacher>
            <Stack sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <Breadcrumbs separator=">" sx={{
                    position: "absolute",
                    top: 20,
                    left: 30
                }}>
                    <span onClick={() => router.push("/teacher/dashboard")} underline="hover">Home</span>
                    <Typography>New Exam</Typography>
                </Breadcrumbs>
                <Paper sx={{
                    width: "70%",
                    height: "auto",
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "column"
                }}>
                    <Typography sx={{
                        fontSize: "3rem",
                        fontWeight: 750,
                        color: colors.side_blue_brown
                    }}>Create New Exam</Typography>
                    <NewExamComponent />
                </Paper>
            </Stack>
        </Teacher>
    </>)
}

export default NewExam