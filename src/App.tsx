import React, {useState} from 'react';
import './App.css';
import {Todolist, } from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type filterTypes = "all" | "active" | "completed"
export type TodoListType = {
    id: string,
    title: string,
    filter: filterTypes
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let newTasks = tasksObj[todolistId]
        let filteredTasks = newTasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitleStatus(taskId: string, title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasksObj})
        }
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function addTodolist(title: string) {
        let newTodolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title
        }
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasksObj, [newTodolist.id]: []})
    }

    function showFilteredTasks(value: filterTypes, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function deleteTodolist(todolistId: string) {
        let filteredTodolists = todoLists.filter(tl => tl.id !== todolistId)
        setTodoLists(filteredTodolists)

        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(id: string, title: string) {
        let todolist = todoLists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = title
            setTodoLists([...todoLists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Css", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Coffee", isDone: true},
            {id: v1(), title: "Sugar", isDone: false}
        ]
    })

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                                let filteredTasks = tasksObj[tl.id];
                                if (tl.filter === "completed") {
                                    filteredTasks = filteredTasks.filter(t => t.isDone)
                                }
                                if (tl.filter === "active") {
                                    filteredTasks = filteredTasks.filter(t => !t.isDone)
                                }

                                return <Grid item>
                                    <Paper style={{ padding: "15px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            data={filteredTasks}
                                            removeTask={removeTask}
                                            showFilteredTasks={showFilteredTasks}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            deleteTodolist={deleteTodolist}
                                            changeTaskTitleStatus={changeTaskTitleStatus}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            }
                        )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;