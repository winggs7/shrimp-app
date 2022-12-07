import React from 'react'
import ShrimpButton from '../base/ShrimpButton'

export interface Props {
    onActionForm: Function
}

export default function Setting({ onActionForm }: Props) {
    return (
        <>
            <ShrimpButton form={'setstat'} name={'set start'} onActionForm={onActionForm} />
        </>
    )
}
