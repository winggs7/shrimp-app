import React from 'react'

export interface Props {
    value: string,
    onHandleChangeStat: Function,
}

export default function ShrimpSelect({ value, onHandleChangeStat }: Props) {
    return (
        <div className="shrimpSelect">
            Pick your favorite flavor:
            <select value={value} onChange={(e) => onHandleChangeStat(e)}>
                <option value="1">pH</option>
                <option value="2">Temperature</option>
            </select>
        </div>
    )
}
