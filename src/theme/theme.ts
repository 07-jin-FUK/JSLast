import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material";
import { amber, blue, cyan, deepOrange, green, lightBlue, lightGreen, pink, purple, red } from "@mui/material/colors";
import { dark } from "@mui/material/styles/createPalette";
import { urlToHttpOptions } from "url";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module "@mui/material/styles" {
    interface Palette {
        incomeColor: PaletteColor
        expenseColor: PaletteColor
        balanceColor: PaletteColor

        incomeCategoryColor: Record<IncomeCategory, string>;
        expenseCategoryColor: Record<ExpenseCategory, string>;
    }
    // Optionsにしておくことで、下記のようなmain light darkを
    // 必ずしも設定しなくてはというわけではなくなる。これがないと不備があればエラーになる。
    // ?があれば下記のカラー表示をコメントアウトしてもエラーが出なくなる。柔軟性増える
    interface PaletteOptions {
        incomeColor?: PaletteColorOptions;
        expenseColor?: PaletteColorOptions;
        balanceColor?: PaletteColorOptions;
        incomeCategoryColor?: Record<IncomeCategory, string>;
        expenseCategoryColor?: Record<ExpenseCategory, string>;
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Noto Sans JP,Roboto,"Helvetica Neue",Arial,sans-serif',
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },

    palette: {
        // 収入用の色を定義
        incomeColor: {
            main: blue[500],
            light: blue[100],
            dark: blue[700],
        },
        // 支出用の色を定義
        expenseColor: {
            main: red[500],
            light: red[100],
            dark: red[700],
        },
        // 残高用の色を定義
        balanceColor: {
            main: green[500],
            light: green[100],
            dark: green[700],
        },

        incomeCategoryColor: {
            給与: lightBlue[500],
            副業: cyan[200],
            勝利: lightGreen["A700"],
            その他: lightBlue[500],
        },
        expenseCategoryColor: {
            食費: deepOrange[500],
            買い物: lightGreen[500],
            住居費: amber[500],
            敗北: pink[300],
            交際費: purple[400],
            交通費: cyan[200],
            救う: lightBlue[500],
        },
    },

});