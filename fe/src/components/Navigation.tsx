import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import MenuItem from './base/MenuItem'
import { MENU } from '../containers/HomeContainer/HomeContainer'

export interface Props {
    onChangeNav: Function,
    menuItem: string
}

export default function Navigation({ onChangeNav, menuItem }: Props) {

    return (
        <div className="navigation-container">
            <div className="logo-container">
                <div className="logo-image">
                    <FontAwesomeIcon icon={solid('shrimp')} />
                </div>
            </div>
            <MenuItem
                title={"Home"}
                icon={<FontAwesomeIcon icon={solid('home')} />}
                nav={'home'}
                onChangeNav={onChangeNav}
                isActive={menuItem === MENU.HOME}
            />
            <MenuItem
                title={"Manage"}
                icon={<FontAwesomeIcon icon={solid('list')} />}
                nav={'manage'}
                onChangeNav={onChangeNav}
                isActive={menuItem === MENU.MANAGE}
            />
            <MenuItem
                title={"Setting"}
                icon={<FontAwesomeIcon icon={solid('gear')} />}
                nav={'setting'}
                onChangeNav={onChangeNav}
                isActive={menuItem === MENU.SETTING}
            />
        </div>
    )
}
