import { z } from "zod";

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"]),
    date: z.string().min(1, { message: "日付は必須です" }),
    amount: z.number().min(1, { message: "金額は1円以上入力してください" }),
    content: z.string().min(1, { message: "内容は50文字以内にしてください" }),

    category: z.union([
        z.enum(["食費", "買い物", "住居費", "敗北", "交際費", "交通費", "救う"]),
        z.enum(["給与", "副業", "勝利", "その他"]),
        z.literal(""),
    ])
        .refine((val) => val !== "", {
            message: "カテゴリを選択してください"
        })
});

export type Schema = z.infer<typeof transactionSchema>