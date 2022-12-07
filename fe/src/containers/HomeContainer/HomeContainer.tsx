import React, { useState } from 'react'
import axios from 'axios'
import AddPond from '../../components/form/AddPond'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import Home from '../../components/pages/Home'
import Manage from '../../components/pages/Manage'
import Setting from '../../components/pages/Setting'
import AddCrop from '../../components/form/AddCrop'
import SetStatRange from '../../components/form/SetStatRange'
import WarningBox from '../../components/base/WarningBox'
import AssignStats from '../../components/form/AssignStats'

export const MENU: any = {
    HOME: 'home',
    MANAGE: 'manage',
    SETTING: 'setting'
}

export const FORM: any = {
    ADDPOND: 'addpond',
    ADDCROP: 'addcrop',
    SETSTAT: 'setstat',
    DELETE: 'delete',
    ASSIGNSTAT: 'assignstat',
    NONE: ''
}

export default function HomeContainer() {
    const [menuItem, setMenuItem] = useState<string>('home');
    const [form, setForm] = useState<string>('');
    const [pondID, setPondID] = useState<string>('');
    const [cropID, setCropID] = useState<string>('');
    const [warning, setWarning] = useState<any>({ action: '', id: '' });

    const onChangeNav = (nav: string, ID?: string) => {
        ID && setPondID(ID);
        setForm('');
        setMenuItem(nav);
    }

    const onActionForm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, form: string, values: any, type?: string) => {
        if (form === 'submit') {
            if (type === FORM.ADDPOND) {
                try {
                    const pond = { ...values };
                    await axios.post('http://localhost:7000/pond/', pond);
                } catch (error) {
                    console.log(error);
                }
            } else if (type === FORM.ADDCROP) {
                try {
                    const crop = { ...values };
                    await axios.post('http://localhost:7000/crop/', crop);
                } catch (error) {
                    console.log(error);
                }
            } else if (type === FORM.SETSTAT) {
                try {
                    e.preventDefault();
                    const stat = { ...values };
                    await axios.put('http://localhost:7000/stat/', stat);
                } catch (error) {
                    console.log(error);
                }
            } else if (type === FORM.ASSIGNSTAT) {
                try {
                    const { cropID, statConfirm } = values;
                    await axios.post('http://localhost:7000/crop/stat/' + cropID, { statIDs: statConfirm.toString() });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        setForm(form);
    }

    const onDeleteValue = async (action?: string, id?: string) => {
        if (action === 'deletePond') {
            try {
                await axios.delete('http://localhost:7000/pond/' + id);
            } catch (error) {
                console.log(error);
            }
            setMenuItem('home');
        } else if (action === 'deleteCrop') {
            try {
                await axios.delete('http://localhost:7000/crop/' + id);
            } catch (error) {
                console.log(error);
            }
        }
        if (action === 'cancel') {
            setWarning({ action: '', id: '' })
        }
        setForm('');
    }

    const onSetCropID = (ID: string) => {
        setCropID(ID);
    }

    const onOpenWarningDelete = (action?: string, id?: string) => {
        setWarning({ action, id });
        setForm('delete');
    }

    const renderWarning = () => {
        if (form === FORM.DELETE) {
            return (<WarningBox onDeleteValue={onDeleteValue} info={warning} />)
        } else if (form === FORM.NONE) {
            return '';
        }
    }

    const renderForm = () => {
        if (form === FORM.ADDPOND) {
            return (<AddPond onActionForm={onActionForm} />);
        } else if (form === FORM.ADDCROP) {
            return (<AddCrop onActionForm={onActionForm} pondID={pondID} />);
        } else if (form === FORM.SETSTAT) {
            return (<SetStatRange onActionForm={onActionForm} />);
        } else if (form === FORM.ASSIGNSTAT) {
            return (<AssignStats onActionForm={onActionForm} cropID={cropID} />);
        } else {
            return '';
        }
    }

    return (
        <div className='home-container'>
            <Navigation
                onChangeNav={onChangeNav}
                menuItem={menuItem}
            />
            <div className={`main-container ${form ? 'openForm' : ''}`}>
                <Header />
                <div className="content-container">
                    {menuItem === MENU.HOME && (
                        <Home
                            onActionForm={onActionForm}
                            onChangeNav={onChangeNav}
                        />
                    )}
                    {menuItem === MENU.MANAGE && (
                        <Manage
                            pondID={pondID}
                            onActionForm={onActionForm}
                            onOpenWarningDelete={onOpenWarningDelete}
                            onSetCropID={onSetCropID}
                        />
                    )}
                    {menuItem === MENU.SETTING && (
                        <Setting
                            onActionForm={onActionForm}
                        />
                    )}
                </div>
                {renderForm()}
                {renderWarning()}
            </div>
        </div>
    )
}
