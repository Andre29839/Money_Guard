import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { format, isValid } from 'date-fns';
import ua from 'date-fns/locale/uk';
import en from 'date-fns/locale/en-US';
import {
  StyledDateTime,
  IconStyled,
  CalendarGlobalStyles,
} from './DateTimePicker.styled';

const DateTimePicker = ({ name }) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const { i18n } = useTranslation();

  registerLocale('en', en);
  registerLocale('ua', ua);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <label>
      <input type="text" value={value} readOnly onClick={onClick} ref={ref} />
      <IconStyled onClick={onClick} />
    </label>
  ));

  return (
    <StyledDateTime>
      <DatePicker
        inputProps={{ readOnly: true }}
        selected={field.value ? new Date(field.value) : null}
        closeOnSelect={true}
        onChange={values => {
          if (isValid(values)) {
            setFieldValue(field.name, values, format(values, 'dd-MM-yyyy'));
          }
        }}
        dateFormat="dd.MM.yyyy"
        customInput={<CustomInput />}
        locale={i18n.language}
      />
      <CalendarGlobalStyles />
    </StyledDateTime>
  );
};

export default DateTimePicker;
