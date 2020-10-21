import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removedTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

function ToDoList(props: PropsType) {


    // Handlers
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {props.changeTodoListTitle(props.id, title)}

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <button onClick={() => {props.removeTodoList(props.id)}}>X</button>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {
                        props.tasks.map(t => {
                            const removeTask = () => {
                                props.removedTask(t.id, props.id)
                            }
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const changeTitle = (title: string) => {
                                props.changeTaskTitle(t.id, title, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is_done' : ''}>
                                    <input type="checkbox" checked={t.isDone} onChange={changeStatus}/>
                                    {/*<span>{t.title}</span>*/}
                                    <EditableSpan title={t.title} changeTitle={changeTitle}/>
                                    <button onClick={removeTask}>X</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'active_filter' : ''}
                        onClick={onAllClickHandler}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? 'active_filter' : ''}
                        onClick={onActiveClickHandler}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? 'active_filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;