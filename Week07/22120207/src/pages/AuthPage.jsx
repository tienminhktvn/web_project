import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function AuthPage() {
  return (
    <div className="flex w-full items-center justify-center h-screen bg-slate-300">
      <img
        src="/shopping-logo.svg"
        alt="Shopping Logo"
        className="w-[40%] h-[40%] select-none"
      />

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className={"hover:cursor-pointer"}>
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className={"hover:cursor-pointer"}>
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
