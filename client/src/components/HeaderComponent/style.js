import{Row} from 'antd';
import styled from 'styled-components'

export const WrapperHeader = styled(Row)`
    padding: 10px 0 10px 80px;
    background-color: #f5f5f5   ;
    gap: 0px;
    top: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    position: fixed; 
    width: 100%;
    transition: top 0.3s ease;
    border-radius: 0  0 15px 15px;
`

export const WrapperText = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: #000000  ;
    text-align: center;
`
export const WrapperAccount = styled.span`
    color: #000000  ;
    display: flex;
    text-align: right;
    gap: 30px;
    font-size: 15px
`