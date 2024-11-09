import React, { useEffect, useState } from 'react';
import './App.css';
import { Await, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/layout/AppLayout';

import Save3 from './pages/Save3';
import { theme } from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';
import Secret from './pages/Secret';


function App() {
  // Firestoreがエラーかどうか判断している
  function isFirestoreError(err: unknown): err is { code: string, message: string } {
    return typeof err === "object" && err !== null && "code" in err
  }

  const
    [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  format(currentMonth, "yyyy-MM");

  useEffect(() => {
    const fecheTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"))

        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          return {
            ...doc.data(),
            id: doc.id,
            // 型アーサーションid以外も入ってるよの意味を伝えるasの通常解釈でOK
          } as Transaction
        });
        // console.log(transactionsData);
        setTransactions(transactionsData);

      } catch (err) {
        if (isFirestoreError(err)) {
          console.error("firestoreのエラーは", err)

        } else {
          console.error("一般的なエラーは", err)
        }
      } finally {
        setIsLoading(false);
      }
    }
    fecheTransactions();
  }, [])

  // ひと月分のデータを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })


  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      // firestoreにデータを保存
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions([...transactions, newTransaction]);


    } catch (err) {
      if (isFirestoreError(err)) {
        console.error("firestoreのエラーは", err)

      } else {
        console.error("一般的なエラーは", err)
      }
    }
  };

  const handleDeleteTransaction = async (transactionIDs: string | readonly string[]) => {
    // firestoreデータを削除する
    try {
      const idsToDelete = Array.isArray(transactionIDs) ? transactionIDs : [transactionIDs];

      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }

      const filterdTransactions = transactions.filter((transaction) => !idsToDelete.includes(transaction.id));
      setTransactions(filterdTransactions);
    } catch (err) {
      if (isFirestoreError(err)) {
        console.error("firestoreのエラーは", err)

      } else {
        console.error("一般的なエラーは", err)
      }
    }
  }

  const handleUpdateTransaction = async (transaction: Schema, transactionID: string) => {
    try {
      // firestore更新処理
      const docRef = doc(db, "Transactions", transactionID);

      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, transaction);
      // フロント更新
      const updatedTransactions = transactions.map((t) => t.id === transactionID ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (err) {
      if (isFirestoreError(err)) {
        console.error("firestoreのエラーは", err)

      } else {
        console.error("一般的なエラーは", err)
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/JSlast/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  setSelectedTransaction={setSelectedTransaction}
                  selectedTransaction={selectedTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route path="/JSlast/report" element={
              <Report
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions}
                isLoading={isLoading}
                onDeleteTransaction={handleDeleteTransaction}
              />} />
            <Route path="/JSlast/secret" element={<Secret />} />
            <Route path="/JSlast/save3" element={<Save3 />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
