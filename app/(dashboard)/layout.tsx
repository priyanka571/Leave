
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";
import { cookies } from "next/headers";




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:3000/api/user/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  let user = null;

  if (res.ok) {
    const data = await res.json();
    user = data.user;
  }
  return (


    <div className="h-screen flex bg-gray-50">
      <Sidebar user={user}/>
      <div className="flex-1 flex flex-col">

        <Topbar user={user}/>


        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>


  );
}
