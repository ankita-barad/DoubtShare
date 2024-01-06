import { useEffect, useState } from "react";
import { DoubtsList } from "../components/doubts-list";
import { getDoubts } from "../services/doubt.api";

export default function Home() {
  const [resolvedDoubts, setResolvedDoubts] = useState([]);
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    getDoubts({ resolved: true }).then((d) => setResolvedDoubts(d));
    getDoubts({ resolved: false }).then((d) => setDoubts(d));
  }, []);

  return (
    <div>
      <div className="flex flex-grow">
        <div className="flex-grow p-4 bg-gray-200">
          <h2 className="text-xl font-semibold mb-4">Active Ongoing Doubts</h2>
          <DoubtsList doubts={doubts} />
        </div>

        <div className="w-1/3 p-4 bg-gray-300">
          <h2 className="text-xl font-semibold mb-4">Resolved Doubts</h2>
          <DoubtsList doubts={resolvedDoubts} />
        </div>
      </div>
    </div>
  );
}
