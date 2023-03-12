import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from 'react-window';
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { AssetEntity } from "../models/asset.model";
import { AssetService } from "../service/asset.service";
import { Loader } from "../tools/loader";
import { Error } from "../tools/error";
import { RootState } from "../redux/store";
import { TradeEntity } from "../models/trade.model";
import { TradeService } from "../service/trade.service";

const assetService = new AssetService();
const tradeService = new TradeService();

const List: React.FC = () => {
    const globalSearchValue = useSelector((state: RootState) => state.globalSearch.value)
    const [height, setHeight] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [assets, setAssets] = useState<Array<AssetEntity>>([]);
    const gridWrapperRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        getAllAssets(setAssets, setLoader, setError);
        setTimeout(() => {
            if (gridWrapperRef.current !== null) {
                setHeight(gridWrapperRef.current.parentElement?.clientHeight || 0)
            }
        }, 500);
    }, []);

    if (loader) return <Loader />;
    if (error) return <Error onTry={() => { getAllAssets(setAssets, setLoader, setError); }} />;

    return <GridWrapper ref={gridWrapperRef} height={height - 31}>
        <GridHeader>
            <GridHeaderCell widthPercent={15}>نماد</GridHeaderCell>
            <GridHeaderCell widthPercent={25}>نام شرکت</GridHeaderCell>
            <GridHeaderCell widthPercent={15}>آخرین قیمت</GridHeaderCell>
            <GridHeaderCell widthPercent={15}>ارزش معاملات</GridHeaderCell>
        </GridHeader>
        {height && <GridBody>
            <FixedSizeList
                className="List"
                height={(height - 91)}
                itemData={assets.filter((value: AssetEntity) => value.value.title?.includes(globalSearchValue) || value.value.trade_symbol?.includes(globalSearchValue))}
                itemCount={assets.filter((value: AssetEntity) => value.value.title?.includes(globalSearchValue) || value.value.trade_symbol?.includes(globalSearchValue)).length}
                itemSize={2}
                width={'100%'}
                useIsScrolling
                direction="rtl"
            >
                {Row}
            </FixedSizeList>
        </GridBody>}
    </GridWrapper>;
};

export default List;

const Row = ({ index, data, ...rest }: { index: number, data: Array<AssetEntity> }) => {
    const navigate = useNavigate();
    const [trade, setTrade] = useState<TradeEntity | null | string>(null);
    useEffect(() => {
        getTradeByAssetId(data[index].entity.id, setTrade)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <GridBodyRow>
        <GridHeaderCell widthPercent={15} color='blue' onClick={() => navigate(`/assets/${data[index].entity.id}`)}>
            {data[index].value.trade_symbol}
        </GridHeaderCell>
        <GridHeaderCell widthPercent={25}>
            {data[index].value.title}
        </GridHeaderCell>
        <GridHeaderCell widthPercent={15}
            onClick={() => {
                if (typeof trade !== 'string') return;
                getTradeByAssetId(data[index].entity.id, setTrade)
            }}
        >
            {
                trade === null
                    ? 'در حال بارگزاری ...'
                    : typeof trade === 'string'
                        ? trade
                        : trade.value.close_price?.toLocaleString('fa-IR') || ''
            }
        </GridHeaderCell>
        <GridHeaderCell widthPercent={15}
            onClick={() => {
                if (typeof trade !== 'string') return;
                getTradeByAssetId(data[index].entity.id, setTrade)
            }}
        >
            {
                trade === null
                    ? 'در حال بارگزاری ...'
                    : typeof trade === 'string'
                        ? trade
                        : trade.value.value?.toLocaleString('fa-IR') || ''
            }
        </GridHeaderCell>
        <GridBodyRowBottomBorder></GridBodyRowBottomBorder>
    </GridBodyRow>
};

const getAllAssets = async (
    setAssets: (value: React.SetStateAction<Array<AssetEntity>>) => void,
    setLoader: (value: React.SetStateAction<boolean>) => void,
    setError: (value: React.SetStateAction<boolean>) => void,
) => {
    setError(false);
    setLoader(true);
    try {
        const res = await assetService.getAll();
        setAssets(res.data.data);
    } catch (error) {
        setError(true);
    } finally {
        setLoader(false);
    }
}

const getTradeByAssetId = async (
    id: string,
    setTrade: (value: React.SetStateAction<TradeEntity | null | string>) => void
) => {
    try {
        const res = await tradeService.getAll(`asset_id=${id}`);
        setTrade(res.data.data.length ? res.data.data[0] : '---');
    } catch (error) {
        setTrade('Error - try again');
    }
}

const GridWrapper = styled.div(({ height }: { height: number }) => ({
    boxSizing: 'border-box',
    width: '100%',
    height: `${height}px`,
    // direction: 'rtl',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
}))

const GridHeader = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '50px',
    direction: 'rtl',
    padding: 0,
    paddingInline: '30px',
    margin: 0,
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    border: '1px solid grey',
    borderRadius: '5px',
    color: 'black',
    fontWeight: 800,
    backgroundColor: 'white',
}))

const GridHeaderCell = styled.div(({ widthPercent, color }: { widthPercent: number, color?: string }) => ({
    boxSizing: 'border-box',
    width: `${widthPercent}%`,
    height: '100%',
    direction: 'rtl',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'start',
    color: color ? color : 'black',
    cursor: color ? 'pointer' : 'auto',
}))

const GridBody = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    direction: 'rtl',
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
    border: '1px solid grey',
    borderRadius: '5px',
}))

const GridBodyRow = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: '50px',
    direction: 'rtl',
    padding: 0,
    paddingInline: '30px',
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'black',
    fontWeight: 600,
    backgroundColor: 'white',
    position: 'relative',
}))

const GridBodyRowBottomBorder = styled.div(() => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 'calc(100% - 40px)',
    height: '1px',
    backgroundColor: 'grey',
}))