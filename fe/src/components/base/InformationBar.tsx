import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function InformationBar() {
    const [ponds, setPonds] = useState(0);
    const [area, setArea] = useState(0);

    useEffect(() => {
        try {
            const getInfo = async () => {
                const respone = await axios.get('http://localhost:7000/pond');
                var totalArea = respone.data.reduce(function (acc: number, pond: any) { return acc + pond['area']; }, 0);

                setPonds(respone.data.length);
                setArea(totalArea);
            }

            getInfo();
        } catch (error) {
            console.log(error);
        }

    }, [])



    return (
        <div className='rightside-container'>
            <div className="rightside__title">
                Total information
            </div>
            <div className="rightside__content">

                <div className="info-bar__item">
                    {ponds} ponds
                </div>
                <div className="info-bar__item">
                    Total area: {area} km<sup>2</sup>
                </div>
                <div className="info-bar__item">
                    Total cost
                </div>
                <div className="info-bar__item">
                    ...
                </div>
            </div>
        </div>
    )
}
