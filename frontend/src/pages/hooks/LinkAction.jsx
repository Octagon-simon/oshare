import {useState} from "react";
import useTimeFormat from "./TimeFormat";

const useLinkAction = (item) => {
    const {checkExpired} = useTimeFormat();

    const [data, ] = useState(window.localStorage.getItem('oshare') ? JSON.parse(window.localStorage.getItem('oshare')) : []);

    //check links that has expired
    (function(){
        const newData = [];
        
        if(data.length !== 0){
            //data is in the format [ {link1}, {link2} ]
            data.forEach( (el, ind) => {
                //true means that it has expired
                if(checkExpired(el.expTime)){
                    newData.push(data.splice(ind, 1));
                }
            })
        }

        if(newData.length !== 0){
            //reset the links
            window.localStorage.setItem('oshare', JSON.stringify(newData))
        }

    })();

    const saveLink = (item) => {
        window.localStorage.setItem('oshare', JSON.stringify(new Array(item, ...data)))
    }

    const deleteLink = (item) => {
        const index = data.findIndex( (el) => el.link === item.link)
        const newAry = data.splice(index, 1);
        window.localStorage.setItem('oshare', JSON.stringify(newAry))
    }

    return {
        saveLink, deleteLink, savedLinks : data
    }
}

export default useLinkAction
