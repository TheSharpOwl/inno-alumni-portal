import LeftBar from "./leftBar"
import RightBar from "./rightBar"

export default function MainLayOut({children}) {
    
    
    return (
        <div className="flex">
            <LeftBar className="bg-[#2A347B] text-white pt-[51px] px-4 h-screen min-w-fit w-72 flex-initial" />
            <main className="flex-grow bg-[#f8fbff] p-20">{children}</main>
            <RightBar className="px-6" />
        </div>
    )
}