import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "Rest API", isDone: true}
        ]
    )

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskId: string) {
        tasks = tasks.filter(t => t.id !== taskId)
        setTasks(tasks)
    }

    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function addTask(title: string) {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                removedTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
            />
        </div>
    )
}

export default App;
