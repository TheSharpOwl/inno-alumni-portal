import { dashboardComponents } from "@/lib/profileData.lib"

export default function MainLayOut() {
    
    
    return (
        <>
            <div>
                {
                    dashboardComponents.map((dashboardComponent) => (
                        <div>
                            <div>
                                <h2 key={dashboardComponent.title}>{dashboardComponent.title}</h2>
                                <p key={dashboardComponent.title}>{dashboardComponent.description}</p>
                            </div>
                            <div key={dashboardComponent.title} className={dashboardComponent.img}></div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}