import ActivePlayersTable from '@/components/ActivePlayersTable';
import NumberInput from '@/components/NumberInput';
import WidthWrapper from '@/components/WidthWrapper';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Game: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(100);

  return (
    <WidthWrapper>
      <NumberInput value={value} onChange={setValue} />
      <ActivePlayersTable />
    </WidthWrapper>
  );
};

export default Game;
