import axios from "axios";
import React, { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";
import defaultAvatar from "../../images/chillies.png";
import DoctorPageHeader from "./DoctorPageHeader";
import DoctorInfo from "./DoctorInfo";
import { Link } from "react-router-dom";
function DoctorPage(){
    const location = useLocation();
    const [doctorName, setDoctorName] = useState();
    useEffect(()=>{
        const match = matchPath(location.pathname, {path: '/doctor/:doctorID', exact:true, strict:false});
        getServerDoctor(match.params.doctorID);
    }, []);

    async function getServerDoctor(doctorID){
        try{
            const response = await axios.get("/doctor/" + doctorID);
            console.log(response);
            setDoctorName(response.data.doctorName);
        }
        catch(error){
            console.log(error);
        }
    }

    console.log(location);
    return <div>
    <DoctorPageHeader doctorName={doctorName} defaultAvatar={defaultAvatar}/>
    <DoctorInfo/>
    </div>;
}

export default DoctorPage;