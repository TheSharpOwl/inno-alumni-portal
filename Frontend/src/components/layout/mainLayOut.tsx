import { dashboardComponents } from "@/lib/profileData.lib"

export default function MainLayOut() {
    
    
    return (
        <div className="bg-[#E5E5E5] h-full">
            <div className="grid m-auto lg:grid-cols-2 h-screen place-items-center lg:h-3/5 lg:pt-32 lg:w-10/12 xl:h-4/6 xl:w-3/5 xl:ml-24">
                {
                    dashboardComponents.map((dashboardComponent) => (
                        <button className="grid grid-cols-2 items-center bg-[#FFFFFF] h-[180px] w-[350px] rounded-lg shadow-lg text-start">
                            <div className="pl-8">
                                <h2 className="text-[#40BA21] font-bold text-[24px]" key={dashboardComponent.title}>{dashboardComponent.title}</h2>
                                <p key={dashboardComponent.title}>{dashboardComponent.description}</p>
                            </div>
                            <div key={dashboardComponent.title} className={dashboardComponent.img}></div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}