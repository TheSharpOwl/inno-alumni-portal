import { FiArrowLeft } from "react-icons/fi";
import { BsCalendar4 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function RightBar() {
    
    
    return (
        <div className="text-[#40BA21] w- mx-auto">
            <div className="bg-[#E5E5E5] rounded-full pt-10 w-8 h-8"><FiArrowLeft size={20}/></div>
            <div className="pt-10"><BsCalendar4 size={20}/></div>
            <div className="pt-10"><IoMdNotificationsOutline size={20}/></div>
        </div>
    )
}