import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e3f2fd',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px', // ここで高さを設定
    display: 'flex', // Flexboxの有効化
    alignItems: 'center', // 縦方向の中央揃え
    justifyContent: 'center', // 横方向の中央揃え
    fontSize: "25px"
}));

const BlackItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e8f5e9',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px', // ここで高さを設定
    display: 'flex', // Flexboxの有効化
    alignItems: 'center', // 縦方向の中央揃え
    justifyContent: 'center', // 横方向の中央揃え
    fontSize: "25px"
}));

const RedItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffebee',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px', // ここで高さを設定
    display: 'flex', // Flexboxの有効化
    alignItems: 'center', // 縦方向の中央揃え
    justifyContent: 'center', // 横方向の中央揃え
    fontSize: "40px"
}));


const details = {

    invest: '投資を始めるなら、まずは非課税のNISA、Idecoを始めましょう。長期的な目線で物事を考えることがベストです。短期的なFXなどのトレーディングは残念ながらあなたには向いていません。<a href="https://go.sbisec.co.jp/lp/lp_nisa_231117.html?gclsrc=aw.ds&&waad=huIO9M2U&utm_content=lp180-txt234-img000&vtnq=01sm&gad_source=1&gclid=Cj0KCQjwjLGyBhCYARIsAPqTz1-qM9kdW3S0vclpVwmV8ySRg3aTF4jZrlVLSq0V3Ppqo37UmGB11GAaAn95EALw_wcB" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://www.manulife.co.jp/ja/individual/about/insight/column/article/column122/_jcr_content/root/responsivegrid_641029165/responsivegrid_19992/image_1622237378.coreimg.82.1000.jpeg/1683013791985/122-nisa-idecomv.jpeg" alt="投資" style="max-width: 100%; height: auto;"/>',
    gamble: 'どうせ選ぶなら勝率の高いギャンブルにしましょう。人気が高いのは競馬ですが、勝率が高いとされるのは競艇のようですよ。<a href="https://www.boatrace.jp/" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://wsobv.com/boatrace/wp-content/uploads/%E5%B8%B8%E6%BB%91%E7%AB%B6%E8%89%87%E5%A0%B4%E3%81%A6%E3%82%99%E5%8B%9D%E3%81%A4%E3%81%9F%E3%82%81%E3%81%AE%E4%BA%88%E6%83%B3%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB%EF%BC%81%E7%89%B9%E5%BE%B4%E3%81%A8%E5%82%BE%E5%90%91%E3%82%92%E5%BE%B9%E5%BA%95%E5%88%86%E6%9E%90.jpg" alt="ギャンブル" style="max-width: 100%; height: auto;" />',
    points: 'あなたにあったポイ活を紹介します。随時更新中！<a href="https://poikatsu.enjoy.point.auone.jp/info/" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://mama.chintaistyle.jp/article/wp-content/uploads/2023/03/35219fead7cfc426c4dce0c060548783.jpg" alt="ポイ活" style="max-width: 100%; height: auto; "/>',
    hozyo: '世間では使ったこともない補助金がまだまだ多く存在します。国は教えてくれません。自分でつかみ取るのです。<a href="https://mymo-ibank.com/money/4801" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://www.kbb-id.co.jp/cmwp/wp-content/uploads/2022/05/main-start-up-business-subsidy-scaled.jpeg" alt="ポイ活" style="max-width: 100%; height: auto; "/>',
    sell: '家で眠っているコレクションや服、本。売ってお金にしませんか？市場さえおさえておけばプレミア価格で一気に資金調達！<a href="https://my-best.com/2081" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://fanfunfukuoka.nishinippon.co.jp/wp-content/uploads/photo/upload_photo/data/5209455/xlarge_9fb08a9d-e1bc-453f-b26a-d27800edb168.jpeg" alt="ポイ活" style="max-width: 100%; height: auto; "/>',
    buy: 'お金が欲しいのになぜ買うコマンドが？宝くじは夢を買えますよ。お金、、、増えるといいですね。<a href="https://www.takarakuji-official.jp/" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgmutdDI4LmK0lojAIeqLmrrIydrJYUkEOdqT47Qm3Sw&s" alt="ポイ活" style="max-width: 100%; height: auto; "/>',
    work: '上記を試してみてわかったと思います。稼ぐ方法、もっと働きましょう。ここではお勧めの副業について解説しています。<a href="https://kigyo.gmo/magazine/sidejob/" target="_blank" rel="noopener noreferrer">こちら</a>をご覧ください。<br /><img src="https://column.kigyo.gmo/wp-content/uploads/2022/09/2208_01-sidejob.jpeg" alt="ポイ活" style="max-width: 100%; height: auto; "/>',
};


export default function Secret() {
    const [open, setOpen] = React.useState(false);
    const [detail, setDetail] = React.useState<string>('');

    const handleClickOpen = (detail: string) => {
        setDetail(detail);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDetail('');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item onClick={() => handleClickOpen(details.invest)}>投資で稼ぐ</Item>
                </Grid>
                <Grid item xs={4}>
                    <BlackItem onClick={() => handleClickOpen(details.gamble)}>ギャンブルで稼ぐ</BlackItem>
                </Grid>
                <Grid item xs={4}>
                    <Item onClick={() => handleClickOpen(details.points)}>ポイ活で貯める</Item>
                </Grid>
                <Grid item xs={4}>
                    <BlackItem onClick={() => handleClickOpen(details.hozyo)}>補助金を使う</BlackItem>
                </Grid>
                <Grid item xs={4}>
                    <Item onClick={() => handleClickOpen(details.sell)}>売る</Item>
                </Grid>
                <Grid item xs={4}>
                    <BlackItem onClick={() => handleClickOpen(details.buy)}>買う</BlackItem>
                </Grid>
                <Grid item xs={12}>
                    <RedItem onClick={() => handleClickOpen(details.work)}>もっと働く</RedItem>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>詳細情報</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span dangerouslySetInnerHTML={{ __html: detail }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
