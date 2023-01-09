import { Snackbar, Button, Alert } from '@mui/material'
import { useRef, forwardRef } from 'react'

const SnackbarAlert = forwardRef(
    function SnackbarAlert(props, ref) {
        return <Alert elevation={6} ref={ref} {...props} />
    }
)


const SnackBarComponent = (props) => {
    const handleClose = () => {
        props.close()
    }
    return <Snackbar open={props.open} autoHideDuration={props.duration} onClose={handleClose} anchorOrigin={props.anchor}>
        <SnackbarAlert onClose={handleClose} severity={props.type} >
            {props.message}
        </SnackbarAlert>
    </Snackbar>
}
export default SnackBarComponent