import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import SwipeDownIcon from '@mui/icons-material/SwipeDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Transaction } from '../types';
import { financeCalculations } from '../utils/financeCalculations';
import { formatcurrency } from '../utils/formatting';

interface MonthlySummearyProps {
    monthlyTransactions: Transaction[],
}


const MonthlySummary = ({ monthlyTransactions }: MonthlySummearyProps) => {

    const { income, expense, balance } = financeCalculations(monthlyTransactions);

    return (
        //    containerは横並びにさせる mbはmarginBottom 数字は1につき8pixel
        <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
            {/* 収入 */}
            <Grid item xs={4} display={"flex"} flexDirection={"column"}>
                {/* flexGrowはめいっぱい伸ばすこと */}
                <Card
                    sx={{
                        bgcolor: (theme) => theme.palette.incomeColor.main,
                        color: "white",
                        borderRadius: "10px",
                        flexGrow: 1,
                    }}>
                    {/* xs=0以上の時　sm=600以上の時 1あたり8ピクセルの余白*/}
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        {/* rowは横並び */}
                        <Stack direction={"row"}>
                            {/* remは基準サイズroot内のフォント数に対する倍数のようなサイズ下でいうと2倍 */}
                            <SwitchAccessShortcutAddIcon sx={{ fontSize: "2rem" }} />
                            <Typography>収入</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant='h5'
                            fontWeight={"500"}
                            // wordBreakは折り返しにさせるコード mdは900pixel以上の時
                            sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" } }}
                        >¥{formatcurrency(income)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 支出 */}
            {/* xs=4は下に同じのが二つあるが全体を12としたうちの4としたもの同じ範囲内で合計して考えてみる */}
            <Grid item xs={4} display={"flex"} flexDirection={"column"}>
                <Card
                    sx={{
                        bgcolor: (theme) => theme.palette.expenseColor.main,
                        color: "white",
                        borderRadius: "10px",
                        flexGrow: 1,
                    }}>
                    {/* xs=0以上の時　sm=600以上の時 1あたり8ピクセルの余白*/}
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        {/* rowは横並び */}
                        <Stack direction={"row"}>
                            {/* remは基準サイズroot内のフォント数に対する倍数のようなサイズ下でいうと2倍 */}
                            <SwipeDownIcon sx={{ fontSize: "2rem" }} />
                            <Typography>支出
                            </Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant='h5'
                            fontWeight={"500"}
                            // wordBreakは折り返しにさせるコード mdは900pixel以上の時
                            sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" } }}
                        >¥{formatcurrency(expense)}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* 残高 */}
            <Grid item xs={4} display={"flex"} flexDirection={"column"}>
                <Card
                    sx={{
                        bgcolor: (theme) => theme.palette.balanceColor.main,
                        color: "white",
                        borderRadius: "10px",
                        flexGrow: 1,
                    }}>
                    {/* xs=0以上の時　sm=600以上の時 1あたり8ピクセルの余白*/}
                    <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                        {/* rowは横並び */}
                        <Stack direction={"row"}>
                            {/* remは基準サイズroot内のフォント数に対する倍数のようなサイズ下でいうと2倍 */}
                            <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
                            <Typography>残高</Typography>
                        </Stack>
                        <Typography
                            textAlign={"right"}
                            variant='h5'
                            fontWeight={"500"}
                            // wordBreakは折り返しにさせるコード mdは900pixel以上の時
                            sx={{ wordBreak: "break-word", fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" } }}
                        >¥{formatcurrency(balance)}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default MonthlySummary
