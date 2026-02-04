
import Pachete from "./Pachete";
import { getPacheteCached } from '../lib/get-pachete';

export default async function PacheteLoad(){
    
    const produse = await getPacheteCached();

    return <Pachete produse={produse || []} />;
}