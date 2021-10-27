import React, {ChangeEvent} from 'react';
import {filterTypes} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export type TodolistType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropTypes = {
    id: string,
    title: string,
    data: Array<TodolistType>
    removeTask: (id: string, todolistId: string) => void
    showFilteredTasks: (value: filterTypes, todoListsId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (tId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitleStatus: (tId: string, newTitleValue: string, todolistId: string) => void
    filter: filterTypes
    deleteTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export const Todolist = (props: PropTypes) => {

    const onAllClickHandler = () => {
        props.showFilteredTasks("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.showFilteredTasks("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.showFilteredTasks("completed", props.id)
    }
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.id)
    }
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitleHandler} />
                    <IconButton onClick={deleteTodolistHandler} aria-label="delete"  color="error" size={"small"}>
                        <DeleteIcon />
                    </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {props.data.map(t => {
                        const removeTask = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        }
                        const changeTaskTitleHandler = (newTitleValue: string) => {
                            props.changeTaskTitleStatus(t.id, newTitleValue, props.id);
                        }
                        return (
                            <ListItem key={t.id}>
                                <IconButton onClick={removeTask}  color={"default"} size={"small"}>
                                    <DeleteIcon />
                                </IconButton>
                                <Checkbox onChange={changeTaskStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title}
                                              onChange={changeTaskTitleHandler}/>
                            </ListItem>
                        )
                    }
                )}
            </List>
            <footer>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All</Button>
                <Button color={"warning"} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </footer>
        </div>
    )
}

