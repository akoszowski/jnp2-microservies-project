import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";


export function DateChooser({ startDate, setStartDate, endDate, setEndDate }) {
    return (
        <div>
            <div>
                Choose date from:
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat={'yyyy-MM-dd'} maxDate={endDate} minDate={new Date('2021-01-01')} />
            </div>
            <div>
                to:
                <DatePicker enabled={false} selected={endDate} onChange={(date) => setEndDate(date)} dateFormat={'yyyy-MM-dd'} maxDate={new Date('2021-09-13')} minDate={startDate} />
            </div>
        </div>
    )
}