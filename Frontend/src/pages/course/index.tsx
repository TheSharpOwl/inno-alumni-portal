import { useEffect, useState } from "react";
import Image from "next/image"
import {IoMdClose} from "react-icons/io"
import qr_code from "../../utils/images/qr-code.jpg"

import React from "react";
import MainLayOut from "../../components/layout/mainLayOut";
import axios from "axios";
import { apiEndPoint } from "../../constants";

export default function Course() {

    const initialCourses = [{
        "id": 1,
        "name": "DevOps Engineering",
        "duration": "24.07.2022 — 26.07.2022",
        "tutor": "Dmitry Creed, Insaf Safin",
        "places_taken": "3",
        "available_places": "15",
        "description": "This course contains theoretical and practical parts. In the theoretical part students will learn DevOps culture and devops practices; Continuous Integration, Continuous Deployment and Continuous Delivery approaches. In Practical part students will sequentially implement:",
    }]
    const [allCourseTab, setAllCourseTab] = useState(true)
    const [courses, setCourses] = useState(initialCourses);
    const [bookedCourses, setBookedCourses] = useState([]);
    const [token, setToken] = useState("")
// console.log(bookedCourses)
    const requestAllCourses = async (token) => {
        await axios.get(`${apiEndPoint}/courses`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `TOKEN ${token}`,
            }
        })
        .then(res => {
        // console.log("ALL", res)
        const result = res.data.map((course) => ({
                ...course,
                "duration": "24.07.2023 — 26.07.2023",
            }))
            setCourses(result)
        }).catch(function(err) {

        })
    }

    const requestBookedCourses = async (token) => {
        await axios.get(`${apiEndPoint}/courses/booked`,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `TOKEN ${token}`,
            }
        })
        .then(res => {
        console.log("BOOKED", res)
        const result = res.data.map((course) => ({
                ...course,
                "duration": "24.07.2023 — 26.07.2023",
            }))
            setBookedCourses(result)
        }).catch(function(err) {

        })
    }

    const handleRequestCourse = async (courseId) => {
        const token = localStorage.getItem("alumni-token");
        await axios.post(`${apiEndPoint}/request/course`,
        JSON.stringify({
            id: courseId
        }),
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `TOKEN ${token}`,
            }
        })
        .then(res => {
            console.log(res)
        })
    }
    useEffect(()=>{
        const token = localStorage.getItem("alumni-token");
        setToken(token)
        requestAllCourses(token);
        requestBookedCourses(token);
    },[])

    return ( 
        <MainLayOut>
            <div className="flex mb-5 gap-6">
                <button onClick={()=>setAllCourseTab(true)} className={allCourseTab ? "text-green-500" : ""}>ALL COURSES</button>
                <button onClick={()=>setAllCourseTab(false)} className={!allCourseTab ? "text-green-500" : ""}>BOOKED COURSES</button>
            </div>
        <div className="">
            {allCourseTab ? 
            courses.map((course)=> (
                <div className="bg-white p-5 rounded-md border-4 mb-2">
                    <div className="flex justify-between font-bold mb-3 text-lg text-green-400">
                        <div> {course.name} </div>
                        <div> {course.duration} </div>
                    </div>
                    <div className="flex justify-between text-sm mb-6">
                        <div className="font-bold "> {course.tutor} </div>
                        <div> {course.available_places} available places </div>
                    </div>
                    <div className="mb-8">
                        {course.description}
                    </div>
                    <div className="flex justify-between">
                        <div></div>
                        <button onClick={()=>handleRequestCourse(course.id)} className="bg-green-400 text-white px-6 py-2 rounded-lg">Apply</button>
                    </div>
                </div>
            )) : 
            bookedCourses.map((course) => (
                <div className="bg-white p-5 rounded-md border-4 mb-2">
                    <div className="flex justify-between mb-3 text-lg ">
                        <div> {course.name} </div>
                        <div> 24.07.2022 </div>
                    </div>
                    <div className="flex justify-between text-sm mb-6"> 
                        <div className="font-bold text-gray-400"> {course.tutor} </div>
                        <div className="text-green-400"> CURRENT </div>
                    </div>
                </div>
            ))}
            
            
            {/* <div className="flex justify-center mb-2">
                <div className="bg-white p-5 rounded-md border-4 mb-2 w-96">
                    <Image src={qr_code} alt="qr code with payment link" />
                </div>
            </div> */}

            {/* <div className="flex justify-center">
                <div className="flex flex-col bg-white p-6 rounded-md border-4 mb-2 w-96 text-center">
                    <div className="font-bold mb-5 text-lg text-green-400">Success!</div>
                    <div className="text-start mb-10">
                        Your pass will be waiting for you on the specified date at the University reception. 
                        Please don't forget to bring any document to confirm your identity.
                    </div>
                    <button className="bg-green-400 text-white px-6 py-2 rounded-lg">OK</button>
                </div>
            </div> */}

            {/* <div className="flex justify-center">
                <div className="flex flex-col bg-white p-6 rounded-md border-4 mb-2 w-96 text-center">
                    <div className="font-bold mb-5 text-lg text-green-400">Get your University Pass here</div>
                    <div className="text-start mb-10">
                        <form onSubmit={()=>{}} className="flex flex-col gap-5">
                            <div className="">
                                <input 
                                type="username" 
                                name="username"
                                placeholder="Username"
                                onChange={()=>{}}
                                className=""
                                />
                                <span className="icon flex items-center px-4">
                                </span>
                            </div>
                        </form>
                    </div>
                    <button className="bg-green-400 text-white px-6 py-2 rounded-lg">Confirm</button>
                </div>
            </div> */}

            {/* <div className="flex justify-center">
                <div className="bg-white p-5 rounded-xl border-4 mb-2">
                    <div className="flex justify-between mb-3 text-lg ">
                        <div> Head of notification long or short (about 2 line) </div>
                        <div className=" flex items-center">  <IoMdClose size={28} /> </div>
                    </div>
                    <div className="mb-6"> 
                        <div className="text-gray-400"> 
                        News description, additional information, time, place, format and other (about 3 line) 
                        </div>
                    </div>
                    <div className="text-green-400"> READ </div>
                </div>
            </div> */}

            {/* <div className="flex justify-center">
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
            </div> */}
        </div>
        </MainLayOut>
    );

}
