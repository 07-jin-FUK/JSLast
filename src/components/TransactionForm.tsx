
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HouseIcon from '@mui/icons-material/House';
import BlockIcon from '@mui/icons-material/Block';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HandshakeIcon from '@mui/icons-material/Handshake';
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    ListItemIcon,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ShutterSpeedOutlined } from "@mui/icons-material";
import { ExpenseCategory, IncomeCategory, Transaction } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from '../validations/schema';

interface TransactionFormProps {
    onCloseForm: () => void;
    isEntryDrawerOpen: boolean;
    currentDay: string;
    onSaveTransaction: (transaction: Schema) => Promise<void>;
    selectedTransaction: Transaction | null;
    onDeleteTransaction: (transactionID: string | readonly string[]) => Promise<void>;
    setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>
    onUpdateTransaction: (transaction: Schema, transactionID: string) => Promise<void>
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
    label: IncomeCategory | ExpenseCategory;
    icon: JSX.Element
}

const TransactionForm = ({
    onCloseForm,
    isEntryDrawerOpen,
    currentDay,
    onSaveTransaction,
    selectedTransaction,
    onDeleteTransaction,
    setSelectedTransaction,
    onUpdateTransaction,

}: TransactionFormProps) => {
    const formWidth = 320;

    const incomeCategories: CategoryItem[] = [
        { label: "給与", icon: <CurrencyYenIcon fontSize='small' /> },
        { label: "副業", icon: <AddBusinessIcon fontSize='small' /> },
        { label: "勝利", icon: <EmojiEventsIcon fontSize='small' /> },
        { label: "その他", icon: <AutoAwesomeIcon fontSize='small' /> },
    ];


    const expenseCategories: CategoryItem[] = [
        { label: "食費", icon: <RestaurantIcon fontSize='small' /> },
        { label: "買い物", icon: <ShoppingCartIcon fontSize='small' /> },
        { label: "住居費", icon: <HouseIcon fontSize='small' /> },
        { label: "敗北", icon: <BlockIcon fontSize='small' /> },
        { label: "交際費", icon: <Diversity3Icon fontSize='small' /> },
        { label: "交通費", icon: <DirectionsCarIcon fontSize='small' /> },
        { label: "救う", icon: <HandshakeIcon fontSize='small' /> },
    ];

    const [categories, setCategories] = useState(expenseCategories);

    const {
        control,
        setValue,
        watch,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Schema>({
        defaultValues: {
            type: "expense",
            date: currentDay,
            amount: 0,
            category: "",
            content: "",
        },
        resolver: zodResolver(transactionSchema),
    })

    // 収支タイプを切り替える関数
    const incomeExpenseToggle = (type: IncomeExpense) => {
        setValue("type", type);

        setValue("category", "")
    }

    // 収支のカテゴリを認識する関数
    const currentType = watch("type");

    useEffect(() => {
        const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
        setCategories(newCategories);
    }, [currentType]);



    useEffect(() => {
        setValue("date", currentDay);
    }, [currentDay]);

    // 送信処理
    const onSubmit: SubmitHandler<Schema> = (data) => {
        // console.log(data);

        if (selectedTransaction) {
            onUpdateTransaction(data, selectedTransaction.id)
                .then(() => {
                    setSelectedTransaction(null);
                })
                .catch((error) => {
                    console.error(error)
                })

        } else {
            onSaveTransaction(data)
                .then(() => {
                    setSelectedTransaction(null);
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        reset({
            type: "expense",
            date: currentDay,
            amount: 0,
            category: "",
            content: "",
        });
    };

    useEffect(() => {
        //    選択肢が更新されたか確認 
        if (selectedTransaction) {
            const categoryExists = categories.some(
                (category) => category.label === selectedTransaction.category
            );
            setValue("category", categoryExists ? selectedTransaction.category : "");
        }
    }, [selectedTransaction, categories])
    // フォーム内容を更新
    useEffect(() => {
        if (selectedTransaction) {
            setValue("type", selectedTransaction.type);
            setValue("date", selectedTransaction.date);

            setValue("amount", selectedTransaction.amount);
            setValue("content", selectedTransaction.content);
        } else {
            reset({
                type: "expense",
                date: currentDay,
                amount: 0,
                category: "",
                content: "",
            });
        }
    }, [selectedTransaction]);

    const handleDelete = () => {
        if (selectedTransaction) {
            onDeleteTransaction(selectedTransaction.id);
            setSelectedTransaction(null);
        }
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 64,
                right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
                width: formWidth,
                height: "100%",
                bgcolor: "background.paper",
                zIndex: (theme) => theme.zIndex.drawer - 1,
                transition: (theme) =>
                    theme.transitions.create("right", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                p: 2, // 内部の余白
                boxSizing: "border-box", // ボーダーとパディングをwidthに含める
                boxShadow: "0px 0px 15px -5px #777777",
            }}
        >
            {/* 入力エリアヘッダー */}
            <Box display={"flex"} justifyContent={"space-between"} mb={2}>
                <Typography variant="h6">入力</Typography>
                {/* 閉じるボタン */}
                <IconButton
                    onClick={onCloseForm}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            {/* フォーム要素 */}
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    {/* 収支切り替えボタン */}
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => {
                            console.log(field);
                            return (
                                <ButtonGroup fullWidth>
                                    <Button
                                        variant={field.value === "expense" ? "contained" : "outlined"}
                                        color="error"
                                        onClick={() => incomeExpenseToggle("expense")}>
                                        支出
                                    </Button>
                                    <Button
                                        variant={field.value === "income" ? "contained" : "outlined"}
                                        onClick={() => incomeExpenseToggle("income")}>収入</Button>
                                </ButtonGroup>

                            )
                        }}
                    />


                    {/* 日付 */}
                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                error={!!errors.date}
                                helperText={errors.date?.message}
                                {...field}
                                label="日付"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                        )}
                    />

                    {/* カテゴリ */}
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            // <TextField
                            //     error={!!errors.category}
                            //     helperText={errors.category?.message}
                            //     {...field}
                            //     id="カテゴリ"
                            //     label="カテゴリ"
                            //     select >
                            //     {categories.map((category, index) => (
                            //         <MenuItem value={category.label} key={index}>
                            //             <ListItemIcon>
                            //                 {category.icon}
                            //             </ListItemIcon>
                            //             {category.label}
                            //         </MenuItem>
                            //     ))}

                            // </TextField>
                            <FormControl fullWidth error={!!errors.category}>
                                <InputLabel id="category-select-label">カテゴリ</InputLabel>
                                <Select
                                    {...field}
                                    labelId="category-select-label"
                                    id="category-select"
                                    label="カテゴリ"
                                >
                                    {categories.map((category, index) => (
                                        <MenuItem value={category.label} key={index}>
                                            <ListItemIcon>
                                                {category.icon}
                                            </ListItemIcon>
                                            {category.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText> {errors.category?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                    {/* 金額 */}
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                                {...field}
                                value={field.value === 0 ? "" : field.value}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value, 10) || 0;
                                    field.onChange(newValue);
                                }}
                                label="金額"
                                type="number" />
                        )}
                    />
                    {/* 内容 */}
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                error={!!errors.content}
                                helperText={errors.content?.message}
                                {...field} label="内容" type="text" />
                        )}
                    />
                    {/* 保存ボタン */}
                    <Button
                        type="submit"
                        variant="contained"
                        color={currentType === "income" ? "primary" : "error"}
                        fullWidth
                    >
                        {selectedTransaction ? "更新" : "保存"}
                    </Button>
                    {/* 削除ボタン */}
                    {selectedTransaction && (
                        <Button onClick={handleDelete}
                            variant="outlined"
                            color={"secondary"}
                            fullWidth
                        >
                            削除
                        </Button>
                    )}

                </Stack>
            </Box>
        </Box>
    );
};
export default TransactionForm;
