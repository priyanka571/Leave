
"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";


interface Holiday {
    _id: string;
    title: string;
    description: string;
    holidayDate: string;
    type: string;
}

export const getHolidays = async () => {

    const response = await api.get("/holidays");

    return response.data;

};


export default function HolidayPage() {

    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(true);



    const fetchHolidayData = async () => {

        try {

            const res = await getHolidays();
            // console.log("API RESPONSE:", res);

            setHolidays(res.data);


        } catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }



    useEffect(() => {

        fetchHolidayData();

    }, []);



    return (

        <div className="p-8">


            <h1 className="text-3xl font-bold mb-6">
                Holiday List
            </h1>



            {
                loading ?

                    <p>
                        Loading holidays...
                    </p>

                    :

                    <div className="grid gap-4">


                        {
                            holidays.map((holiday) => (


                                <div
                                    key={holiday._id}
                                    className="
              border
              rounded-xl
              p-5
              shadow
              "
                                >

                                    <h2 className="text-xl font-semibold">
                                        {holiday.title}
                                    </h2>


                                    <p>
                                        {holiday.description}
                                    </p>


                                    <p className="mt-2">
                                        Date:
                                        {" "}
                                        {new Date(
                                            holiday.holidayDate
                                        ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })
                                    }
                                    </p>


                                    <span
                                        className="
                                              inline-block
                                              mt-2
                                              bg-blue-100
                                              px-3
                                              py-1
                                              rounded-full
                                              "
                                    >
                                        {holiday.type}
                                    </span>


                                </div>


                            ))
                        }


                    </div>

            }


        </div>

    );
}