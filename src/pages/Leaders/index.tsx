import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle, Table, UserAvatar, WidthWrapper } from '@/components/ui';
import { userAvatars } from '@/constants';
import s from './styles.module.scss';
import { getMoneyView } from '@/utils';

const Leaders: React.FC = () => {
  const { t } = useTranslation();

  const leaderData = useMemo(() => {
    const leaderItems = [
      { name: 'NNikola', prize: 1119, spent: 332, bombs: 3 },
      { name: 'Jora77', prize: 998, spent: 305, bombs: 3 },
      { name: 'Гоша', prize: 812, spent: 225, bombs: 3 },
      { name: 'Oner02', prize: 516, spent: 125, bombs: 2 },
      { name: 'УБTraf', prize: 324, spent: 228, bombs: 3 },
      { name: 'Race', prize: 256, spent: 144, bombs: 2 },
      { name: '7GAME', prize: 232, spent: 151, bombs: 2 },
      { name: 'НикНет', prize: 212, spent: 166, bombs: 3 },
      { name: 'PiРусні', prize: 198, spent: 148, bombs: 2 },
      { name: 'Ivan', prize: 184, spent: 133, bombs: 2 },
    ];

    const avatars = userAvatars.slice(0, leaderItems.length);

    return leaderItems.map((item, index) => {
      const spentFormatted = getMoneyView(item.spent);
      const prizeFormatted = getMoneyView(item.prize);

      return {
        id: index + 1,
        name: item.name,
        avatar: avatars[index],
        spent: spentFormatted,
        bombs: item.bombs,
        prize: prizeFormatted,
      };
    });
  }, []);

  return (
    <WidthWrapper>
      <PageTitle
        title={t('leaders')}
        subtitle={t('leaders.subTitle')}
        as='h1'
      />
      <Table variant='dark' striped hoverable className={s.table}>
        <Table.Header>
          <Table.Cell width='20%'>{t('name')}</Table.Cell>
          <Table.Cell align='center'>{t('spent')}</Table.Cell>
          <Table.Cell align='center'>{t('numberOfBombs')}</Table.Cell>
          <Table.Cell align='center'>{t('prize')}</Table.Cell>
        </Table.Header>
        <Table.Body>
          {leaderData.map((leader) => (
            <Table.Row key={leader.id}>
              <Table.Cell>
                <UserAvatar name={leader.name} avatar={leader.avatar} />
              </Table.Cell>
              <Table.Cell align='center'>{leader.spent}</Table.Cell>
              <Table.Cell align='center'>{leader.bombs}</Table.Cell>
              <Table.Cell align='center' className={s.prize}>
                {leader.prize}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </WidthWrapper>
  );
};

export default Leaders;
