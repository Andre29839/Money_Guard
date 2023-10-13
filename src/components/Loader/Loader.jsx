import { useEffect } from 'react';
import { ReactComponent as TopIcon } from 'images/loader/top-part.svg';
import { ReactComponent as LeftMid } from 'images/loader/left-mid-part.svg';
import { ReactComponent as LeftBottom } from 'images/loader/left-bottom-part.svg';
import { ReactComponent as RightTop } from 'images/loader/right-top-part.svg';
import { ReactComponent as RightBottom } from 'images/loader/right-bottom-part.svg';
import { LoaderWrapper } from './Loader.styled';

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  });
  return (
    <LoaderWrapper>
      <TopIcon width={35} height={35} />
      <LeftMid width={45} height={45} />
      <RightTop width={30} height={30} />
      <LeftBottom width={30} height={30} />
      <RightBottom width={30} height={30} />
    </LoaderWrapper>
  );
};

export default Loader;
