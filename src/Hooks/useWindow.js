import { useMediaQuery } from 'react-responsive';

export default function useWindow() {
  const isMobile = useMediaQuery({ maxWidth: 767.9 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279.9 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTabletAndDesktop = useMediaQuery({ minWidth: 768 });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTabletAndDesktop,
  };
}
