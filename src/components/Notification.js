import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    return (
      notification.length > 1 &&
        <div className={ notification[0]}>
           { notification[0] === 'error' ? 
            notification[1].error : 
            notification[1] }
        </div>
    )
}

export default Notification
