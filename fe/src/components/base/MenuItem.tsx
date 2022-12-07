import React from 'react'

export interface Props {
    title: string,
    icon: any,
    nav: string,
    isActive: boolean,
    onChangeNav: Function
}

export default function MenuItem({ title, icon, onChangeNav, isActive, nav }: Props) {
    const active = isActive ? "actived" : "";

    return (
        <div className={`navigation-item ${active}`} onClick={(e) => { onChangeNav(nav) }}>
            <div className="icon">
                {icon}
            </div>
            {title}
        </div>
    )
}
