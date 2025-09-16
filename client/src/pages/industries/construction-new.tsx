import IndustryTemplate from "@/components/industry-template";
import { industriesData } from "@/data/industries";

export default function Construction() {
  return <IndustryTemplate data={industriesData.construction} />;
}