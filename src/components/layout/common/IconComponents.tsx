import React from 'react'
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


const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
    給与: <CurrencyYenIcon fontSize='small' />,
    副業: <AddBusinessIcon fontSize='small' />,
    勝利: <EmojiEventsIcon fontSize='small' />,
    その他: <AutoAwesomeIcon fontSize='small' />,
    食費: <RestaurantIcon fontSize='small' />,
    買い物: <ShoppingCartIcon fontSize='small' />,
    住居費: <HouseIcon fontSize='small' />,
    敗北: <BlockIcon fontSize='small' />,
    交際費: <Diversity3Icon fontSize='small' />,
    交通費: <DirectionsCarIcon fontSize='small' />,
    救う: < HandshakeIcon fontSize='small' />
}

export default IconComponents


export type IncomeCategory = "給与" | "副業" | "勝利" | "その他";
export type ExpenseCategory = "食費" | "買い物" | "住居費" | "敗北" | "交際費" | "交通費" | "救う";