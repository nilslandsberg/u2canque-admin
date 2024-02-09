import OrdersForToday from "./components/OrdersForToday";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-start bg-black pt-[160px]">
          <div className="max-w-screen-lg w-full h-screen overflow-auto">
            <OrdersForToday />
          </div>
        </div>
      </main>
    </>
  );
}
