import React, {ChangeEvent, KeyboardEvent} from "react";


type PropsType = {
    title: string
    setTitle: (title: string) => void
    callBack: ()=>void
    className: string
    setError: ()=>void

}

export const Input = (props: PropsType) => {
    const newTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const newTitleOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            props.setError();
            props.callBack()
            props.setTitle('');
        }
    }
    return <div>
        <input value={props.title} onChange={newTitleOnChangeHandler}
               onKeyPress={newTitleOnEnterHandler}
        />
    </div>
}