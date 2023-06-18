import { useState } from "react";
import Image from "next/image"
import {IoMdClose} from "react-icons/io"
import qr_code from "../../utils/images/qr-code.jpg"

import React from "react";
import MainLayOut from "../../components/layout/mainLayOut";

export default function Course({ courses }: any) {

    const course = {
        "name": "DevOps Engineering",
        "duration": "24.07.2022 — 26.07.2022",
        "instructor": "Dmitry Creed, Insaf Safin",
        "places_taken": "3",
        "total_intake": "15",
        "description": "This course contains theoretical and practical parts. In the theoretical part students will learn DevOps culture and devops practices; Continuous Integration, Continuous Deployment and Continuous Delivery approaches. In Practical part students will sequentially implement:",
    }

    return ( 
        <MainLayOut>
        <div className="w-full m-auto">
           
            {/* <div className="bg-white p-5 rounded-md border-4 mb-2">
                <div className="flex justify-between mb-3 text-lg ">
                    <div> {course.name} </div>
                    <div> 24.07.2022 </div>
                </div>
                <div className="flex justify-between text-sm mb-6"> 
                    <div className="font-bold text-gray-400"> {course.instructor} </div>
                    <div className="text-green-400"> CURRENT </div>
                </div>
            </div> */}
            <div className="flex justify-center mb-2">
                <div className="bg-white p-5 rounded-md border-4 mb-2 w-96">
                    <Image src={qr_code} alt="qr code with payment link" />
                </div>
            </div>

            <div className="flex flex-col items-center mb-2">
                <p>Scan the QR Code for easy donation</p>
                <p>It will redirect you to tinkoff for donations</p>
            </div>

        </div>
        </MainLayOut>
    );

}