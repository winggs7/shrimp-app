import React from 'react'
import PondComponent from '../base/PondComponent'
import InformationBar from '../base/InformationBar'
import ShrimpButton from '../base/ShrimpButton'
import Weather from '../base/Weather'

export interface Props {
    onActionForm: Function,
    onChangeNav: Function
}

export default function Home({ onActionForm, onChangeNav }: Props) {

    return (
        <>
            <div className="left-side">
                <ShrimpButton form={'addpond'} name={'add pond'} onActionForm={onActionForm} />
                <PondComponent onChangeNav={onChangeNav} />
            </div>
            <div className="right-side">
                <InformationBar />
                <Weather />
            </div>
        </>
    )
}
