import { useState } from "react";
import Button from "../components/ui/Button";
import { ShoppingBag } from "lucide-react";
import OrdersModal from "../components/orders/OrdersModal";

const HomePage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <div className="bg-[#f5eef4] w-full min-h-screen">
      <div className="flex justify-between">
        <p className="text-2xl ml-6 mt-1 font-bold">Orders In Pending👀</p>
        <Button
          text="Create Order"
          onClick={() => {
            setIsModal(true);
          }}
          Icon={<ShoppingBag />}
        />
      </div>
      {isModal && (
        <OrdersModal isOpen={isModal} onClose={() => setIsModal(false)} />
      )}
      <div className="flex flex-col px-4"></div>
    </div>
  );
};

export default HomePage;
