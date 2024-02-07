import OrdersForTomorrow from "@/app/components/OrdersForTomorrow";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <div className="relative flex flex-col justify-start bg-black">
          <div className="relative flex flex-col z-30 p-5 text-2xl  
            text-white text-center items-center">
            <Image src='/images/U2CanQueLogo.svg' alt="logo" width={200} height={200} className="pb-2" />
            Order Management
          </div>
          <hr />
        </div>
        <div className="flex flex-col items-center justify-start h-screen bg-black pt-4">
          <div className="text-white z-35 font-bold text-xl">Orders For Tomorrow</div>
          <OrdersForTomorrow />
        </div>
      </main>
    </>
  );
}
