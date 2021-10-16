import React from 'react';
import { timeMonth } from '../helpers/datesConversion'

export const OutgoinMessages = ({msg}:any) => {

    const _fecha = timeMonth(msg.createdAt);

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{msg?.message}</p>
                <span className="time_date"> {_fecha}</span>
            </div>
        </div>
    )
}
