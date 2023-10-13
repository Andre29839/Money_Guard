import { useField } from 'formik';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import {
  StyledSwitch,
  SwitchCheckBox,
  SwitchSlider,
  SwitchText,
} from './Switch.styled';
import { useTranslation } from 'react-i18next';

const Switch = ({ ...props }) => {
  const { checked } = props;
  const [field] = useField(props);

  const { t } = useTranslation();

  return (
    <StyledSwitch>
      <SwitchText checked={checked}>{t('income')}</SwitchText>
      <SwitchSlider checked={checked}>
        <SwitchCheckBox {...field} {...props} />
        <CiCirclePlus icon="icon__btn-plus" checked={checked} />
        <CiCircleMinus icon="icon__btn-minus" checked={checked} />
      </SwitchSlider>
      <SwitchText checked={checked}>{t('expense')}</SwitchText>
    </StyledSwitch>
  );
};

export default Switch;
