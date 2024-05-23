export type TransactionType = "income" | "expense";
export type IncomeCategory = "給与" | "副業" | "勝利" | "その他";
export type ExpenseCategory = "食費" | "買い物" | "住居費" | "敗北" | "交際費" | "交通費" | "救う";

export interface Transaction {
    id: string,
    date: string,
    amount: number,
    content: string,
    type: TransactionType,
    category: IncomeCategory | ExpenseCategory;
}

export interface Balance {
    income: number,
    expense: number,
    balance: number,
}

export interface CalendarContent {
    start: string,
    income: string,
    expense: string,
    balance: string,
}