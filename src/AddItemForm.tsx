import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onItemKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddItemClick()
        }
    }

    const onAddItemClick = () => {
        let trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required.')
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                variant={'outlined'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onItemKeyPress}
                error={!!error} // error={Boolean(error)}
                label={'Title'}
                helperText={error}
            />
            <IconButton
                color={"primary"}
                onClick={onAddItemClick}>
                <AddBox/>
            </IconButton>
        </div>
    )
}