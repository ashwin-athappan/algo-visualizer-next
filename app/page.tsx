import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
          <Link className="bg-gray-600 font-bold text-2xl p-5 my-5" href={'/sorting'}>Sorting Visualizer</Link>
          <Link className="bg-gray-600 font-bold text-2xl p-5 my-5" href={'/chart'}>Compare Run time of different sorting algorithms</Link>
      </div>
  );
}
