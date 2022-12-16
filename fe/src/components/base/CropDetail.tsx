import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StatComponent from './StatComponent'
import DeleteButton from './DeleteButton';
import CropInfo from './CropInfo';
import ShrimpButton from './ShrimpButton';
import { FORM } from '../../containers/HomeContainer/HomeContainer';

export interface Props {
    cropID: string,
    onOpenWarningDelete: Function,
    onActionForm: Function
}

export default function CropDetail({ cropID, onOpenWarningDelete, onActionForm }: Props) {
    const [crop, setCrop] = useState([]);
    const [cropsStat, setCropsStat] = useState<any>([]);

    const stat_array = ['pH', 'Temperature'];

    useEffect(() => {
        const getCropDetail = async () => {
            try {
                const reponse = await axios.get('http://localhost:7000/crop/stat/' + cropID);
                reponse && setCropsStat(reponse.data);

                const reponse_2 = await axios.get('http://localhost:7000/crop/' + cropID);
                reponse_2 && setCrop(reponse_2.data);
            } catch (error) {
                console.log(error)
            }
        }
        getCropDetail();
    }, [cropID])

    return (
        <>
            <DeleteButton
                id={cropID}
                name={'crop'}
                action={'deleteCrop'}
                onOpenWarningDelete={onOpenWarningDelete}
            />
            <CropInfo
                crop={crop}
            />
            <ShrimpButton
                form={FORM.ASSIGNSTAT}
                name={'Assign stat'}
                onActionForm={onActionForm}
                options={cropID}
            />
            {Array.isArray(cropsStat) && (
                cropsStat && cropsStat?.map((stat, id) => {
                    return <StatComponent
                        key={id}
                        id={stat['statID']}
                        cropID={cropID}
                        name={stat_array[parseInt(stat['statID']) - 1]}
                    />
                })
            )}
            <ShrimpButton
                form={FORM.SHOWHISTORY}
                name={'View histories'}
                onActionForm={onActionForm}
                options={cropID}
            />
        </>
    )
}
