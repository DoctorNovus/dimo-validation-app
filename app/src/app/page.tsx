import VehicleInterface from "@/_components/Vehicle/VehicleInterface";
import DimoInterface from "@components/DIMO/DimoInterface";

export default function Home() {
  return (
    <div>
      <DimoInterface />
      <VehicleInterface />
    </div>
  );
}
