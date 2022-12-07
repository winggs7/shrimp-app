import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InformationBar from '../base/InformationBar';
import Weather from '../base/Weather';
import CropComponent from '../base/CropComponent';

export interface Props {
    pondID: string,
    onActionForm: Function,
    onOpenWarningDelete: Function,
    onSetCropID: Function
}

export default function Manage({ pondID, onActionForm, onOpenWarningDelete, onSetCropID }: Props) {

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
                                pondID={pondID}
                                onActionForm={onActionForm}
                                onOpenWarningDelete={onOpenWarningDelete}
                                onSetCropID={onSetCropID}
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
