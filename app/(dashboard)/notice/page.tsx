"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";


interface Notification {
    _id: string;
    title: string;
    message: string;
    type: string;
    createdAt: string;
}


export default function AdminNotificationPage() {


    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const [editId, setEditId] = useState<string | null>(null);


    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "announcement",
    });



    const fetchNotifications = async () => {

        try {

            const res = await api.get("/notifications");

            setNotifications(res.data.data);


        } catch (error: any) {

            console.log(
                "ERROR:",
                error.response?.data || error.message
            );

        } finally {

            setLoading(false);

        }

    };




    useEffect(() => {

        fetchNotifications();

    }, []);





    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        try {


            if (editId) {

                await api.put(
                    `/notifications/${editId}`,
                    form
                );


            } else {


                await api.post(
                    "/notifications",
                    form
                );


            }



            setForm({
                title: "",
                message: "",
                type: "announcement"
            });


            setEditId(null);

            fetchNotifications();



        } catch (error) {

            console.log(error);

        }


    };





    const deleteNotification = async (id: string) => {

        try {

            await api.delete(
                `/notifications/${id}`
            );


            fetchNotifications();


        } catch (error) {

            console.log(error);

        }

    };






    const editNotification = (item: Notification) => {


        setEditId(item._id);


        setForm({

            title: item.title,
            message: item.message,
            type: item.type

        });


    };







//     return (

//         <div className="
// min-h-screen
// bg-gray-50
// p-8
// ">


//             <div className="
// max-w-6xl
// mx-auto
// ">


//                 {/* Header */}

//                 <div className="mb-8">

//                     <h1 className="
// text-3xl
// font-bold
// text-gray-800
// ">

//                         Notification Management

//                     </h1>


//                     <p className="
// text-gray-500
// mt-2
// ">

//                         Create and manage employee notifications

//                     </p>


//                 </div>






//                 {/* Form */}


//                 <div className="
// bg-white
// rounded-2xl
// shadow-sm
// border
// p-6
// mb-8
// ">


//                     <h2 className="
// text-xl
// font-semibold
// mb-5
// ">

//                         {
//                             editId
//                                 ?
//                                 "Update Notification"
//                                 :
//                                 "Create Notification"
//                         }

//                     </h2>



//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-4"
//                     >



//                         <input

//                             className="
// w-full
// border
// rounded-xl
// px-4
// py-3
// outline-none
// focus:ring-2
// focus:ring-indigo-500
// "

//                             placeholder="Notification title"

//                             value={form.title}

//                             onChange={(e) =>
//                                 setForm({
//                                     ...form,
//                                     title: e.target.value
//                                 })
//                             }

//                         />





//                         <textarea

//                             className="
// w-full
// border
// rounded-xl
// px-4
// py-3
// h-28
// outline-none
// focus:ring-2
// focus:ring-indigo-500
// "

//                             placeholder="Notification message"

//                             value={form.message}

//                             onChange={(e) =>
//                                 setForm({
//                                     ...form,
//                                     message: e.target.value
//                                 })
//                             }

//                         />






//                         <select

//                             className="
// border
// rounded-xl
// px-4
// py-3
// "

//                             value={form.type}

//                             onChange={(e) =>
//                                 setForm({
//                                     ...form,
//                                     type: e.target.value
//                                 })
//                             }

//                         >


//                             <option value="announcement">
//                                 Announcement
//                             </option>

//                             <option value="leave">
//                                 Leave
//                             </option>

//                             <option value="holiday">
//                                 Holiday
//                             </option>

//                             <option value="urgent">
//                                 Urgent
//                             </option>


//                         </select>






//                         <button

//                             className="
// bg-indigo-600
// text-white
// px-6
// py-3
// rounded-xl
// hover:bg-indigo-700
// transition
// "

//                         >

//                             {
//                                 editId
//                                     ?
//                                     "Update Notification"
//                                     :
//                                     "Create Notification"
//                             }

//                         </button>




//                     </form>


//                 </div>








//                 {/* Notification List */}


//                 <div className="space-y-4">


//                     <h2 className="
// text-xl
// font-semibold
// text-gray-800
// ">

//                         All Notifications

//                     </h2>



//                     {

//                         loading ?

//                             <p>
//                                 Loading...
//                             </p>


//                             :

//                             notifications.map((item) => (


//                                 <div

//                                     key={item._id}

//                                     className="
// bg-white
// border
// rounded-2xl
// p-5
// shadow-sm
// flex
// justify-between
// items-center
// "

//                                 >


//                                     <div>


//                                         <div className="
// flex
// items-center
// gap-3
// ">


//                                             <h3 className="
// font-bold
// text-lg
// ">

//                                                 {item.title}

//                                             </h3>


//                                             <span className="
// bg-indigo-100
// text-indigo-700
// text-xs
// px-3
// py-1
// rounded-full
// ">

//                                                 {item.type}

//                                             </span>


//                                         </div>



//                                         <p className="
// text-gray-600
// mt-2
// ">

//                                             {item.message}

//                                         </p>



//                                         <p className="
// text-sm
// text-gray-400
// mt-3
// ">

//                                             {
//                                                 new Date(
//                                                     item.createdAt
//                                                 )
//                                                     .toLocaleDateString(
//                                                         "en-IN"
//                                                     )
//                                             }

//                                         </p>


//                                     </div>





//                                     <div className="
// flex
// gap-3
// ">


//                                         <button

//                                             onClick={() => editNotification(item)}

//                                             className="
// bg-yellow-400
// px-4
// py-2
// rounded-lg
// "

//                                         >

//                                             Edit

//                                         </button>




//                                         <button

//                                             onClick={() => deleteNotification(item._id)}

//                                             className="
// bg-red-500
// text-white
// px-4
// py-2
// rounded-lg
// "

//                                         >

//                                             Delete

//                                         </button>



//                                     </div>



//                                 </div>


//                             ))


//                     }



//                 </div>



//             </div>


//         </div>

//     );


return (

<div className="min-h-screen bg-gray-50 p-6 md:p-8">

<div className="max-w-6xl mx-auto">


{/* Header */}

<div className="mb-8">

<h1 className="text-3xl font-bold text-gray-800">
Notification Management
</h1>

<p className="text-gray-500 mt-2">
Create and manage employee notifications
</p>

</div>



{/* Form Card */}

<div className="
bg-white
rounded-2xl
shadow
border
p-6
mb-8
">


<h2 className="
text-xl
font-semibold
text-gray-800
mb-6
">

{
editId
?
"Update Notification"
:
"Create Notification"
}

</h2>



<form
onSubmit={handleSubmit}
className="space-y-5"
>



<div>

<label className="
block
text-sm
font-medium
text-gray-700
mb-2
">
Title
</label>


<input

className="
w-full
border
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-indigo-500
outline-none
"

placeholder="Enter notification title"

value={form.title}

onChange={(e)=>
setForm({
...form,
title:e.target.value
})
}

/>

</div>




<div>

<label className="
block
text-sm
font-medium
text-gray-700
mb-2
">
Message
</label>


<textarea

className="
w-full
border
rounded-xl
px-4
py-3
h-32
resize-none
focus:ring-2
focus:ring-indigo-500
outline-none
"

placeholder="Write notification message"

value={form.message}

onChange={(e)=>
setForm({
...form,
message:e.target.value
})
}

/>

</div>




<div>

<label className="
block
text-sm
font-medium
text-gray-700
mb-2
">
Notification Type
</label>


<select

className="
border
rounded-xl
px-4
py-3
w-full
focus:ring-2
focus:ring-indigo-500
outline-none
"

value={form.type}

onChange={(e)=>
setForm({
...form,
type:e.target.value
})
}

>


<option value="announcement">
Announcement
</option>

<option value="leave">
Leave
</option>

<option value="holiday">
Holiday
</option>

<option value="urgent">
Urgent
</option>


</select>


</div>





<div className="
flex
gap-4
pt-2
">


<button

className="
bg-indigo-600
hover:bg-indigo-700
text-white
px-6
py-3
rounded-xl
transition
shadow-sm
"

>

{
editId
?
"Update Notification"
:
"Create Notification"
}

</button>



{
editId && (

<button

type="button"

onClick={()=>{
setEditId(null);
setForm({
title:"",
message:"",
type:"announcement"
})
}}

className="
bg-gray-200
hover:bg-gray-300
text-gray-700
px-6
py-3
rounded-xl
"

>

Cancel

</button>

)
}



</div>


</form>


</div>





{/* Notification List */}


<div>


<div className="
flex
justify-between
items-center
mb-5
">

<h2 className="
text-xl
font-semibold
text-gray-800
">

All Notifications

</h2>


<span className="
text-sm
text-gray-500
">

Total: {notifications.length}

</span>


</div>





<div className="space-y-4">


{
loading ? (

<p>
Loading...
</p>

)

:

notifications.map((item)=>(


<div

key={item._id}

className="
bg-white
border
rounded-2xl
p-5
shadow-sm
flex
flex-col
md:flex-row
md:justify-between
gap-5
"

>



<div className="flex-1">


<div className="
flex
items-center
gap-3
mb-2
">


<h3 className="
font-bold
text-lg
text-gray-800
">

{item.title}

</h3>


<span
className={`
text-xs
px-3
py-1
rounded-full
font-medium

${
item.type==="urgent"
?
"bg-red-100 text-red-600"
:
item.type==="holiday"
?
"bg-green-100 text-green-600"
:
"bg-indigo-100 text-indigo-600"
}

`}
>

{item.type}

</span>


</div>



<p className="
text-gray-600
">

{item.message}

</p>



<p className="
text-sm
text-gray-400
mt-3
">

{
new Date(item.createdAt)
.toLocaleDateString("en-IN")
}

</p>


</div>





<div className="
flex
gap-3
items-center
">


<button

onClick={()=>
editNotification(item)
}

className="
bg-yellow-400
hover:bg-yellow-500
text-white
px-5
py-2
rounded-xl
transition
"

>

Edit

</button>




<button

onClick={()=>
deleteNotification(item._id)
}

className="
bg-red-500
hover:bg-red-600
text-white
px-5
py-2
rounded-xl
transition
"

>

Delete

</button>



</div>



</div>


))

}


</div>


</div>


</div>

</div>

);






}




