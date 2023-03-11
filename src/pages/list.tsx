import { useEffect, useState } from "react";
import { AssetEntity } from "../models/asset.model";
import { TradeEntity } from "../models/trade.model";
import { AssetService } from "../service/asset.service";
import { TradeService } from "../service/trade.service";
import { Loader } from "../tools/loader";
import { Error } from "../tools/error";

const assetService = new AssetService();
const tradeService = new TradeService();

const List: React.FC = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [assets, setAssets] = useState<Array<AssetEntity>>([]);
    const [trades, setTrades] = useState<Array<TradeEntity>>([]);

    useEffect(() => {
        getAllAssets(setAssets, setLoader, setError);
        getAllTrades(setTrades, setLoader, setError);
    }, []);

    if (loader) return <Loader />;
    if (error) return <Error
        onTry={() => {
            getAllAssets(setAssets, setLoader, setError);
            getAllTrades(setTrades, setLoader, setError);
        }} />;

    return <></>;
};

export default List;

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

const getAllTrades = async (
    setTrades: (value: React.SetStateAction<Array<TradeEntity>>) => void,
    setLoader: (value: React.SetStateAction<boolean>) => void,
    setError: (value: React.SetStateAction<boolean>) => void,
) => {
    setError(false);
    setLoader(true);
    try {
        const res = await tradeService.getAll();
        setTrades(res.data.data);
    } catch (error) {
        setError(true);
    } finally {
        setLoader(false);
    }
}