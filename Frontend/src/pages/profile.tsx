import LeftBar from "@/components/layout/leftBar"
import MainLayOut from "@/components/layout/mainLayOut"
import RightBar from "@/components/layout/rightBar"

export default function Profile() {
    return (
        <div className="flex justify-between">
            <div className="w-72"><LeftBar /></div>
            <div className="w-[80%]"><MainLayOut /></div>
            <div className="w-20"><RightBar /></div>
        </div>
    )
}