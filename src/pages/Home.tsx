import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'

interface HomeProps {
    monthlyTransactions: Transaction[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
    onSaveTransaction: (transaction: Schema) => Promise<void>;
    selectedTransaction: Transaction | null;
    setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>
    onDeleteTransaction: (transactionID: string | readonly string[]) => Promise<void>;
    onUpdateTransaction: (transaction: Schema, transactionID: string) => Promise<void>
}

const Home = ({
    monthlyTransactions,
    setCurrentMonth,
    onSaveTransaction,
    selectedTransaction,
    setSelectedTransaction,
    onDeleteTransaction,
    onUpdateTransaction,
}: HomeProps) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const [currentDay, setCurrentDay] = useState(today);
    const [isEntryDrawerOpen, setisEntryDrawerOpen] = useState(false);

    // 1日分のデータ取得
    const dailyTransactions = monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
    });

    const closeForm = () => {
        setisEntryDrawerOpen(!isEntryDrawerOpen);
        setSelectedTransaction(null);
    };

    // フォームの開閉処理
    const handleAddTransactionForm = () => {
        if (selectedTransaction) {
            setSelectedTransaction(null);
        } else {
            setisEntryDrawerOpen(!isEntryDrawerOpen);
        }
    };

    // 取引が選択された時の処理
    const handleSelectTransaction = (transaction: Transaction) => {
        setisEntryDrawerOpen(true);
        setSelectedTransaction(transaction);
    };


    return (
        <Box sx={{ display: "flex" }}>
            {/* 左側コンテンツ */}
            <Box sx={{ flexGrow: 1 }}>
                <MonthlySummary monthlyTransactions={monthlyTransactions} />
                <Calendar
                    monthlyTransactions={monthlyTransactions}
                    setCurrentMonth={setCurrentMonth}
                    setCurrentDay={setCurrentDay}
                    currentDay={currentDay}
                    today={today}
                />
            </Box>
            {/* 右側コンテンツ */}
            <Box>
                <TransactionMenu
                    dailyTransactions={dailyTransactions}
                    currentDay={currentDay}
                    onAddTransactionForm={handleAddTransactionForm}
                    onSelectTransaction={handleSelectTransaction} />
                <TransactionForm
                    onCloseForm={closeForm}
                    isEntryDrawerOpen={isEntryDrawerOpen}
                    currentDay={currentDay}
                    onSaveTransaction={onSaveTransaction}
                    selectedTransaction={selectedTransaction}
                    onDeleteTransaction={onDeleteTransaction}
                    setSelectedTransaction={setSelectedTransaction}
                    onUpdateTransaction={onUpdateTransaction}
                />
            </Box>
        </Box>
    )
}

export default Home
