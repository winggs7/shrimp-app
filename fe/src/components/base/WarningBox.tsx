import React from 'react'

export interface Props {
    info: any,
    onDeleteValue: Function
}

export default function WarningBox({ info, onDeleteValue }: Props) {
    return (
        <div className="warning-box">
            <div className="content">
                Are you sure to delete this item(s)?
                <div className="btn-container">
                    <button className={'shrimp-button delete'} onClick={() => { onDeleteValue(info.action, info.id) }}>Delete</button>
                    <button className={'shrimp-button'} onClick={() => { onDeleteValue('cancel') }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
