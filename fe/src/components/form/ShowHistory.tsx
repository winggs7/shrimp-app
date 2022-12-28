import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ShrimpButton from '../base/ShrimpButton'
import moment from 'moment';
import DeleteButton from '../base/DeleteButton';

export interface Props {
    cropID: string,
    onActionForm: Function,
    onOpenWarningDelete: Function
}

export default function ShowHistory({ cropID, onActionForm, onOpenWarningDelete }: Props) {
    const [histories, setHistories] = useState<any[]>([]);

    const stat_array = ['pH', 'Temperature'];

    useEffect(() => {

        const getHistory = async () => {
            const response = await axios.get("http://localhost:7000/crop/history/all/" + cropID);
            response && setHistories(response.data);
        }

        getHistory();
    }, [cropID])


    return (
        <div className="form-container history">
            <div className='shrimpForm'>
                <div className="form__title">
                    Histories (Danger)
                </div>
                <div className="form__button">
                    <ShrimpButton
                        name={'Close'}
                        onActionForm={onActionForm}
                        form={''}
                        type={'error'}
                    />
                    <DeleteButton
                        onOpenWarningDelete={onOpenWarningDelete}
                        id={cropID}
                        action={"deleteHistory"}
                        name={"histories"}
                    />
                </div>
                <div className="history-container">
                    {histories && histories.map((history: any, id: any) => {
                        return (<div key={id} className="history-item">
                            <div className="date">
                                Date: {moment(history['history_date']).format('DD-MM-YYYY HH:mm:ss')}
                            </div>
                            <div className="type">
                                Type: {stat_array[history['statID'] - 1]}
                            </div>
                            <div className="number">
                                Index: {history['num_stat']}
                            </div>
                            <div className="desc">
                                Description: {history['description']}
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        </div>
    )
}
