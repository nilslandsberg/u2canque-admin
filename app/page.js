import OrdersForToday from "./components/OrdersForToday";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-start h-screen bg-black pt-[160px]">
          <OrdersForToday />
        </div>
      </main>
    </>
  );
}
