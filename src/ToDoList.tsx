import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removedTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

function ToDoList(props: PropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3><button onClick={() => {props.removeTodoList(props.id)}}>X</button>
                <div>
                    <input
                        value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={'error_message'}>{error}</div>}
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const removeTask = () => {
                                props.removedTask(t.id, props.id)
                            }
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is_done' : ''}>
                                    <input type="checkbox" checked={t.isDone} onChange={changeStatus}/>
                                    <span>{t.title}</span>
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