
import WidthWrapper from '@/components/ui/WidthWrapper';
import PageTitle from '@/components/ui/PageTitle';
import { useTranslation } from 'react-i18next';
import Divider from '@/components/ui/Divider';
import s from './styles.module.scss';
import Table from '@/components/ui/Table';

const paymentHistory = [
    {
        id: '1',
        date: '2025-05-28',
        sum: '500 $',
        status: 'Completed',
    },
    {
        id: '2',
        date: '2025-05-15',
        sum: '1200 $',
        status: 'Pending',
    },
    {
        id: '3',
        date: '2025-04-30',
        sum: '750 $',
        status: 'Completed',
    },
]

const Cash: React.FC = () => {
    const { t } = useTranslation();

    return (
        <WidthWrapper className={s.wrapper}>
            <PageTitle title={t('cash.title')} subtitle={t('cash.subtitle')} as="h1" />
            <Divider noMargin />
            <div className={s.container}>
                <PageTitle title={t('cash.withdrawWith')} subtitle={t('cash.withdrawWithSubtitle')} as="h2" />
            </div>
            <Divider noMargin />
            <div className={s.container}>
                <PageTitle title={t('cash.depositWith')} subtitle={t('cash.depositWithSubtitle')} as="h2" />
            </div>
            <Divider noMargin />
            <div className={s.container}>
                <PageTitle title={t('cash.paymentHistory')} subtitle={t('cash.paymentHistorySubtitle')} as="h2" />
                <div className={s.tableWrapper}>
                    <Table
                        variant="dark"
                        striped
                        hoverable
                    >
                        <Table.Header>
                            <Table.Cell>Date</Table.Cell>
                            <Table.Cell align="center">Sum</Table.Cell>
                            <Table.Cell align="center">Status</Table.Cell>
                        </Table.Header>
                        <Table.Body>
                            {paymentHistory.map((payment) => (
                                <Table.Row key={payment.id}>
                                    <Table.Cell>{payment.date}</Table.Cell>
                                    <Table.Cell align="center">{payment.sum}</Table.Cell>
                                    <Table.Cell
                                        align="center"
                                        className={payment.status === 'Completed' ? s.completed : s.pending}
                                    >
                                        {payment.status}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </WidthWrapper>
    );
};

export default Cash;