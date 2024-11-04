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
    font-size: 34px;
    font-weight: 500;
    line-height: 32px;
    word-break: break-word;
    
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const WrapperTextSell = styled.span`
    color: #000000;
    font-size: 15px;
    line-height: 24px;
    
    @media (max-width: 768px) {
        font-size: 13px;
    }
`;

export const WrapperPrice = styled.div`
    color: darkorange;
    border-radius: 4px;


    @media (max-width: 768px) {

    }
`;

export const WrapperPriceText = styled.h1`
    font-size: 32px;
    line-height: 40px;
    font-weight: 500;

    
    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

export const WrapperQuantity = styled.div`
    font-size: 20px;
    line-height: 30px;
    font-weight: 400;
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const WrapperDetail = styled.p`
    font-size: 15px;
    font-weight: 400;
    margin-top: 10px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;
