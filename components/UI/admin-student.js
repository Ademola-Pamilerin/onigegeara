import { Button, Dialog, DialogActions, DialogContent, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllStudent } from "../../store/admin-slice"
import { request_url } from "../../util/base-url"
import UpdateStudent from "../student/edit-field"
import SnackBarComponent from "./error"

const AdminStudentCard = (props) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const { token, refreshToken, id } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [error, showErr] = useState(false)
    const [totalError, setTotalError] = useState(null)
    const dispatch = useDispatch()
    const [showMessage, setShowMessage] = useState(false)
    const [editDialog, setEditDialog] = useState(false)
    const deletStudent = () => {
        setShowDeleteDialog(true)
    }

    const confirm = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${request_url}/user/std/delete/${props.id}`, {
                method: "Delete",
                headers: {
                    "Authorization": token,
                    "RefreshToken": refreshToken,
                    "Id": id,
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                const err = await response.json();
                if (!err) {
                    throw new Error("Request failed!");
                } else if (err.message === "Failed to fetch") {
                    throw new Error("Please check you internet connection");
                }
                else {
                    throw new Error(err.message);
                }
            }
            const values = await response.json()
            localStorage.setItem("Token", values.token)
            localStorage.setItem("Refresh_Token", values.refresh_token)
            localStorage.setItem("Id", id)
            setLoading(false)
            setTotalError(null)
            showErr(false)
            dispatch(getAllStudent({
                id, token, refreshToken, page: props.page
            }))
            setShowMessage(true)
        }
        catch (errorval) {
            setLoading(false)
            setTotalError(errorval.message)
            showErr(true)
        }
    }

    const editDetails = () => {
        setEditDialog(true)
    }



    return (
        <>
            <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <DialogContent>Are you sure you want to delete {props.firstname + " " + props.lastname} details</DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={confirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
                <UpdateStudent {...props} />
            </Dialog>
            <SnackBarComponent
                message={totalError}
                close={() => showErr(false)}
                open={error}
                type={"error"}
                duration={10000}
            />
            <SnackBarComponent
                message={"Successfully deleted " + props.firstname + " " + props.lastname}
                close={() => setShowMessage(false)}
                open={showMessage}
                type={"success"}
                duration={1000}
            />
      
            <Paper sx={{
                boxShadow: ".1px .1px .1px 1px grey",
                padding: "1rem",
                display: "flex",
                flexFlow: "column",
                width: "80%",
                padding: "1rem 0px",
                margin: "1rem 0px",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <Typography sx={{
                    textAlign: "center"
                }}>Student Name: {props.firstname + " " + props.lastname}</Typography>

                <Typography sx={{
                    textAlign: "center"
                }}>Student Class: {props.class}</Typography>

                <Typography sx={{
                    textAlign: "center"
                }}>Student Reg No: {props.regNo}</Typography>


                <Stack sx={{
                    justifyContent: "space-evenly",
                    flexFlow: "row",
                    width: "90%"
                }}>
                    <Button variant={"contained"} onClick={editDetails}>
                        Edit Details
                    </Button>
                    <Button variant={"contained"} onClick={deletStudent}>
                        Delete Student
                    </Button>
                </Stack>
            </Paper >
        </>
    )
}
export default AdminStudentCard