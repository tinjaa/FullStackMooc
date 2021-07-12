import React from 'react'

const Alert = (alert, error = false) => {
    if (alert) {
        if (error) {
            return (
                <div className="error">{alert}</div>
            )
        } else {
            return (
                <div className="alert">{alert}</div>
            )
        }
    }
    return null
}

export default Alert