import React from 'react';
import DesctopHeader from './DesctopHeader';
import MobileHeader from './MobileHeader';
import { useWindowSize } from '@/hooks/useWindowSize';

const MOBILE_BREAKPOINT = 992;

const Header: React.FC = () => {
  const windowSize = useWindowSize();
  
  const isMobile = windowSize.width < MOBILE_BREAKPOINT;

  return isMobile ? <MobileHeader /> : <DesctopHeader />;
};

export default Header;
