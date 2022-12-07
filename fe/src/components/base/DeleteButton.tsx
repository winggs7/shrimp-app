import React from 'react'

export interface Props {
    id: string,
    action: string,
    name: string,
    onOpenWarningDelete: Function
}

export default function DeleteButton({ id, name, action, onOpenWarningDelete }: Props) {
    return (
        <div className="">
            <button className='shrimp-button delete' onClick={() => onOpenWarningDelete(action, id)}>
                Delete {name}
            </button>
        </div>
    )
}
