import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const colourOptions = [
    {
        label: "Completed",
        value: "completed"
    },
    {
        label: "In Progress",
        value: "in_progress"
    },
    {
        label: "Pending",
        value: "pending"
    },
    {
        label: "Cancel",
        value: "cancel"
    },
]

function SearchOrder({ addSearchParam, removeSearchParam }) {

    // https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up

    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms, 5 second for example

    const [userId, setUserId] = useState('')
    const [orderId, setOrderId] = useState('')
    const [orserStatus, setOrderStatus] = useState('')

    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log("HELLO");
    //         addSearchParam('user_id', '56')
    //     }, 2000);
    // }, [])

    useEffect(() => {
        if (orserStatus) addSearchParam('status', orserStatus)
        else removeSearchParam('status')
    }, [orserStatus])

    useEffect(() => {
        if (userId) addSearchParam('user_id', userId)
        else removeSearchParam('user_id')
    }, [userId])

    useEffect(() => {
        if (orderId) addSearchParam('order_id', orderId)
        else removeSearchParam('order_id')
    }, [orderId])

    const submitHandler = (e) => {
        e.preventDefault()
        // setSearchQuery(`user_id=${userId}&order_id=${orderId}&status=${orserStatus}`)
    }


    return (
        <form onSubmit={submitHandler} >
            <div className="flex w-full md:w-auto items-center space-y-4 md:space-x-3 md:space-y-0 justify-end flex-wrap">
                <div className="w-full md:w-[200px]">
                    <input type="text" placeholder="User id" className="form_input mb-0"
                        onChange={(e) => {
                            clearTimeout(typingTimer);
                            const value = e.target.value
                            typingTimer = setTimeout(() => setUserId(value), value ? doneTypingInterval : 0);
                        }}

                    />
                </div>
                <div className="w-full md:w-[200px]">
                    <input type="text" placeholder="Order id" className="form_input mb-0" onChange={(e) => {
                        clearTimeout(typingTimer);
                        const value = e.target.value
                        typingTimer = setTimeout(() => setOrderId(value), value ? doneTypingInterval : 0);
                    }} />
                </div>
                <div className="w-full md:w-[150px]">
                    <Select
                        placeholder="Select status"
                        isSearchable={false}
                        isClearable={true}
                        options={colourOptions}
                        onChange={(e) => setOrderStatus(e?.value || null)}
                    />
                </div>
                {/* <button type="submit" className="cstm_btn !py-1.5">Search</button> */}
            </div>
        </form>
    )
}

export default SearchOrder
