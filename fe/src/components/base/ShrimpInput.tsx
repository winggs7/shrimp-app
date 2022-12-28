import React from 'react'

export interface Props {
    title: string,
    require: boolean,
    name?: string,
    value?: string | number,
    onChangeInput: Function
}

export default function ShrimpInput({ title, require, name, value, onChangeInput }: Props) {

    return (
        <div className="shrimpInput">
            <div className="input__title">
                {title}
            </div>
            <input
                type="text"
                required={require}
                value={value}
                onChange={(e) => onChangeInput(e, name)}
            />
        </div>
    )
}
