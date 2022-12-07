import React from 'react'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDiffDate } from './PondItem'

export interface Props {
    ID: string,
    index: number,
    type: string,
    number: number,
    startDate: Date,
    onGoIntoCropDetail: Function,
}

export default function CropItem({ ID, index, type, number, startDate, onGoIntoCropDetail }: Props) {

    return (
        <div className='crop-item' onClick={() => { onGoIntoCropDetail(ID); }}>
            <div className="name">
                {index}.
            </div>
            <div className="content">
                Type: {type}
            </div>
            <div className="content">
                Population: {number}
            </div>
            <div className="content">
                Last: {getDiffDate(startDate)}
            </div>
            <div className="link">
                Go to detail
                <FontAwesomeIcon icon={solid('chevron-right')} />
            </div>
        </div>
    )
}
