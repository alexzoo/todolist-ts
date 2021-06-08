import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export enum Actions {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
    CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
    CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
}

export type RemoveTodoListActionType = {
    type: Actions.REMOVE_TODOLIST,
    id: string
}

export type AddTodoListActionType = {
    type: Actions.ADD_TODOLIST,
    title: string
}

export type ChangeTodoListTitleActionType = {
    type: Actions.CHANGE_TODOLIST_TITLE
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: Actions.CHANGE_TODOLIST_FILTER
    id: string
    filter: FilterValuesType
}

type ActionTypes = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case Actions.REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)

        case Actions.ADD_TODOLIST:
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]

        case Actions.CHANGE_TODOLIST_FILTER:
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]

        case Actions.CHANGE_TODOLIST_TITLE:
            const todolist1 = state.find(tl => tl.id === action.id)
            if (todolist1) {
                todolist1.title = action.title
            }
            return [...state]
        default:
            throw new Error('Incorrect type of action')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: Actions.REMOVE_TODOLIST, id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
    return {type: Actions.ADD_TODOLIST, title: title}
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: Actions.CHANGE_TODOLIST_FILTER, filter: filter, id: todolistId}
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {type: Actions.CHANGE_TODOLIST_TITLE, id: todolistId, title: title}
}