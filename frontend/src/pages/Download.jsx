import React, {useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import useTimeFormat from "./hooks/TimeFormat";
import useLinkAction from "./hooks/LinkAction";
import Core from "./hooks/Core";
import {toast} from 'react-toastify'
import {Helmet} from "react-helmet";

export default function Download() {
    const fileId = useParams().fileId.trim()
    const [response, setResponse] = useState({})
    const [prog, setProg] = useState("loading")
    const {getHours} = useTimeFormat()
    const {deleteLink} = useLinkAction()
    const location = useLocation();
    const {doFileSize, detectAgent} = Core();
    const [progress, setProgress] = useState(0);
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
     * create a new customer, then add measurements
     * 
     * settings => phone_number, alt_phone, tailor profile image 
     * 
     //feedback or issue report form
     * 
     */
    function downloadFile(url, fileName) {
        // await fetch(url, { method: 'get', mode: 'cors' })
        //     .then(res => res.blob())
        //     .then(res => {
        //         const frag = document.createDocumentFragment();
        //         const aElement = document.createElement('a');
        //         aElement.setAttribute('download', fileName);
        //         const href = URL.createObjectURL(res);
        //         aElement.href = href;
        //         // aElement.setAttribute('href', href);
        //         aElement.setAttribute('target', '_blank');
        //         frag.appendChild(aElement);
        //         aElement.click();
        //         URL.revokeObjectURL(href);
        //     });

        var xhr = new XMLHttpRequest();
        //set the response type as blob
        xhr.responseType = "blob";
            // listen for upload progress
            xhr.addEventListener('progress', function (event) {
                console.log("yaay")
                document.querySelector('#transfer_section').classList.remove('d-none')
                setProgress(Math.round(100 * event.loaded / event.total));
            });

            // handle error
            xhr.upload.onerror = function () {
                console.log(`Error during the upload: ${xhr.status}.`);
                toast.error("Sorry, we couldn't transfer this file 😔")
            };

            // upload completed successfully
            xhr.onload = function (res) {
                toast.info("Downloading file 😎")
                const frag = document.createDocumentFragment();
                const aElement = document.createElement('a');
                aElement.setAttribute('download', fileName);
                //send blob object to function
                const href = URL.createObjectURL(res.target.response);
                aElement.href = href;
                // aElement.setAttribute('href', href);
                aElement.setAttribute('target', '_blank');
                frag.appendChild(aElement);
                aElement.click();
                URL.revokeObjectURL(href);

                //hide progress section
                document.querySelector('#transfer_section').classList.toggle('d-none');
                document.querySelector('#download_button').classList.remove('is-loading');
            };

            xhr.open('GET', url);
            xhr.send();
    };

    React.useEffect(() => {
        if (fileId) {
            const url = new URL(import.meta.env.VITE_BACKEND_URL + '/file_data.php');
            //add file link as query to the url object
            url.searchParams.append('fileId', fileId);
            fetch(url.href, {
                method: "GET",
                mode: 'cors'
            })
                .then(res => res.json())
                .then(response => {
                    setResponse(response)
                    if (response.success) {
                        //change progress state
                        setProg("loaded")
                    } else {
                        //handle errors here
                        deleteLink(fileId);
                        setProg("failed")
                    }
                })
                .catch(err => {
                    console.log(err)
                    setProg("failed")
                })
        }
    }, [fileId])

    //init request to download file
    const doDownload = (e) => {
        const btn = e.target;
        btn.classList.toggle('is-loading');
        const url = new URL(import.meta.env.VITE_BACKEND_URL + '/download.php');
        //add file link as query to the url object
        url.searchParams.append('fileId', fileId);
        fetch(url.href, {
            method: "GET",
            mode: 'cors'
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    const downloadLink = import.meta.env.VITE_BACKEND_URL + '/'+ res.data.download_link;
                    downloadFile(downloadLink, response.data.file_name)
                    // .then( () => {
                    //     btn.classList.remove('is-loading');
                    //     toast.info("File has been downloaded 🤩")
                    // })
                } else {
                    btn.classList.remove('is-loading');
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
            (prog === "loading") ? 
                <p className="has-text-centered" style={{margin : "15% 0"}}><i className="fas fa-fan has-text-app-primary fa-spin fa-6x"></i></p>
            : 
            <>
            { (response?.success && Object.keys(response.data).length) ?
                <section className="container download-container">
                    <Helmet>
                        <title>Download - {response.data.file_name} from Oshare</title>
                        <meta property="og:title" content={"Download - "+response.data.file_name+" from Oshare"} />
                        <meta name="description" content={"This File has "+response.data.file_downloads+" Visit Oshare now to download this file"} />
                    </Helmet>
                    <div className="columns">
                        <div className="column is-half">&nbsp;</div>
                        <div className="column is-half" style={{maxWidth: "450px", margin:"auto"}}>
                            <h4 className="title is-5 mb-2">FILE STATS</h4>
                            <table className="table is-bordered is-fullwidth">
                                <tbody>
                                    <tr>
                                        <td>
                                            File Views
                                        </td>
                                        <td>
                                            {response.data.file_views || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            File Downloads
                                        </td>
                                        <td>
                                            {response.data.file_downloads || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Last Downloaded On
                                        </td>
                                        <td>
                                            {response.data.file_last_download_date || "No Downloads yet"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="notification is-info is-light">
                        <p className="m-0 has-text-centered">This file will be deleted after <b>{getHours(new Date(response.data.exp_time))}</b> Hours</p>
                    </div>
                    <div className="download-section">
                        <section className="has-text-centered">
                            <img width="150px" src="/file-download.svg" />
                            <p className="mt-4 mb-4"><span className="title is-6">File Name:</span> {response.data.file_name}</p>
                            <p className="has-text-centered mb-5">
                                <span className="file-size tag is-info is-light">{doFileSize(response.data.file_size)}</span>
                            </p>
                            <div id="transfer_section" className="progress-section d-none mt-3 mb-3" style={{maxWidth:"500px", margin : "auto"}}>
                                <p className="mb-2">Transferring file ...</p>
                                <progress className="progress is-info" value={progress} max="100">{progress}%</progress>
                            </div>
                            {
                                ( (detectAgent() != 'safari' && detectAgent() != 'opera')) ? 
                                    <button id="download_button" className="button is-app-primary radius-0" onClick={doDownload}>Download Now</button>
                                : 
                                <p className="notification is-danger is-light">File downloads are not supported in this browser yet, please try to download this file again on <b>Chrome</b> or <b>Firefox</b> or <b>Microsoft Edge</b></p>
                            }
                            {detectAgent()}
                        </section>
                    </div>
                </section>
                : 
                <section className="container caution-container">
                    <div className="has-text-centered">
                        <img src="/caution.svg" width="150px" />
                        <p className="mt-2 title is-4">{response.data.message}</p>
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