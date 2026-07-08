
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
     
        <div className="h-screen flex bg-gray-50 overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Topbar />

            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      
   
  );
}
