import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle, Table, UserAvatar, WidthWrapper } from '@/components/ui';
import { userAvatars } from '@/constants';
import s from './styles.module.scss';

const Leaders: React.FC = () => {
  const { t } = useTranslation();

  const leaderData = useMemo(() => {
    const specificNames = [
      'NNikola',
      'Jora77',
      'Гоша',
      'Oner02',
      'УБTraf',
      'Race',
      '7GAME',
      'НикНет',
      'PiРусні',
      '350',
    ];

    return specificNames.map((name, index) => {
      const spent = Math.floor(Math.random() * 900) + 40;
      const bombs = Math.floor(Math.random() * 20) + 1;
      const prize = Math.floor(Math.random() * 3000) + 300;
      const spentFormatted = name === '350' ? '350' : `${spent}$`;
      const prizeFormatted = `${prize}$`;

      return {
        id: index + 1,
        name,
        avatar: userAvatars[Math.floor(Math.random() * userAvatars.length)],
        spent: spentFormatted,
        bombs: bombs,
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
