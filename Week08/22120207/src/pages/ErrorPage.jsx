import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main class="grid h-screen bg-[#f4f8ff] items-center px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-9xl font-bold text-red-600">404</p>
        <h1 class="mt-4 text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          Page not found
        </h1>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Link to={"/"}>
            <Button className={"hover:cursor-pointer"}>Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
