import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BsCalendar4 } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import { IoMdClose } from "react-icons/io"

export default function RightBar({ className, ...props }) {
    const [showFullRightBar, setShowFullRightBar] = useState(false);

    return (
        <div className={`  ${className}`} {...props} >
            <div className="flex justify-center items-center bg-[#e7f5ff] text-[#3fba21] rounded-full mt-10 w-12 h-12 cursor-pointer"
                onClick={() => setShowFullRightBar(!showFullRightBar)}
            >
                {showFullRightBar ? <FiArrowRight size={20}/> : <FiArrowLeft size={20} />}
            </div>
            {!showFullRightBar &&
                <div className="flex flex-col items-center">
                    <div className="mt-10 text-[#3fba21]">
                        <BsCalendar4 size={20} />
                    </div>
                    <div className="mt-10 text-[#3fba21]">
                        <IoMdNotificationsOutline size={28} />
                    </div>
                </div>
            }
            {showFullRightBar &&
            <div className="w-72">
                <div className="flex flex-col items-center mt-10">
                    <div className="flex bg-white rounded-xl border-4 mb-2">
                        <div className="flex flex-col items-end text-green-400 px-7 py-2 bg-gray-100 rounded-l-lg rounded-r-xl">
                            <div className="text-[30px]">12</div>
                            <div className="pt -mt-2">dec</div>
                        </div>
                        <div className="px-5 py-2 flex flex-col justify-center">
                            <div className="text-lg">Webinar</div>
                            <div className="pt-1 text-gray-400"> 12:30 </div>
                        </div>
                        <div className="px-5 py-2 flex flex-col items-end justify-center">
                            <IoMdClose size={28} />
                            <div className="pt-1 text-gray-400">online</div>
                        </div>
                    </div>
                     <div className="flex bg-white rounded-xl border-4 mb-2">
                        <div className="flex flex-col items-end text-green-400 px-7 py-2 bg-gray-100 rounded-l-lg rounded-r-xl">
                            <div className="text-[30px]">12</div>
                            <div className="pt -mt-2">dec</div>
                        </div>
                        <div className="px-5 py-2 flex flex-col justify-center">
                            <div className="text-lg">Webinar</div>
                            <div className="pt-1 text-gray-400"> 12:30 </div>
                        </div>
                        <div className="px-5 py-2 flex flex-col items-end justify-center">
                            <IoMdClose size={28} />
                            <div className="pt-1 text-gray-400">online</div>
                        </div>
                    </div>
                
                    <div className=" bg-white p-5 rounded-xl border-4 mb-2 mt-16">
                        <div className="flex justify-between mb-3">
                            <div> Head of notification long or short (about 2 line) </div>
                            <div className=" flex items-center ml-3">  <IoMdClose size={28} /> </div>
                        </div>
                        <div className="mb-6"> 
                            <div className="text-gray-400"> 
                            News description, additional information, time, place, format and other (about 3 line) 
                            </div>
                        </div>
                        <div className="text-green-400"> READ </div>
                    </div>
                    <div className=" bg-white p-5 rounded-xl border-4 mb-2">
                        <div className="flex justify-between mb-3">
                            <div> Head of notification long or short (about 2 line) </div>
                            <div className=" flex items-center ml-3">  <IoMdClose size={28} /> </div>
                        </div>
                        <div className="mb-6"> 
                            <div className="text-gray-400"> 
                            News description, additional information, time, place, format and other (about 3 line) 
                            </div>
                        </div>
                        <div className="text-green-400"> READ </div>
                    </div>
                </div>
                
            </div>
            }
        </div>
    )
}