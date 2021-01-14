import React, { Fragment, useEffect, useState } from 'react';



const SwitchButton = ({ formData, clickFunction, loader }: any) => {

    

    const [styles, setStyles] = useState({})
    const [value, setValue] = useState('')

    useEffect( () => {
        if (loader) {
            setStyles({
                right: '55%',
                backgroundColor: '#49c500'
            })
            setValue('')
        } else {
            setStyles({
                right: '0%',
                backgroundColor: '#2a2a2a'
            })
            setValue('')
        }

    },[loader])

    return (
        <Fragment>
            <label className="switch-button" htmlFor="switch-box" onClick={e=> clickFunction(formData)}>
                <span className="switch" style={styles}>{value}</span>
            </label>
                
        </Fragment>
    )
}

export default SwitchButton;