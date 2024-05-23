import { Box, Button, Paper } from "@mui/material";
import * as React from "react";
import * as ReactDOM from "react-dom";

const Save3: React.FC = () => {
    // 初期クリック回数をlocalStorageから読み込む
    const initialClickCount = parseInt(localStorage.getItem("clickCount") || "0", 10);
    const [clickCount, setClickCount] = React.useState(initialClickCount);

    const handleClick = () => {
        // 新しいクリック回数を計算
        const newCount = clickCount + 1;
        // localStorageに保存
        localStorage.setItem("clickCount", newCount.toString());
        // 状態を更新
        setClickCount(newCount);
        // リンク先に遷移
        window.location.href = "https://www.unicef.or.jp/cooperate/coop_monthly_conflict23.html?utm_source=google&utm_medium=cpc&utm_campaign=google_main_brand_unicefbokin_exactmatch&cd=pc125&gad_source=1&gclid=Cj0KCQjwjLGyBhCYARIsAPqTz1-vDs7H20HIQe7kdU28MEoWLJp3L9SzB4Yb2qtyQv-kDwFLkuL8TZcaArGOEALw_wcB";
    };

    const countryClick = () => {
        // 新しいクリック回数を計算
        const newCount = clickCount + 1;
        // localStorageに保存
        localStorage.setItem("clickCount", newCount.toString());
        // 状態を更新
        setClickCount(newCount);
        // リンク先に遷移
        window.location.href = "https://lp.tnfportal.jp/saigai/?gad_source=1&gclid=Cj0KCQjwjLGyBhCYARIsAPqTz1-4iGej4-9qEX0wEob1ilxh3Rpc1iU1Mk5JHy5BAzN3Z8YnOFQeljcaAtkkEALw_wcB";
    };

    return (
        <Paper elevation={3}>
            <div style={{
                position: 'relative',
                textAlign: 'center',
                backgroundImage: 'url("https://www.sbbit.jp/article/image/35707/660_bit201811211105096059.jpg")', // 背景画像のURLを指定
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '90vh',
                color: "white"
            }}>
                {/* 半透明のオーバーレイ */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)' // 背景を黒で50%透明に設定
                }} />

                {/* コンテンツ */}
                <div style={{
                    position: 'relative',
                    zIndex: 1, // オーバーレイの上に表示するためにz-indexを設定
                    padding: '20px',
                    fontFamily: "Noto Sans Jp"
                }}>
                    <h1 style={{ fontSize: "40px" }}>救う（Save）</h1>
                    <h1 style={{ fontSize: "50px", color: "yellow" }}>国を救おうとした回数: {clickCount}</h1>
                    <h2>人生お金がすべてではありません。</h2>
                    <h2>収支をつけて浮いているそのお金で</h2>
                    <h2>人を想い、人の為に行動してみませんか？</h2>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box mr={10}>
                            <Button
                                onClick={handleClick}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    backgroundColor: 'red',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px'
                                }}
                            >
                                世界を救う
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                onClick={countryClick}
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    backgroundColor: 'blue',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px'
                                }}
                            >
                                国を救う
                            </Button>
                        </Box>
                    </Box>
                </div>
            </div>
        </Paper>
    );
};

export default Save3;
