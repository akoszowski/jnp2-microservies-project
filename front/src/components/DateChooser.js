import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

export function DateChooser({ startDate, setStartDate, endDate, setEndDate }) {
    return (
        <div>
            I am date chooser
            <div>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat={'yyyy-MM-dd'} maxDate={endDate} minDate={new Date('2021-09-01')} />
            </div>
            <div>
                <DatePicker enabled={false} selected={endDate} onChange={(date) => setEndDate(date)} dateFormat={'yyyy-MM-dd'} maxDate={new Date('2021-09-10')} minDate={startDate} />
            </div>
        </div>
    )
}