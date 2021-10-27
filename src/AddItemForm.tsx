import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, TextField} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

type AddItemFormType = {
    addItem: (title: string) => void

}
export const AddItemForm = (props: AddItemFormType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const newTitleOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem();
        }
    }

    const newTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    return (
        <div>

            <TextField value={title}
                       onChange={newTitleOnChangeHandler}
                       onKeyPress={newTitleOnEnterHandler}
                       size={"small"}
                       label={"Add task"}
                       error={!!error}
                       helperText={error}
            >
            </TextField>

            <IconButton onClick={addItem}  color="success" size={"small"}>
                <AddRoundedIcon />
            </IconButton>
           {/* {error && <div className="errorMessage">{error}</div>}*/}
        </div>
    )
}