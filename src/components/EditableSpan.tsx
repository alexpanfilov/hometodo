import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editStatus, setEditStatus] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditStatus(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditStatus(false)
        props.onChange(title);
    }
    const changeTitleHandler =
        (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        editStatus
            ? <TextField onBlur={activateViewMode}
                         onChange={changeTitleHandler}
                         value={title}
                         size={"small"}
                         autoFocus />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

