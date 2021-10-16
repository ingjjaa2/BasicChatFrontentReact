import moment from 'moment';

export const timeMonth=(date:any)=>{
    const _date = moment(date)
    return _date.format('HH:mm a | MMMM Do');
}