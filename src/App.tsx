import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "GraphQL", isDone: false},
            {id: 5, title: "Rest API", isDone: true}
        ]
    )

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskId: number) {
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

    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                removedTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
