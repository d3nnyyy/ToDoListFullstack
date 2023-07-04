import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import moment from 'moment';

const CustomDatePicker = ({ newTask, handleInputChange }) => {
        const selectedDate = newTask.deadline ? moment(newTask.deadline).toDate() : null;

        const handleChange = (date) => {
                const formattedDate = moment(date).format('YYYY-MM-DD');
                handleInputChange({ target: { name: 'deadline', value: formattedDate } });
        };

        return (
                <DatePicker
                        className="form-control border-0 bg-transparent text-white placeholder-color custom-datepicker"
                        selected={selectedDate}
                        onChange={handleChange}
                        placeholderText="Deadline"
                        dateFormat="yyyy-MM-dd"
                        popperPlacement="bottom"
                        popperModifiers={{
                                preventOverflow: {
                                        enabled: true,
                                        escapeWithReference: false,
                                        boundariesElement: 'viewport',
                                },
                        }}
                        popperContainer={({ children }) => <div className="custom-datepicker-popper">{children}</div>}
                />
        );
};

export default CustomDatePicker;
