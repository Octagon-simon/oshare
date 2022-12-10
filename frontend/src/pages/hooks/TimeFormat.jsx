const useTimeFormat = () => {
    const time1 = new Date().getTime();
    //check if link is still valid
    //once current timestamp is greater than timestamp,
    //render it invalid
    const checkExpired = (time2) => {
        //get timestamp of date
        const stamp = (time1 > time2) ? new Date(time1 - time2) : new Date(time2 - time1);
        let days_passed = 0;
        //check if month is january and year is 1970
        //else days passed should remain as it is
        //or Math.sign(stamp)
        if( (stamp.getMonth() + 1 ) == 1 && (stamp.getFullYear() == "1970")){
            //Subtract from default date
            days_passed = Number(Math.abs(stamp.getDate()) - 1);
        }else{
            days_passed = Number(Math.abs(stamp.getDate()));
        }
        return ( (time1 > time2) || (days_passed > 1) )
    }

    const getHours = (time2) => {
        time2 *= 1
        //get timestamp of date
        const stamp = (time1 > time2) ? time1 - time2 : time2 - time1;
        //new timestamp
        const dt = new Date(stamp)
        //days passed
        let days_passed = 0;
        //else days passed should remain as it is
        if( (dt.getMonth() + 1 ) == 1 && (dt.getFullYear() == "1970")){
            //Subtract from default date
            days_passed = Number(Math.abs(dt.getDate()) - 1);
        }else{
            days_passed = Number(Math.abs(dt.getDate()));
        }
        //total hours is 24 * days passed + the remaining hours
        return( (24 * days_passed) + dt.getHours() )
    }
    const getTimeLeft = (time2) => {
        //convert to number
        time2 *= 1
        return ( (24 >= getHours(time2)) ? 24 - getHours(time2) : 0)
    }
    const addExpiry = () => {
        //get the date
        const dt = new Date();
        //add 24 hours to the date and return timestamp
        return(dt.setHours(dt.getHours() + 24))
    }
    return {
        checkExpired, getHours, addExpiry, getTimeLeft
    }
}

export default useTimeFormat