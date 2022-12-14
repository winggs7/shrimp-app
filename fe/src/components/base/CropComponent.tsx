import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CropItem from './CropItem'
import ShrimpButton from './ShrimpButton';
import CropDetail from './CropDetail';
import DeleteButton from './DeleteButton';
import moment from 'moment';

export interface Props {
    cropID: string,
    pondID: any,
    crop: object,
    isCropView: boolean,
    onActionForm: Function,
    onOpenWarningDelete: Function,
    onSetCropID: Function,
    onGoIntoCropDetail: Function
}

export default function CropComponent({ cropID, pondID, crop, isCropView, onActionForm, onOpenWarningDelete, onSetCropID, onGoIntoCropDetail }: Props) {
    const [crops, setCrops] = useState<any[]>([]);

    useEffect(() => {
        const getCrops = async () => {
            try {
                const response = await axios.get('http://localhost:7000/crop/pond/' + pondID);

                response && setCrops(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        pondID && getCrops();
    }, [pondID])

    useEffect(() => {
        const cropsData = [...crops];
        cropsData.push({ ...crop, startDate: moment(new Date()) });
        setCrops(cropsData)
    }, [crop])

    useEffect(() => {
        if (isCropView) {
            onSetCropID(cropID);
        }
    }, [isCropView])

    return (
        <>
            {!isCropView && (
                <div className="crop-container">
                    <DeleteButton
                        id={pondID}
                        name={'pond'}
                        action={'deletePond'}
                        onOpenWarningDelete={onOpenWarningDelete}
                    />
                    <div className="title">
                        Crop list
                    </div>
                    <ShrimpButton form={'addcrop'} name={'add crop'} onActionForm={onActionForm} />
                    <div className="crop-list">
                        {crops.map((crop, id) => {
                            return (
                                <CropItem
                                    key={id}
                                    ID={crop['ID']}
                                    index={id + 1}
                                    type={crop['type']}
                                    number={crop['number']}
                                    startDate={crop['startDate']}
                                    onGoIntoCropDetail={onGoIntoCropDetail}
                                />
                            )
                        })}
                    </div>
                </div>
            )}
            {isCropView && (
                <CropDetail
                    cropID={cropID}
                    onOpenWarningDelete={onOpenWarningDelete}
                    onActionForm={onActionForm}
                />
            )}
        </>
    )
}
