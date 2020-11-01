import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                    <IconButton color={"primary"} onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
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
                                <div key={t.id} className={t.isDone ? 'is_done' : ''}>
                                    <Checkbox
                                        onChange={changeStatus}
                                        checked={t.isDone}
                                        color={"primary"}
                                    />
                                    <EditableSpan title={t.title} changeTitle={changeTitle}/>
                                    <IconButton color={"primary"} onClick={removeTask}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Button
                        style={{margin: '1px'}}
                        size={"small"}
                        onClick={onAllClickHandler}
                        color={'primary'}
                        variant={props.filter === 'all' ? "contained" : "outlined"}>All
                    </Button>
                    <Button
                        style={{margin: '1px'}}
                        size={"small"}
                        onClick={onActiveClickHandler}
                        color={'primary'}
                        variant={props.filter === 'active' ? "contained" : "outlined"}>Active
                    </Button>
                    <Button
                        style={{margin: '1px'}}
                        size={"small"}
                        onClick={onCompletedClickHandler}
                        color={'primary'}
                        variant={props.filter === 'completed' ? "contained" : "outlined"}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;