import PacheteClient from "../components/PacheteClient";
import { getPacheteCached } from "@/lib/get-pachete";

export const dynamic = "force-dynamic";

export default async function PacheteLoad() {

  const pachete = await getPacheteCached();

  return <PacheteClient data={pachete || []} />;
}