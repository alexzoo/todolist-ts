import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export enum TodolistActions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
}

export type RemoveTodoListActionType = {
    type: TodolistActions.REMOVE_TODOLIST,
    id: string
}

export type AddTodoListActionType = {
    type: TodolistActions.ADD_TODOLIST,
    title: string
    todolistId: string
}

export type ChangeTodoListTitleActionType = {
    type: TodolistActions.CHANGE_TODOLIST_TITLE
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: TodolistActions.CHANGE_TODOLIST_FILTER
    id: string
    filter: FilterValuesType
}

type ActionTypes = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case TodolistActions.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)

        case TodolistActions.ADD_TODOLIST:
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]

        case TodolistActions.CHANGE_TODOLIST_FILTER:
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]

        case TodolistActions.CHANGE_TODOLIST_TITLE:
            const todolist1 = state.find(tl => tl.id === action.id)
            if (todolist1) {
                todolist1.title = action.title
            }
            return [...state]
        default:
            throw new Error('Incorrect type of action')
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: TodolistActions.REMOVE_TODOLIST, id: todolistId}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: TodolistActions.ADD_TODOLIST, title: title, todolistId: v1()}
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: TodolistActions.CHANGE_TODOLIST_FILTER, filter: filter, id: todolistId}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: TodolistActions.CHANGE_TODOLIST_TITLE, id: todolistId, title: title}
}