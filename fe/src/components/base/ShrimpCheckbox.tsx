import React from 'react'

export interface Props {
    stats: any,
    onChangeCheckBox: Function
}

export default function ShrimpCheckbox({ stats, onChangeCheckBox }: Props) {

    return (
        <div className="shrimpCheckbox">
            {
                stats && stats.map((stat: any, id: any) => {
                    return (
                        <div key={id} className={"checkbox-item"}>
                            <input type="checkbox" value={stat.ID} onChange={(e) => { onChangeCheckBox(e) }} />
                            {stat.name}
                        </div>
                    );
                })
            }
        </div>
    )
}
