import React, { useState } from 'react'
import ShrimpButton from '../base/ShrimpButton'
import ShrimpInput from '../base/ShrimpInput';
import ShrimpSelect from '../base/ShrimpSelect';

export interface Props {
    onActionForm: Function
}

interface STAT {
    ID: string,
    statFrom: number,
    statTo: number
}

export default function SetStatRange({ onActionForm }: Props) {
    const [stat, setStat] = useState<STAT>({ ID: '1', statFrom: 0.0, statTo: 0.0 });

    const onHandleChangeStat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string = e.target.value;
        setStat({
            ...stat,
            ID: value
        });
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, name?: string) => {
        const value = e.target.value;
        if (name === 'maxstat') {
            setStat({
                ...stat,
                statTo: parseFloat(value)
            });
        } else if (name === 'minstat') {
            setStat({
                ...stat,
                statFrom: parseFloat(value)
            });
        }
    }

    return (
        <div className="form-container">
            <form className='shrimpForm' action="">
                <div className="form__title">
                    Set stat range
                </div>
                <ShrimpSelect
                    value={stat.ID}
                    onHandleChangeStat={onHandleChangeStat}
                />
                <ShrimpInput
                    title={'Min stat'}
                    require={true}
                    name={'minstat'}
                    onChangeInput={onChangeInput}
                />
                <ShrimpInput
                    title={'Max stat'}
                    require={true}
                    name={'maxstat'}
                    onChangeInput={onChangeInput}
                />
                <div className="form__button">
                    <ShrimpButton
                        name={'Accept'}
                        onActionForm={onActionForm}
                        form={'submit'}
                        typeAction={'setstat'}
                        values={stat}
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
