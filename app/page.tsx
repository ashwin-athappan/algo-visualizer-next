import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
      <div>
          <h1 className="text-4xl text-center font-bold mt-10">Algorithms Visualizer</h1>
          <h1 className="text-2xl text-center mt-5">Choose any of the options below</h1>
          <div className="flex justify-center items-center h-[80vh]">
              <Link className="bg-gray-600 font-bold mx-5" href={'/sorting'}>
                  <Image className="h-[375px] w-[500px]" src="/img/sorting/sorting.jpg" height={50} width={50}
                         alt="sorting"/>
                  <h1>Sorting</h1>
              </Link>
              <Link className="bg-gray-600 font-bold mx-5" href={'/chart'}>
                  <Image className="h-[370px] w-[500px]" src="/img/chart/chart-js-guide-f.jpg" height={50} width={50}
                         alt="sorting"/>
                  <h1>Chart</h1>
              </Link>
          </div>
      </div>
  );
}
