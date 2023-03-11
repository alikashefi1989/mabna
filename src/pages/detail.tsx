import { useEffect, useState } from "react";
import { AssetService } from "../service/asset.service";
import { BidaskService } from "../service/bidask.service";
import { TradeService } from "../service/trade.service";
import { Loader } from "../tools/loader";
import { Error } from "../tools/error";

const assetService = new AssetService();
const tradeService = new TradeService();
const bidaskService = new BidaskService();

const Detail: React.FC = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    if (loader) return <Loader />;
    if (error) return <Error onTry={() => { }} />;

    return <></>;
};

export default Detail;