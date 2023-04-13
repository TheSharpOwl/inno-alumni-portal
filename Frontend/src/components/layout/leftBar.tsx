import { RiLogoutBoxRLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi";
import { BiUserPin, BiNetworkChart } from "react-icons/bi";
import { SlNotebook } from "react-icons/sl";
import { BsBuildingLock } from "react-icons/bs";
import styles from '../../styles/Image.module.css'

export default function LeftBar() {
    const user_name = 'James'
    
    return (
        <div className="bg-[#2A347B] text-[#FFF]">
            <div>
                <div className={styles.logoAlumni}></div>
            </div>
            <div>
                <div><HiUserCircle size={48}/></div>
                { user_name }
            </div>

            <div>
                <div>
                    <div className="text-[#40BA21]"><BiUserPin size={24}/></div>
                    <div>Personal data</div>
                </div>
                <div>
                    <div className="text-[#40BA21]"><SlNotebook size={24}/></div>
                    <div>Courses</div>
                </div>
                <div>
                    <div className="text-[#40BA21]"><BsBuildingLock size={24}/></div>
                    <div>Pass</div>
                </div>
                <div>
                    <div className="text-[#40BA21]"><BiNetworkChart size={24}/></div>
                    <div>Community</div>
                </div>
                <div>
                    <div className="text-[#40BA21]"><RiMoneyDollarBoxLine size={24}/></div>
                    <div>Donation</div>
                </div>
            </div>

            <div>
                <div className="text-[#40BA21]"><RiLogoutBoxRLine size={24}/></div>
                <div>Log Out</div>
            </div>
        </div>
    )
}