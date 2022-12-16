import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PondItem from './PondItem'

export interface Props {
    onChangeNav: Function
}

export default function PondComponent({ onChangeNav }: Props) {
    const [ponds, setPonds] = useState([]);

    useEffect(() => {
        const getPonds = async () => {
            try {
                const response = await axios.get('http://localhost:7000/pond');
                response && setPonds(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPonds();
    }, [])

    return (
        <div className="pond-container">
            <div className="title">
                Pond List
            </div>
            <div className="pond-list">
                {ponds && ponds.map((pond, id) => {
                    return (
                        <PondItem
                            key={id}
                            ID={pond['ID']}
                            name={pond['name']}
                            area={pond['area']}
                            deep={pond['deep']}
                            startDate={pond['startDate']}
                            onChangeNav={onChangeNav}
                        />
                    )
                })}
            </div>
        </div>
    )
}
