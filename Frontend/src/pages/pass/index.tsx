import { useEffect, useState } from "react";
import Image from "next/image"
import {IoMdClose} from "react-icons/io"
import qr_code from "../../utils/images/qr-code.jpg"

import React from "react";
import MainLayout from "../../components/layout/mainLayout";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { apiEndPoint } from "../../constants";

export default function Course({ courses }: any) {
    const [startDate, setStartDate] = useState(new Date());
    const [guests, setGuests] = useState("")
    const [done, setDone] = useState(false)

    // useEffect(()=>{
    //     console.log(guests)
    // }, [guests])

    const handleRequestPass = async () => {
        const token = localStorage.getItem("alumni-token");
        await axios.post(`${apiEndPoint}/pass/`,
        JSON.stringify({
            date: "01/02/23",
            invited_guests: guests
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
            setDone(true)
        })
    }

    return ( 
        <MainLayout>
        <div>
            {!done && <div className="flex justify-center">
                <div className="flex flex-col bg-white p-6 rounded-md border-4 mb-2 w-96 text-center">
                    <div className="font-bold mb-5 text-lg text-green-400">Get your University Pass here</div>
                    <div className="text-start mb-10">
                        <form onSubmit={()=>{}} className="flex flex-col gap-5">
                            <div>
                                <label>Select a date below:</label>
                                <DatePicker className="p-4"  selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div>
                                <label>Enter visitor names:</label>
                                <textarea onChange={(event) => setGuests(event.target.value)} className="p-4" name="visitors" id="visitors" cols={30} rows={3}></textarea>
                            </div>

                        </form>
                    </div>
                    <button onClick={()=>handleRequestPass()} className="bg-green-400 text-white px-6 py-2 rounded-lg">Confirm</button>
                </div>
            </div>}

            {done && <div className="flex justify-center">
                <div className="flex flex-col bg-white p-6 rounded-md border-4 mb-2 w-96 text-center">
                    <div className="font-bold mb-5 text-lg text-green-400">Success!</div>
                    <div className="text-start mb-10">
                        Your pass will be waiting for you on the specified date at the University reception. 
                        Please don't forget to bring any document to confirm your identity.
                    </div>
                    <button className="bg-green-400 text-white px-6 py-2 rounded-lg" onClick={(event) =>setDone(false) }>OK</button>
                </div>
            </div>}
        </div>
        </MainLayout>
    );

}