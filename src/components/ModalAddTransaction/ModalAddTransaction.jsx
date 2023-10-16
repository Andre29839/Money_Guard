import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { parse } from 'date-fns';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { object, string, date, bool, mixed, number } from 'yup';
import { selectTransactionsCategories } from 'redux/transactionsRedusers/transactionsSelectors';
import { addTransactionsThunk } from 'redux/transactionsRedusers/transactionsThunks';
import DateTimePicker from 'components/DateTimePicker/DateTimePicker';
import TextArea from 'components/TextArea/TextArea';
import CategorySelect from 'components/CategorySelect/CategorySelect';
import Button from 'components/Button/Button';
import Switch from './Switch/Switch';
import {
  BaseInput,
  CalendarWrapper,
  ErrorText,
  FormikForm,
  Heading,
  InputWrapper,
  TwoColumnRow,
} from './ModalAddTransaction.styled';

const ModalAddTransaction = ({ closeModal }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(selectTransactionsCategories);
  const { t } = useTranslation();

  const incomeId = categories
    .filter(category => (category.type === 'INCOME' ? category.id : null))
    .reduce(function (target, key, idx) {
      target[idx] = key;
      return target;
    });

  const dateTransformer = (_, originalValue) => {
    const parsedDate = parse(originalValue, 'dd-MM-yyyy', new Date());
    return Number(parsedDate) ? new Date('') : new Date();
  };

  const handleCheckboxChange = () => {
    setIsChecked(isChecked => !isChecked);
  };

  const handleSubmit = values => {
    const data = {
      transactionDate: new Date(values.date),
      type: isChecked ? 'INCOME' : 'EXPENSE',
      categoryId: isChecked ? incomeId.id : values.category.id,
      comment: values.comment,
      amount: isChecked ? Number(values.value) : Number(-values.value),
    };

    dispatch(addTransactionsThunk(data));
  };

  return (
    <Formik
      initialValues={{
        date: new Date(),
        type: isChecked,
        comment: '',
        value: '',
        category: null,
      }}
      validationSchema={object({
        type: bool(),
        category: mixed().when('type', {
          is: type => !type,
          then: () =>
            mixed().required(t('Please choose transaction category.')),
          otherwise: () => mixed().notRequired(),
        }),
        value: number()
          .typeError(t('Transaction value must be a number'))
          .test(
            'len',
            t('Transaction value can be a maximum of 10 characters'),
            val => val.toString().length <= 10
          )
          .required(t('Please provide transaction value.')),
        date: date()
          .transform(dateTransformer)
          .typeError(t('Please enter a valid date'))
          .required(t('Please provide transaction date.')),
        comment: string()
          .notRequired()
          .max(25, t('Maximum must be 25 characters'))
          .min(3, t('Minimum must be 3 characters')),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        try {
          handleSubmit(values);
          resetForm();
          setSubmitting(false);
          closeModal();
        } catch (error) {
          console.error(error);
        }
      }}
      enableReinitialize
    >
      {({ values, setFieldValue, handleBlur }) => (
        <FormikForm>
          <Heading>{t('Add transaction')}</Heading>
          <Switch
            name="type"
            checked={isChecked}
            onClick={handleCheckboxChange}
            type="radio"
          />
          {!isChecked && (
            <InputWrapper>
              <CategorySelect
                name="category"
                placeholder={t('Select a category')}
                value={values.category}
                onChange={option => setFieldValue('category', option)}
                options={categories
                  ?.map(option => {
                    if (option.name !== 'Income') {
                      return {
                        value: option.type,
                        label: t(option.name),
                        id: option.id,
                      };
                    }
                    return null;
                  })
                  .filter(Boolean)}
              />
              <ErrorText name="category" component="div" />
            </InputWrapper>
          )}
          <TwoColumnRow>
            <InputWrapper>
              <BaseInput
                placeholder="0.00"
                title={t('Please put the transaction value')}
                name="value"
                type="number"
                autoComplete="off"
                value={values.value}
                onChange={value => setFieldValue('value', value.target.value)}
                onBlur={handleBlur}
                onKeyUp={handleBlur}
              />
              <ErrorText name="value" component="div" />
            </InputWrapper>
            <CalendarWrapper>
              <DateTimePicker
                dateFormat="dd-MM-yyyy"
                name="date"
                type="date"
                timeFormat={false}
              />
            </CalendarWrapper>
          </TwoColumnRow>
          <InputWrapper>
            <TextArea
              placeholder={t('comment')}
              title={t('Please describe your transaction.')}
              name="comment"
              type="text"
              autoComplete="off"
            />
            <ErrorText name="comment" component="div" />
          </InputWrapper>
          <Button type="submit" variant="primary" text={t('add')} />
          <Button
            type="button"
            variant="secondary"
            text={t('cancel')}
            onClick={() => closeModal()}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default ModalAddTransaction;
