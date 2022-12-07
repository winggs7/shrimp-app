import React, { useEffect, useState } from 'react'
import moment from 'moment';

export interface Props {
    crop: any
}

export default function CropInfo({ crop }: Props) {
    const [info, setInfo] = useState<any>([]);

    useEffect(() => {
        if (crop && crop.length > 0) {
            setInfo(crop[0]);
        }
    }, [crop])


    return (
        <div className="cropInfo-comtainer">
            <div className="title">
                Information of crop:
            </div>
            <div className="content-list">
                <div className="content-item">
                    <strong>Type</strong>: {info.type}
                </div>
                <div className="content-item">
                    <strong>Population</strong>: {info.number}
                </div>
                <div className="content-item">
                    <strong>Start</strong>: {moment(info.startDate).format('DD-MM-YYYY')}
                </div>
            </div>
        </div>
    )
}
