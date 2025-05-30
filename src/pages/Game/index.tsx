import ActivePlayersTable from '@/components/shared/ActivePlayersTable';
import NumberInput from '@/components/ui/NumberInput';
import WidthWrapper from '@/components/ui/WidthWrapper';
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
