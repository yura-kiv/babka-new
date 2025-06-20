import React, { useState, useEffect, memo } from 'react';
import s from './styles.module.scss'
import { useTranslation } from 'react-i18next';
import Table from '@/components/ui/Table';
import UserAvatar from '@/components/ui/UserAvatar';
import PulseCircle from '@/assets/icons/onlineCircle.svg';
import { userNames, userAvatars } from '@/constants';
import classNames from 'classnames';

type PlayerStatus = 'active' | 'lost' | 'pending';

interface PlayerData {
    id: string;
    name: string;
    avatar: string;
    spent: number;
    bombs: number;
    prize: number | string;
    status: PlayerStatus;
}

function generateRandomValues() {
    var random = Math.random();
    return {
      spent: Math.floor(Math.random() * (1000 - 5) + 5),
      bombs: +((Math.random() * (3 - 0.5) + 0.5).toFixed(0)),
      isWin: random < 0.7,
      isLost: random >= 0.7 && random < 0.85,
      isPending: random >= 0.85,
    };
}

function generateUniqueId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function createRow(): PlayerData {
    const name = userNames[Math.floor(Math.random() * userNames.length)];
    const avatar = userAvatars[Math.floor(Math.random() * userAvatars.length)];
    const values = generateRandomValues();

    const prize = values.isWin
        ? Math.floor(values.spent * values.bombs)
        : values.isLost
        ? -values.spent
        : '...';

    const status: PlayerStatus = values.isWin
        ? "active"
        : values.isLost
        ? "lost"
        : "pending";

    return {
        id: generateUniqueId(),
        name,
        avatar,
        spent: values.spent,
        bombs: values.bombs,
        prize,
        status,
    };
}

type Props = {
    className?: string;
}

const ActivePlayersTable: React.FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const [rows, setRows] = useState<PlayerData[]>(() => Array.from({ length: 10 }, createRow));

    useEffect(() => {
        let isCancelled = false;

        function update() {
            setRows((prevRows) => {
                const filtered = prevRows.filter((row) => row.status !== 'lost');
                const newRows = [...filtered];

                const added = Array.from({ length: prevRows.length - filtered.length }, createRow);
                newRows.push(...added);

                if (newRows.length > 0) {
                    const randomIndex = Math.floor(Math.random() * newRows.length);
                    const updatedRow = createRow();
                    newRows[randomIndex] = { ...newRows[randomIndex], ...updatedRow };
                }

                return [...newRows].sort((a, b) => {
                    if (a.status === "pending" && b.status !== "pending") return 1;
                    if (a.status !== "pending" && b.status === "pending") return -1;
                    return b.spent - a.spent;
                });
            });

            if (!isCancelled) {
                const delay = Math.floor(Math.random() * (1000 - 500) + 500);
                setTimeout(update, delay);
            }
        }

        update();

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <div className={classNames(s.wrapper, className)}>
            <div className={s.top}>
                <span className={s.title}>{t('live')}</span>
                <img src={PulseCircle} alt="pulse-circle" className={s.pulseCircle} />
                <span className={s.title}>{t('players')}</span>
            </div>
            <Table
                hoverable
                striped
                variant="dark"
                size="medium"
            >
                <Table.Header>
                    <Table.Cell width='20%'>{t('name')}</Table.Cell>
                    <Table.Cell align="center">{t('spent')}</Table.Cell>
                    <Table.Cell align="center">{t('numberOfBombs')}</Table.Cell>
                    <Table.Cell align="center">{t('prize')}</Table.Cell>
                </Table.Header>
                <Table.Body>
                    {rows.map((player) => (
                        <Table.Row 
                            key={player.id}
                            className={s[player.status]}
                        >
                            <Table.Cell>
                                <UserAvatar 
                                    name={player.name} 
                                    avatar={player.avatar}
                                />
                            </Table.Cell>
                            <Table.Cell align="center">
                                <div className={s.spentCell}>{player.spent}$</div>
                            </Table.Cell>
                            <Table.Cell align="center">{player.bombs}</Table.Cell>
                            <Table.Cell align="center">
                                <div className={s.prizeCell}>
                                    {typeof player.prize === 'number' ? `${player.prize}$` : player.prize}
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default memo(ActivePlayersTable);