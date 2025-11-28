import { Button } from "@/components/ui/button";

export const Navbar = ({ onNavigate, activeView }) => {
  const menuItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Products", value: "products" },
    { label: "Orders", value: "orders" },
    { label: "Customers", value: "customers" },
  ];

  return (
    <div className="pb-12 w-[25%] border-r min-h-screen bg-[#f4f8ff] select-none">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 font-semibold tracking-tight text-slate-500 uppercase">
            Navigation
          </h2>
          <div className="space-y-1 pl-5">
            {menuItems.map((item) => (
              <Button
                key={item.value}
                variant={activeView === item.value ? "default" : "ghost"}
                onClick={() => onNavigate(item.value)}
                className={`w-full justify-start font-bold hover:cursor-pointer ${
                  activeView === item.value
                    ? ""
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
