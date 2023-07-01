import { RiLogoutBoxRLine, RiMoneyDollarBoxLine } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi";
import { BiUserPin, BiNetworkChart } from "react-icons/bi";
import { SlNotebook } from "react-icons/sl";
import { BsBuildingLock } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from '../../styles/image.module.css'
import { apiEndPoint } from "../../constants";

type UserProfileType = {
    email: string;
    name: string;
    name_russian?: string;
    telegram?: string;
    graduation_year?: number;
    filed_of_study?: string;
    bio?: string;
    city?: string;
    company?: string;
    position?: string;
}

export default function LeftBar({className, ...props}) {
    const [user, setUser] = useState<UserProfileType | null>(null);

    const router = useRouter();
    const fetchAlumniProfile = () => {
        const token = localStorage.getItem("alumni-token");
        axios.get(`${apiEndPoint}/accounts/profile`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `TOKEN ${token}`,
            }})
            .then(res => {
                const userData: UserProfileType = res.data;
                setUser(userData);
                console.log(userData)
            }).catch(function(err) {
                console.log('Error: ', err);
            }
        )
    }
    useEffect(() => {
        fetchAlumniProfile()
    }
    ,[])

    const handleLogout = (event) => {
        localStorage.clear();
        router.push('/login');
    }
    
    return (
        <div className={`${className} `} {...props}>
            <div>
                <Link href="/dashboard">
                    <div className={styles.logoAlumni}></div>
                </Link>
            </div>
            <div className="flex items-center pt-[68.2px]">
                <div className="pr-4"><HiUserCircle size={48}/></div>
                { user?.name }
            </div>

            <div className="pt-[15%] pb-[70%]">
                <div className="py-[10px]">
                    <Link href="/profile">
                        <button className="flex items-center bg-transparent h-12 w-full hover:bg-[#333E82] active:bg-[#505B95] font-semibold py-2 px-4 hover:border-transparent rounded">
                            <div className="text-[#40BA21] pr-4"><BiUserPin size={30}/></div>
                            <div>Personal data</div>
                        </button>
                    </Link>
                </div>
                <div className="py-[10px]">
                    <Link href="/course">
                        <button className="flex items-center bg-transparent h-12 w-full hover:bg-[#333E82] active:bg-[#505B95] font-semibold py-2 px-4 hover:border-transparent rounded">
                            <div className="text-[#40BA21] pr-4"><SlNotebook size={24}/></div>
                            <div>Courses</div>
                        </button>
                    </Link>
                </div>
                <div className="py-[10px]">
                    <Link href="/pass">
                        <button className="flex items-center bg-transparent h-12 w-full hover:bg-[#333E82] active:bg-[#505B95] font-semibold py-2 px-4 hover:border-transparent rounded">
                            <div className="text-[#40BA21] pr-4"><BsBuildingLock size={24}/></div>
                            <div>Pass</div>
                        </button>
                    </Link>
                </div>
                <div className="py-[10px]">
                    <Link href="#">
                        <button className="flex items-center bg-transparent h-12 w-full hover:bg-[#333E82] active:bg-[#505B95] font-semibold py-2 px-4 hover:border-transparent rounded">
                            <div className="text-[#40BA21] pr-4"><BiNetworkChart size={24}/></div>
                            <div>Community</div>
                        </button>
                    </Link>
                </div>
                <div className="py-[10px]">
                    <Link href="/donation">
                        <button className="flex items-center bg-transparent h-12 w-full hover:bg-[#333E82] active:bg-[#505B95] font-semibold py-2 px-4 hover:border-transparent rounded">
                            <div className="text-[#40BA21] pr-4"><RiMoneyDollarBoxLine size={24}/></div>
                            <div>Donation</div>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center">
                <button onClick={handleClick} className="flex items-center bg-transparent h-12 w-full hover:bg-[#333E82] active:bg-[#505B95] font-semibold py-2 px-4 hover:border-transparent rounded">
                    <div className="text-[#40BA21] pr-4"><RiLogoutBoxRLine size={24}/></div>
                    <div onClick={handleLogout}>Log Out</div>
                </button>
            </div>
        </div>
    )
}