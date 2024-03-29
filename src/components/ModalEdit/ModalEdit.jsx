import { useTranslation } from 'react-i18next';
import { parse } from 'date-fns';
import { Formik } from 'formik';
import { RxSlash } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { object, string, date, number } from 'yup';
import {
  BaseInput,
  CalendarWrapper,
  ErrorText,
  ExpenseSpan,
  FormikForm,
  Heading,
  IncomeSpan,
  InputWrapper,
  TransactionTypeDiv,
  TwoColumnRow,
} from 'components/ModalAddTransaction/ModalAddTransaction.styled';
import DateTimePicker from 'components/DateTimePicker/DateTimePicker';
import TextArea from 'components/TextArea/TextArea';
import { patchTransactionsThunk } from 'redux/transactionsRedusers/transactionsThunks';
import Button from 'components/Button/Button';
import { refreshBalanceThunk } from 'redux/registerReducers/registerThunks';
import { selectTransactionsCategories } from 'redux/transactionsRedusers/transactionsSelectors';

const ModalEdit = ({ closeModal, item }) => {
  const categories = useSelector(selectTransactionsCategories);
  const gategoryNamesbyId = categories.reduce((res, category) => {
    res[category.id] = category.name;
    return res;
  }, {});

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isExpense = item.type === 'EXPENSE';

  const dateTransformer = (_, originalValue) => {
    const parsedDate = parse(originalValue, 'dd-MM-yyyy', new Date());
    return Number(parsedDate) ? new Date('') : new Date();
  };

  const handleSubmit = values => {
    const data = {
      id: item.id,
      updatedData: {
        transactionDate: new Date(values.date),
        type: item.type,
        categoryId: values.category.categoryId,
        comment: values.comment,
        amount: !isExpense ? Number(values.value) : Number(-values.value),
      },
    };

    dispatch(patchTransactionsThunk(data))
      .unwrap()
      .then(() => dispatch(refreshBalanceThunk()));
  };

  return (
    <Formik
      initialValues={{
        date: new Date(item.transactionDate),
        type: item.type,
        category: item.categoryId,
        comment: item.comment,
        value: Math.abs(item.amount),
      }}
      validationSchema={object({
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
        handleSubmit(values);
        resetForm();
        setSubmitting(false);
        closeModal();
      }}
      enableReinitialize
    >
      {({ values, setFieldValue, handleBlur }) => (
        <FormikForm>
          <Heading>{t('Edit transaction')}</Heading>
          <TransactionTypeDiv>
            <IncomeSpan $active={item.type === 'INCOME'}>
              {t('income')}
            </IncomeSpan>
            <RxSlash />
            <ExpenseSpan $active={item.type === 'EXPENSE'}>
              {t('expense')}
            </ExpenseSpan>
          </TransactionTypeDiv>
          {isExpense && (
            <InputWrapper>
              <TextArea
                name="category"
                autoComplete="off"
                value={t(gategoryNamesbyId[item.categoryId])}
                readOnly
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
                dateFormat="DD.MM.YYYY"
                name="date"
                type="date"
                timeFormat={false}
              />
              <ErrorText name="date" component="div" />
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
          <Button type="submit" variant="primary" text={t('save')} />
          <Button
            type="button"
            variant="secondary"
            style={{ marginBotoom: 0, marginTop: '-40px' }}
            onClick={() => closeModal()}
            text={t('cancel')}
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default ModalEdit;
