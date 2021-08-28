import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Market(){
    const [doctorID, setDoctorID] = useState("");
    let history = useHistory;

    function handleChange(e){
        setDoctorID(e.target.value);
    }

    function handleClick(e){
        e.preventDefault();
        
        const loadAppointment = ()=>  history.push({pathname:"/appointment" + doctorID});
    }
    return <div>
        <form>
            <input type="text" name="doctorID" value={doctorID} onChange={handleChange}></input>
            <button type="submit" onClick={handleClick}>Book</button>
        </form>
    </div>
}

export default Market;