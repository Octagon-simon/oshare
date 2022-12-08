import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTimeFormat from "./hooks/TimeFormat";

export default function Download() {
    const fileLink = useParams().fileLink.trim()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [error, setError] = useState("")
    const {getHours} = useTimeFormat()
    // if(!fileLink) {
    //     navigate('/', {
    //         replace : true
    //     })
    // }

    /**
     * 
     * signup -> email and password
     * login -> email and password
     * forgotten password
     * 
     * 
     * dashboard -> image, 
     * 
     * dashboard -> add new customer, image (not required, premium), contact(premium),   name, measurement, due_date(premium users)
     * 
     * settings => phone_number, alt_phone, tailor profile image 
     * 
     */
    function downloadFile(url, fileName) {
        fetch(url, { method: 'get', mode: 'cors' })
            .then(res => res.blob())
            .then(res => {
                const aElement = document.createElement('a');
                aElement.setAttribute('download', fileName);
                const href = URL.createObjectURL(res);
                aElement.href = href;
                // aElement.setAttribute('href', href);
                aElement.setAttribute('target', '_blank');
                aElement.click();
                URL.revokeObjectURL(href);
            });
    };
    React.useEffect( () => {
        if(fileLink){
        const url = new URL(import.meta.env.VITE_BACKEND_URL + '/file_meta.php');
        //add file link as query to the url object
        url.searchParams.append('fileLink', fileLink);

        fetch(url.href, {
            method: "GET",
            mode: 'cors'
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    setData(response.data);
                } else {
                    //handle errors here
                    setError(response.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
//ask sir about this duplicate request stuff
    }, [fileLink])

    //init request to download file
    const doDownload = () => {
        const url = new URL(import.meta.env.VITE_BACKEND_URL + '/download.php');
        //add file link as query to the url object
        url.searchParams.append('fileLink', fileLink);
        fetch(url.href, {
            method: "GET",
            mode: 'cors'
        })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    const downloadLink = import.meta.env.VITE_BACKEND_URL + '/'+ response.data.download_link;
                    // a.setAttribute('target', '_blank');
                    // // the filename you want
                    // a.download = data.file_name;
                    // frag.appendChild(a);
                    // a.click();
                    downloadFile(downloadLink, data.file_name)
                    // URL.revokeObjectURL(href);
                } else {
                    //handle errors here
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <>
        { (Object.keys(data).length) ?
            <section className="container download-container">
                <div className="columns">
                    <div className="column is-half">&nbsp;</div>
                    <div className="column is-half" style={{maxWidth: "450px", margin:"auto"}}>
                        {/* <ul className="file-stats p-5">
                            <li><span><span className="tag is-info">{data.file_views}</span> Views</span></li>
                            <li><span><span className="tag is-info">{data.file_downloads || 0}</span> Downloads</span></li>
                        </ul> */}
                        <h4 className="title is-5 mb-2">FILE STATS</h4>
                        <table className="table is-bordered is-fullwidth">
                            <tbody>
                                <tr>
                                    <td>
                                        File Views
                                    </td>
                                    <td>
                                        {data.file_views || 0}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        File Downloads
                                    </td>
                                    <td>
                                        {data.file_downloads || 0}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Last Downloaded On
                                    </td>
                                    <td>
                                        {data.file_last_download_date || ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="notification is-info is-light">
                    <p className="m-0 has-text-centered">This file will be deleted after <b>{getHours(new Date(data.exp_time))}</b> Hours</p>
                </div>
                <div className="download-section">
                    <section className="has-text-centered">
                        <img width="150px" src="/file-download.svg" />
                        <h4 className="title is-6 mt-4">File Name: {data.file_name}</h4>
                        <p className="has-text-centered mb-5">
                            <span className="file-size tag is-info is-light">{Math.round(Number(data.file_size) / 1024 / 1024)} Mb</span>
                        </p>
                        <button className="button is-app-primary btn-act radius-0" onClick={doDownload}>Download Now</button>
                    </section>
                </div>
            </section>
        : 
            <section className="container caution-container">
                <div className="has-text-centered">
                    <img src="/caution.svg" width="150px" />
                    <p class="mt-2 title is-4">{error}</p>
                </div>
            </section>
        }
        </>
    )
}
//on load, make a fetch request to retrieve file meta, name, size, date uploaded, then anchor with attribute download to make a direct request to the file using onclick 

//on home page, show total uploaded, and total downloaded

//no page found error too
//change upload directory name so they don't access people's stuff
//add factors affecting file download
//if uploaded from a device with an invalid date / time