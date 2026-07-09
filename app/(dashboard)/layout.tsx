
import Sidebar from "@/Components/Sidebar";
import Topbar from "@/Components/Topbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
     
        <div className="h-screen flex bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex flex-col">
          
            <Topbar />

           
             <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      
   
  );
}
