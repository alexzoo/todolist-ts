import React, {useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removedTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

function ToDoList(props: PropsType) {
    let [title, setTitle] = useState<string>('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onChange={(e) => {setTitle(e.currentTarget.value)}}
                        onKeyPress={(e) => {if(e.key === 'Enter'){addTask()}}}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <button onClick={() => {props.removedTask(t.id)}}>X</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <div>
                    <button onClick={() => {props.changeFilter('all')}}>All</button>
                    <button onClick={() => {props.changeFilter('active')}}>Active</button>
                    <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;