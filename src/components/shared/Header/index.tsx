import React from 'react';
import DesctopHeader from './DesctopHeader';
import MobileHeader from './MobileHeader';
import { useWindowSize } from '@/hooks/useWindowSize';
import { BREAKPOINT_LG } from '@/constants';

const Header: React.FC = () => {
  const windowSize = useWindowSize();

  const isMobile = windowSize.width < BREAKPOINT_LG;

  return isMobile ? <MobileHeader /> : <DesctopHeader />;
};

export default Header;
