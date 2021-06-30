import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TodolistActions, RemoveTodoListActionType, AddTodoListActionType} from "./todolist-reducer";

export enum TaskActions {
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
}

export type RemoveTaskActionType = {
    type: TaskActions.REMOVE_TASK,
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: TaskActions.ADD_TASK
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: TaskActions.CHANGE_TASK_STATUS
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: TaskActions.CHANGE_TASK_TITLE
    taskId: string
    title: string
    todoListId: string
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | RemoveTodoListActionType | AddTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case TaskActions.REMOVE_TASK: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        }

        case TaskActions.ADD_TASK: {
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }

        case TaskActions.CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => {
                        if (task.id === action.taskId) {
                            return {...task, isDone: action.isDone}
                        } else
                            return task
                    })
            }
        }

        case TaskActions.CHANGE_TASK_TITLE: {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(task => {
                        if (task.id === action.taskId) {
                            return {...task, title: action.title}
                        } else
                            return task
                    })
            }
        }

        case TodolistActions.ADD_TODOLIST: {
            return {
                ...state,
                [action.todolistId]: []
            }
        }

        case TodolistActions.REMOVE_TODOLIST: {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error('Incorrect type of action')
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: TaskActions.REMOVE_TASK, taskId, todoListId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: TaskActions.ADD_TASK, title, todoListId: todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean,
                                   todoListId: string): ChangeTaskStatusActionType => {
    return {type: TaskActions.CHANGE_TASK_STATUS, taskId, isDone, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: TaskActions.CHANGE_TASK_TITLE, taskId, title, todoListId}
}