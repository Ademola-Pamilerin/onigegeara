import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { question_action } from "../../store/question"

const ExamOptions = (props) => {

    const question_details = useSelector(state => state.question)

    const [value, setValue] = useState(question_details.my_answer)
    const dispatch = useDispatch()
    const handleChange = (event, updated) => {
        setValue(updated)
        dispatch(question_action.chooseAnswer(updated))
    }


    return <Stack direction={"column"} sx={{
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0px"
    }}>
        <ToggleButtonGroup
            value={value}
            onChange={handleChange}
            orientation={"vertical"}
            size={"large"}
            exclusive
            sx={{
                width: "80%",
                marginY: "1rem"
            }}>
            {props.answers.map(el => <ToggleButton
                key={el}
                value={el} sx={{
                    fontSize: "1.5rem",
                    fontWeight: "800"
                }}>
                {el}
            </ToggleButton>
            
            )}
        </ToggleButtonGroup>
    </Stack>
}
export default ExamOptions