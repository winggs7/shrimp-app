import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InformationBar from '../base/InformationBar';
import Weather from '../base/Weather';
import CropComponent from '../base/CropComponent';

export interface Props {
    cropID: string,
    pondID: string,
    crop: object,
    isCropView: boolean,
    onActionForm: Function,
    onOpenWarningDelete: Function,
    onSetCropID: Function,
    onGoIntoCropDetail: Function
}

export default function Manage({ cropID, pondID, crop, isCropView, onActionForm, onOpenWarningDelete, onSetCropID, onGoIntoCropDetail }: Props) {

    const [name, setName] = useState<string>('');

    useEffect(() => {
        const getPonds = async () => {
            try {
                const respone = await axios.get('http://localhost:7000/pond/' + pondID);
                const pond = respone.data;
                setName(pond[0].name);

            } catch (error) {
                console.log(error)
            }
        }

        pondID && getPonds();

    }, [pondID])

    return (
        <>
            <div className="left-side">
                {name ?
                    (
                        <>
                            <div className="pond__name">
                                Pond: {name}
                            </div>
                            <CropComponent
                                cropID={cropID}
                                pondID={pondID}
                                crop={crop}
                                isCropView={isCropView}
                                onActionForm={onActionForm}
                                onOpenWarningDelete={onOpenWarningDelete}
                                onSetCropID={onSetCropID}
                                onGoIntoCropDetail={onGoIntoCropDetail}
                            />
                        </>
                    ) : (
                        <div className="pond__name">
                            Choose pond!
                        </div>
                    )}
            </div>
            <div className="right-side">
                <InformationBar />
                <Weather />
            </div></>
    )
}
