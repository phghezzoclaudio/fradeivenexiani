import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/map/MapView"),
  { ssr: false }
);

export default function Page() {
  return (
    <main style={{ height: "100vh", width: "100%" }}>
      <MapView />
    </main>
  );
}