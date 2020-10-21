import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: "all"},
        {id: todoListId2, title: 'What to buy', filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "Rest API", isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Potato", isDone: false},
        ]
    })

    function removeTask(taskId: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const todoList = tasks[todoListId]
        const newTodoList = todoList.map(task => {
            if (task.id === taskId) {
                return {...task, isDone: isDone}
            }
            return task
        })
        tasks[todoListId] = newTodoList
        setTasks({...tasks})
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const todoList = tasks[todoListId]
        const newTodoList = todoList.map(task => {
            if (task.id === taskId) {
                return {...task, title: title}
            }
            return task
        })
        tasks[todoListId] = newTodoList
        setTasks({...tasks})
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId, title: title, filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    function changeTodoListTitle (todoListID: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <ToDoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removedTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    )
}

export default App;
