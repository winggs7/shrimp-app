import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ShrimpButton from '../base/ShrimpButton'
import ShrimpCheckbox from '../base/ShrimpCheckbox';

export interface Props {
    cropID: string,
    onActionForm: Function
}

export default function AssignStats({ cropID, onActionForm }: Props) {
    const [stats, setStats] = useState([]);
    const [statConfirm, setStatConfirm] = useState<string[]>([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await axios.get("http://localhost:7000/stat");
                response && setStats(response.data);
            } catch (error) {
                console.log(error)
            }
        }

        getStats();
    }, [])

    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        let stats = [...statConfirm];
        const value = e.target.value;
        if (e.target.checked) {
            stats.push(value);
        } else {
            stats = stats.filter((stat) => stat !== value);
        }

        setStatConfirm(stats);
    }

    return (
        <div className="form-container">
            <form className='shrimpForm' action="">
                <div className="form__title">
                    Assign stats
                </div>
                <ShrimpCheckbox
                    stats={stats}
                    onChangeCheckBox={onChangeCheckBox}
                />
                <div className="form__button">
                    <ShrimpButton
                        name={'Accept'}
                        onActionForm={onActionForm}
                        form={'submit'}
                        values={{ cropID, statConfirm }}
                        typeAction={'assignstat'}
                    />
                    <ShrimpButton
                        name={'cancel'}
                        onActionForm={onActionForm}
                        form={''}
                        type={'error'}
                    />
                </div>
            </form>
        </div>
    )
}
