import { FiArrowLeft } from "react-icons/fi";
import { BsCalendar4 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function RightBar() {
    
    
    return (
        <div>
            <div><FiArrowLeft size={20}/></div>
            <div><BsCalendar4 size={20}/></div>
            <div><IoMdNotificationsOutline size={20}/></div>
        </div>
    )
}