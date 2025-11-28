import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { House, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";

const Header = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const initials = user?.username.substring(0, 2).toUpperCase();

  return (
    <nav className="border-b bg-[#f4f8ff] px-8 py-4 flex items-center justify-between">
      <div className="flex gap-3 items-center select-none">
        <button onClick={() => onNavigate("dashboard")}>
          <House
            size={32}
            className="text-blue-600 hover:cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95"
          ></House>
        </button>
        <h2 className="font-bold text-xl leading-none">MyShop</h2>
        <p className="text-sm text-muted-foreground">Product showcase</p>
      </div>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger className={"hover:cursor-pointer"} asChild>
            <Button
              variant="outline"
              className="group rounded-full pl-2 pr-4 h-12 gap-3 border-slate-200"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-slate-200 text-slate-600 text-xs transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-blue-700">
                  {user.fullname}
                </span>
              </div>
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-56" align="end">
            <div className="space-y-1">
              <h4 className="font-medium px-2 py-1.5 text-sm">My Account</h4>
              <div className="border-b border-slate-100 mb-2"></div>

              {/* Profile Button */}
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-slate-600 hover:cursor-pointer"
                onClick={() => onNavigate("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>

              {/* Logout Button */}
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-red-600 hover:text-red-600 hover:bg-red-50 hover:cursor-pointer"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Header;
