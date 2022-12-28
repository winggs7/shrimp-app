import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import moment from 'moment'

export interface Props {
    ID: string,
    name: string,
    area: number,
    deep: number,
    startDate: Date,
    onChangeNav: Function
}

export const getDiffDate = (startDate: Date) => {
    const start = moment(startDate);
    const now = moment(new Date());

    const diffDate = moment.duration(now.diff(start));
    let text = '';
    if (diffDate.asDays() < 1) {
        text += 'today';
    } else if (diffDate.asDays() > 31) {
        text += Math.floor(diffDate.asMonths()) + ' month(s)';
    } else if (diffDate.asMonths() > 12) {
        text += Math.floor(diffDate.asYears()) + ' year(s)';
    } else {
        text += Math.floor(diffDate.asDays()) + ' day(s)';
    }

    return text;
}

export default function PondItem({ ID, name, area, deep, startDate, onChangeNav }: Props) {

    return (
        <div className='pond-item' onClick={() => { onChangeNav('manage', ID) }}>
            <div className="name">
                {name}
            </div>
            <div className="content">
                Last {getDiffDate(startDate)}
            </div>
            <div className="content">
                Area: {area} km
            </div>
            <div className="content">
                Deep: {deep} km<sup>2</sup>
            </div>
            <div className="link">
                Go to detail
                <FontAwesomeIcon icon={solid('chevron-right')} />
            </div>
        </div>
    )
}
