import { Charts } from "./components/charts";

export default function Page() {
  return (
    <div>
        <h1 className="text-2xl font-bold ml-2">Dashboard </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <Charts />
        <Charts />
        <Charts />
        <Charts />
        {/* Add more <Charts /> as needed */}
      </div>
    </div>
  );
}
