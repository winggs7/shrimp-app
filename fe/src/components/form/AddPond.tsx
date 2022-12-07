import React, { useState } from 'react'
import ShrimpButton from '../base/ShrimpButton'
import ShrimpInput from '../base/ShrimpInput'

export interface Props {
    onActionForm: Function
}

interface Pond {
    name: string,
    area: number,
    deep: number
}

export default function AddPond({ onActionForm }: Props) {
    const [pond, setPond] = useState<Pond>({ name: '', area: 0.0, deep: 0.0 });

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, name?: string) => {
        const value = e.target.value;
        if (name === 'name') {
            setPond({
                ...pond,
                name: value
            });
        } else if (name === 'area') {
            setPond({
                ...pond,
                area: parseFloat(value)
            });
        } else if (name === 'deep') {
            setPond({
                ...pond,
                deep: parseFloat(value)
            });
        }
    }

    return (
        <div className="form-container">
            <form className='shrimpForm' action="">
                <div className="form__title">
                    Add new pond
                </div>
                <ShrimpInput
                    title={'Name'}
                    require={true}
                    name={'name'}
                    onChangeInput={onChangeInput}
                />
                <ShrimpInput
                    title={'Area'}
                    require={true}
                    name={'area'}
                    onChangeInput={onChangeInput}
                />
                <ShrimpInput
                    title={'Deep'}
                    require={true}
                    name={'deep'}
                    onChangeInput={onChangeInput}
                />
                <div className="form__button">
                    <ShrimpButton
                        name={'Accept'}
                        onActionForm={onActionForm}
                        form={'submit'}
                        values={pond}
                        typeAction={'addpond'}
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
