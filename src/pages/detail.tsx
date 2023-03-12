import { useEffect, useState } from "react";
import { AssetService } from "../service/asset.service";
import { BidaskService } from "../service/bidask.service";
import { TradeService } from "../service/trade.service";
import { Loader } from "../tools/loader";
import { Error } from "../tools/error";
import { useParams } from "react-router-dom";
import { AssetEntity } from "../models/asset.model";
import { TradeEntity } from "../models/trade.model";
import styled from "@emotion/styled";

const assetService = new AssetService();
const tradeService = new TradeService();
const bidaskService = new BidaskService();

const Detail: React.FC = () => {
    const { id } = useParams();
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [asset, setAsset] = useState<AssetEntity | null>(null);
    const [trade, setTrade] = useState<TradeEntity | null>(null);
    const [orders, setOrders] = useState<Array<{
        ask_count: number;
        ask_price: number;
        ask_volume: number;
        order_rank: number;
    }>>([]);

    useEffect(() => {
        if (!id) return;
        getData(id, setAsset, setTrade, setOrders, setLoader, setError);
    }, [id]);

    if (loader) return <Loader />;
    if (error) return <Error onTry={() => {
        if (!id) return;
        getData(id, setAsset, setTrade, setOrders, setLoader, setError);
    }} />;

    return <>
        <DetailHead>لیست دارایی ها / نماد {` ${asset !== null && asset.value.trade_symbol}`}</DetailHead>
        <DetailSummary>
            <DetailSummaryRow>
                <DetailSummaryRowItem
                    color="blue"
                    fontSize={16}
                    fontWeight={800}
                    marginInline='10px'
                >
                    {` ${asset !== null && asset.value.trade_symbol}`}
                </DetailSummaryRowItem>
                <DetailSummaryRowItem
                    color="black"
                    fontSize={13}
                    fontWeight={600}
                    marginInline='10px'
                >
                    {` ${trade !== null ? trade.value.close_price?.toLocaleString('fa-IR') : ''}`}
                </DetailSummaryRowItem>
            </DetailSummaryRow>
            <DetailSummaryRow>
                <DetailSummaryRowItem
                    color="grey"
                    fontSize={10}
                    fontWeight={500}
                    marginInline='11px'
                >
                    {` ${asset !== null && asset.value.title}`}
                </DetailSummaryRowItem>
            </DetailSummaryRow>
        </DetailSummary>
        <SmallGridTitleWrapper>
            <SmallGridTitle>اطلاعات معاملات</SmallGridTitle>
            <SmallGridTitle>عرضه تقاضا</SmallGridTitle>
        </SmallGridTitleWrapper>
        <SmallGridsWrapper>
            <RightHandGridWrapper>
                <RightHandGridRow>
                    <span>پایانی:</span>
                    <span>{trade !== null ? trade.value.close_price?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
                <RightHandGridRow>
                    <span>بیشترین:</span>
                    <span>{trade !== null ? trade.value.high_price?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
                <RightHandGridRow>
                    <span>کمترین:</span>
                    <span>{trade !== null ? trade.value.low_price?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
                <RightHandGridRow>
                    <span>اولین:</span>
                    <span>{trade !== null ? trade.value.open_price?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
                <RightHandGridRow>
                    <span>آخرین:</span>
                    <span>{trade !== null ? trade.value.close_price?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
                <RightHandGridRow>
                    <span>حجم:</span>
                    <span>{trade !== null ? trade.value.volume?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
                <RightHandGridRow latest={true}>
                    <span>ارزش</span>
                    <span>{trade !== null ? trade.value.value?.toLocaleString('fa-IR') : ''}</span>
                </RightHandGridRow>
            </RightHandGridWrapper>
            <LeftHandGridWrapper>
                <LeftHandGridRow>
                    <LeftHandGridRowCell>دستور</LeftHandGridRowCell>
                    <LeftHandGridRowCell>تعداد</LeftHandGridRowCell>
                    <LeftHandGridRowCell>خرید</LeftHandGridRowCell>
                    <LeftHandGridRowCell>فروش</LeftHandGridRowCell>
                </LeftHandGridRow>
                {orders.length ? orders.map((value: { ask_count: number; ask_price: number; ask_volume: number; order_rank: number; }, index: number) => {
                    return <LeftHandGridRow key={index.toString()} latest={(orders.length - 1) === index}>
                        <LeftHandGridRowCell>{value?.order_rank?.toLocaleString('fa-IR')}</LeftHandGridRowCell>
                        <LeftHandGridRowCell>{value?.ask_count?.toLocaleString('fa-IR')}</LeftHandGridRowCell>
                        <LeftHandGridRowCell>{value?.ask_price?.toLocaleString('fa-IR')}</LeftHandGridRowCell>
                        <LeftHandGridRowCell>{value?.ask_volume?.toLocaleString('fa-IR')}</LeftHandGridRowCell>
                    </LeftHandGridRow>
                }) : null}
            </LeftHandGridWrapper>
        </SmallGridsWrapper>
    </>;
};

export default Detail;

const getData = async (
    id: string,
    setAsset: (value: React.SetStateAction<AssetEntity | null>) => void,
    setTrade: (value: React.SetStateAction<TradeEntity | null>) => void,
    setOrders: (value: React.SetStateAction<Array<{
        ask_count: number;
        ask_price: number;
        ask_volume: number;
        order_rank: number;
    }>>) => void,
    setLoader: (value: React.SetStateAction<boolean>) => void,
    setError: (value: React.SetStateAction<boolean>) => void,
) => {
    setError(false);
    setLoader(true);
    try {
        const res1 = await assetService.get(id);
        const res2 = await tradeService.getAll(`asset_id=${id}`);
        const res3 = await bidaskService.getAll(`asset_id=${id}`);
        setAsset(res1.data.data.length ? res1.data.data[0] : null);
        setTrade(res2.data.data.length ? res2.data.data[0] : null);
        const sortedList: Array<{
            ask_count: number;
            ask_price: number;
            ask_volume: number;
            order_rank: number;
        }> = res3.data.data.length ? res3.data.data[0].value.orders.sort((a: {
            ask_count: number;
            ask_price: number;
            ask_volume: number;
            order_rank: number;
        }, b: {
            ask_count: number;
            ask_price: number;
            ask_volume: number;
            order_rank: number;
        }) => a.order_rank >= b.order_rank ? -1 : 1) : [];
        setOrders(sortedList);
    } catch (error) {
        setError(true);
    } finally {
        setLoader(false);
    }
}

const DetailHead = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '50px',
    paddingBlock: '15px',
    color: 'blue',
    textAlign: 'start',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    direction: 'rtl',
    fontWeight: 600,
}))

const DetailSummary = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '80px',
    paddingBlock: '15px',
    textAlign: 'start',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    direction: 'rtl',
    fontWeight: 600,
    border: '1px solid grey',
    borderRadius: '5px',
    backgroundColor: 'white',
    marginBottom: '10px',
}))

const DetailSummaryRow = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    paddingBlock: '10px',
    paddingInline: '15px',
    textAlign: 'start',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    direction: 'rtl',
}))

const DetailSummaryRowItem = styled.span(({
    color,
    fontSize,
    fontWeight,
    marginInline
}: {
    color: string;
    fontSize: number;
    fontWeight: number;
    marginInline: string
}) => ({
    color,
    fontSize,
    fontWeight,
    marginInline,
}))

const SmallGridTitleWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    marginBottom: '5px',
    gap: '6px',
    direction: 'rtl',
}))

const SmallGridTitle = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'calc(50% - 3px)',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'start',
    direction: 'rtl',
    border: '1px solid grey',
    borderRadius: '5px',
    backgroundColor: 'white',
    color: 'black',
    paddingInline: '15px',
    fontWeight: 800,
    fontSize: '14px',
}))

const SmallGridsWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0,
    marginBottom: '5px',
    gap: '6px',
    direction: 'rtl',
}))

const RightHandGridWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'calc(50% - 3px)',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    direction: 'rtl',
    padding: '15px',
    backgroundColor: 'white',
    border: '1px solid grey',
    borderRadius: '5px',
    color: 'black',
}))

const RightHandGridRow = styled.div(({ latest }: { latest?: boolean }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'rtl',
    paddingBlock: '10px',
    borderBottom: `1px solid ${latest ? 'transparent' : 'grey'}`,
    color: 'black',
    fontWeight: 700,
}))

const LeftHandGridWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: 'calc(50% - 3px)',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    direction: 'rtl',
    padding: '15px',
    backgroundColor: 'white',
    border: '1px solid grey',
    borderRadius: '5px',
    color: 'black',
}))

const LeftHandGridRow = styled.div(({ latest }: { latest?: boolean }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    direction: 'rtl',
    paddingBlock: '10px',
    borderBottom: `1px solid ${latest ? 'transparent' : 'grey'}`,
    color: 'black',
    fontWeight: 700,
}))

const LeftHandGridRowCell = styled.div(({ latest }: { latest?: boolean }) => ({
    boxSizing: 'border-box',
    width: '25%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    direction: 'rtl',
    color: 'black',
    textAlign: 'center',
}))