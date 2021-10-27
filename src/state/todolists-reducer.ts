import {filterTypes, TodoListType} from "../App"
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: filterTypes
}

type ActionsType = RemoveTodolistActionType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST' : {
            return [...state, {
                id: v1(),
                filter: 'all',
                title: action.title,
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return {...state}
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return {...state}
        }
        default:
            throw new Error("I dont understand this action type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = ( title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST',title}
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const ChangeTodolistFilterAC = (id: string, filter: filterTypes): ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
