import React, { useState, useEffect } from 'react'
import ShrimpButton from '../base/ShrimpButton'
import ShrimpInput from '../base/ShrimpInput'

export interface Props {
    pondID: string,
    onActionForm: Function
}

interface Crop {
    pondID: string,
    type: string,
    number: number
}

export default function AddCrop({ pondID, onActionForm }: Props) {
    const [id, setId] = useState('');
    const [crop, setCrop] = useState<Crop>({ pondID: '', type: '', number: 0.0 });

    useEffect(() => {
        setId(pondID);
        setCrop({ ...crop, pondID })
    }, [id])


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, name?: string) => {
        const value = e.target.value;
        if (name === 'type') {
            setCrop({
                ...crop,
                type: value
            });
        } else if (name === 'number') {
            setCrop({
                ...crop,
                number: parseFloat(value)
            });
        }
    }

    return (
        <div className="form-container">
            <form className='shrimpForm' action="">
                <div className="form__title">
                    Add new crop
                </div>
                <ShrimpInput
                    title={'Type'}
                    require={true}
                    name={'type'}
                    onChangeInput={onChangeInput}
                />
                <ShrimpInput
                    title={'Population'}
                    require={true}
                    name={'number'}
                    onChangeInput={onChangeInput}
                />
                <div className="form__button">
                    <ShrimpButton
                        name={'Accept'}
                        onActionForm={onActionForm}
                        form={'submit'}
                        values={crop}
                        typeAction={'addcrop'}
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
