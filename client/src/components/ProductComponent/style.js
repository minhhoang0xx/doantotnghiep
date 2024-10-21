import { Image } from "antd";
import styled from 'styled-components'

export const WrapperImage = styled(Image)`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 10px;
min-height: 380px; 
min-width: 380px;   
background-size: cover;
background-position: center;
`

export const WrapperTitle = styled.h1`
     color: #000000;
     font-size: 24px;
     font-weight: 300;
     line-height: 32px;
     word-break: break-word;
`

export const WrapperTextSell = styled.span`
     color: #000000;
     font-size: 15px;
     line-height: 24px;
`

export const WrapperPrice = styled.div`
     background-color: blue
     border-radius: 4px;
`

export const WrapperPriceText = styled.h1`
     font-size: 32px;
     line-height: 40px;
     font-weight: 500;
     padding: 10px 0 0 30px ;
   
`

export const WrapperQuantity = styled.h1`
     font-size: 20px;
     line-height: 30px;
     font-weight: 400;
     padding: 0 0 0 30px;
`
export const WrapperDetail = styled.span`
     font-size: 15px;
     font-weight: 400;
     padding: 0 0 0 30px;
`