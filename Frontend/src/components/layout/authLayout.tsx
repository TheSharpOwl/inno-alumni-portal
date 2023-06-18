import Header from "./header";

export default function AuthLayOut({children}: {children: React.ReactNode}): JSX.Element {
  return (
      <div className="h-screen bg-[#2A347B] text-sm font-['IBM Plex Sans']">
        <Header />
        <div className="flex items-center h-[95%]">
          <div className="m-auto bg-[#E5E5E5] text-[#777777] rounded-md w-5/6 md:w-3/6 lg:w-2/6">
              <div className="text-center py-10">
                {children}
              </div>
          </div>  
        </div>
      </div>
  )
}
