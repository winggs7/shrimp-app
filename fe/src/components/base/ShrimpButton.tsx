import React from 'react'

export interface Props {
    form: string,
    name?: string,
    type?: string,
    onActionForm: Function,
    values?: any,
    typeAction?: string,
    options?: any
}

export default function ShrimpButton({ form, name, onActionForm, type, values, typeAction, options }: Props) {

    return (
        <button
            className={`shrimp-button ${type === 'error' && 'error'}`}
            onClick={(e) => { onActionForm(e, form, values, typeAction) }}
            type={form === 'submit' ? 'submit' : 'reset'}
        >
            {name}
        </button>
    )
}
