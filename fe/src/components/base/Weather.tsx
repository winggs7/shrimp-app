import React from 'react'

export default function Weather() {
    return (
        <div className='rightside-container weather'>
            <div className="rightside__title">
                Weather
            </div>
            <div className="rightside__content">
                <div className="date">
                    Mon, 17 April, 2022
                </div>
                <div className="weather">
                    Sunny
                </div>
                <div className="temperature">
                    Temperature: 30
                </div>
            </div>
        </div>
    )
}
