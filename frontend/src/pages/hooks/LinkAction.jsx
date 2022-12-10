import useTimeFormat from "./TimeFormat";

const useLinkAction = (item) => {
    const {checkExpired} = useTimeFormat();

    const data = window.localStorage.getItem('oshare') ? JSON.parse(window.localStorage.getItem('oshare')) : [];

    //check links that has expired
    (function(){
        const newData = [];
        
        if(data.length !== 0){
            //data is in the format [ {link1}, {link2} ]
            data.forEach( (el) => {
                //true means that it has expired
                //console.log(checkExpired(el.expTime))
                if(!checkExpired(el.expTime)){
                    newData.push(el);
                }
            })
        }
        //reset the links
        window.localStorage.setItem('oshare', JSON.stringify(newData))
    })();

    const saveLink = (item) => {
        window.localStorage.setItem('oshare', JSON.stringify(new Array(item, ...data)))
    }

    const deleteLink = (file_id) => {
        const index = data.findIndex( (el) => el.file_id === file_id)
        data.splice(index, 1);
        window.localStorage.setItem('oshare', JSON.stringify(data))
    }

    return {
        saveLink, deleteLink, savedLinks : data
    }
}

export default useLinkAction
