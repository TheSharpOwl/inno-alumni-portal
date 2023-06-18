import LeftBar from "../../components/layout/leftBar"
import MainLayOut from "../../components/layout/mainLayout"

import { dashboardComponents } from "lib/profileData.lib"
import Link from "next/link"

export default function Dashboard() {
    return (
      <MainLayOut>
        <div className="flex h-full">
            <div className="flex flex-wrap w-2/3 items-center justify-center gap-8 m-auto">
                {
                    dashboardComponents.map((component) => (
                      
                        <Link href={component.link}>
                            <div  className="grid grid-cols-2 items-center bg-[#FFFFFF] h-[180px] w-[350px] rounded-lg shadow-lg text-start">
                                    <div className="pl-8">
                                        <h2 className="text-[#40BA21] font-bold text-[24px]" key={component.title}>{component.title}</h2>
                                        <p key={component.title}>{component.description}</p>
                                    </div>
                                    <div key={component.title} className={component.img}></div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
        </MainLayOut>
    )
}