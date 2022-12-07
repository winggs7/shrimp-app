import React from 'react'

export interface Props {
    title: string,
    require: boolean,
    name?: string,
    onChangeInput: Function
}

export default function ShrimpInput({ title, require, name, onChangeInput }: Props) {

    return (
        <div className="shrimpInput">
            <div className="input__title">
                {title}
            </div>
            <input
                type="text"
                required={require}
                onChange={(e) => onChangeInput(e, name)}
            />
        </div>
    )
}
