import { useMediaQuery } from 'react-responsive';

export default function useWindow() {
  const isMobile = useMediaQuery({ maxWidth: 767.9 });
  const isTablet = useMediaQuery({ maxWidth: 1279.9 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
