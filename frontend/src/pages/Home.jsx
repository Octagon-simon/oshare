import React, { useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { octaValidate } from 'octavalidate-reactjs'
import { useDropzone } from 'react-dropzone'
import { ToastContainer, toast } from 'react-toastify';
import useLinkAction from "./hooks/LinkAction";
import useTimeFormat from "./hooks/TimeFormat";
import Core from "./hooks/Core";
import {Helmet} from "react-helmet";

export default function Home() {
    const { saveLink } = useLinkAction()
    const [data, setData] = useState({})
    const [progress, setProgress] = useState(0)
    const { addExpiry } = useTimeFormat()
    const { doFileSize } = Core()
    const [uploadCont, setUploadCont] = useState("single");

    function MyDropzone({ open }) {

        const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({useFsAccessApi : false});

        const removeFile = (name) => {
            //what if 2 files have the same name?
            //find the index of the file in the array
            const index = acceptedFiles.findIndex((file) => file.name == name)
            //remove file from array
            acceptedFiles.splice(index, 1)
            //remove file preview from DOM
            document.querySelector(`div[data-key="${name}"]`).style.display = "none"
            console.log("Accepted files", acceptedFiles)
            //document.querySelector(`div[data-key="${name}"]`).remove()
            //check if browser supports data transfer
            if (typeof DataTransfer === "function") {
                console.info("Data transfer is supported")
                //multi file input
                const multiInput = document.querySelector('#inp_multi_file').files
                //recreate filelist by assigning to a new array
                const newFiles = Array.from(multiInput)
                //get the index of the file
                const index = newFiles.findIndex((file) => file.name == name)
                //remove the file from newList
                newFiles.splice(index, 1)
                //initialize data transfer object
                const dT = new DataTransfer()
                //add remaining files to the object
                newFiles.forEach(file => dT.items.add(file))
                //rebuild file list
                document.querySelector('#inp_multi_file').files = dT.files
            }
        }
        const files = acceptedFiles.map((file) => (
            <React.Fragment key={file.path}>
                <div className="dropped-file" data-key={file.name}>
                    <div className="file-meta">
                        <p>{file.name.substring(0, 9) + '...'}</p>
                        <p>{doFileSize(file.size)}</p>
                    </div>
                    <div className="file-img">
                        {
                            (file.type?.match(/image\//, 'g')?.length) ?
                                <img src={URL.createObjectURL(file)} />
                                : (
                                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDEwIDQxMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDEwIDQxMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IlhNTElEXzk5NV8iPg0KCTxwb2x5Z29uIGlkPSJYTUxJRF85OTZfIiBzdHlsZT0iZmlsbDojREVEREUwOyIgcG9pbnRzPSIxMjUsMzQwIDEyNSwzMTAgMjA1LDMxMCAyMDUsMjgwIDEyNSwyODAgMTI1LDI1MCAyMDUsMjUwIDIwNSwyMjAgMTI1LDIyMCANCgkJMTI1LDE5MCAyMDUsMTkwIDIwNSwxNjAgMTI1LDE2MCAxMjUsMTMwIDIwNSwxMzAgMjA1LDEwMCAyMDUsNzAgMjA1LDAgMTI1LDAgMTI1LDcwIDU2LjcwNyw3MCA1NSw3MS43NSA1NSw0MTAgMjA1LDQxMCAyMDUsMzQwIAkNCgkJIi8+DQoJPHBvbHlnb24gaWQ9IlhNTElEXzk5N18iIHN0eWxlPSJmaWxsOiNDRENERDA7IiBwb2ludHM9IjIwNSwwIDIwNSw3MCAyODUsNzAgMjg1LDEwMCAyMDUsMTAwIDIwNSwxMzAgMjg1LDEzMCAyODUsMTYwIDIwNSwxNjAgDQoJCTIwNSwxOTAgMjg1LDE5MCAyODUsMjIwIDIwNSwyMjAgMjA1LDI1MCAyODUsMjUwIDI4NSwyODAgMjA1LDI4MCAyMDUsMzEwIDIwNSwzNDAgMjA1LDQxMCAzNTUsNDEwIDM1NSwwIAkiLz4NCgk8cmVjdCBpZD0iWE1MSURfOTk4XyIgeD0iMjA1IiB5PSI3MCIgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIvPg0KCTxyZWN0IGlkPSJYTUxJRF85OTlfIiB4PSIxMjUiIHk9IjMxMCIgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMCIvPg0KCTxwb2x5Z29uIGlkPSJYTUxJRF8xMDAwXyIgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMTI1LDE2MCAyMDUsMTYwIDI4NSwxNjAgMjg1LDEzMCAyMDUsMTMwIDEyNSwxMzAgCSIvPg0KCTxwb2x5Z29uIGlkPSJYTUxJRF8xMDAxXyIgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMTI1LDIyMCAyMDUsMjIwIDI4NSwyMjAgMjg1LDE5MCAyMDUsMTkwIDEyNSwxOTAgCSIvPg0KCTxwb2x5Z29uIGlkPSJYTUxJRF8xMDAyXyIgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMTI1LDI4MCAyMDUsMjgwIDI4NSwyODAgMjg1LDI1MCAyMDUsMjUwIDEyNSwyNTAgCSIvPg0KCTxwb2x5Z29uIGlkPSJYTUxJRF8xMDAzXyIgc3R5bGU9ImZpbGw6I0FDQUJCMTsiIHBvaW50cz0iMTI1LDAgNTUsNzAgNTYuNzA3LDcwIDEyNSw3MCAJIi8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" alt="" />
                                )
                        }
                    </div>
                    <div className="file-foot" onClick={(e) => removeFile(file.name)}>
                        <p>Remove</p>
                    </div>
                </div>
            </React.Fragment>
        ));

        const style = {
            border: "2px dashed var(--secondary)",
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
            minHeight: "200px",
            backgroundColor: "#eee",
            gap: "5px",
            margin: "auto"
        }
        console.log(acceptedFiles)
        return (
            <div id="inp_multi_file_wrapper" className="container" style={style}>
                <div {...getRootProps({ className: "dropzone" })}>
                    <input onClick={open} name="multi_files[]" octavalidate="R" id="inp_multi_file" {...getInputProps()} />
                    <div className="text-center">
                        {isDragActive ? (
                            <p className="dropzone-content">
                                Release to drop the files here
                            </p>
                        ) : (
                            <p className="dropzone-content">
                                Drag & drop some files here, or click to select files
                            </p>
                        )}
                    </div>
                </div>
                {
                    files
                }
            </div>
        );
    }

    const DoFinal = ({ prop }) => {
        const DoSuccess = () => {
            setTimeout(() => {
                document.querySelector('.success-img-section')?.remove();
                document.querySelector('.final-modal-section')?.classList.remove("d-none")
            }, 3000)
            const handleCopy = (e) => {
                const link = e.target.getAttribute('data-link')
                if (link) {
                    window.navigator.clipboard.writeText(atob(link)).then(() => {
                        toast.info("File Link has been copied")
                    }, () => {
                        toast.error("Failed to copy snippet")
                    })
                }
            }
            return (
                <>
                    <div className="success-img-section has-text-centered">
                        <img width="200px" className="img" src="/success-tick.gif" />
                    </div>
                    <div className="final-modal-section d-none has-text-centered">
                        <QRCodeSVG value={prop.link} />
                        <h6 className="title is-6 mt-2 mb-0">Scan the QR Code</h6>
                        <div className="separator">Or</div>
                        <section className="copy-link">
                            <h6 className="mb-2 title is-6">Copy the link</h6>
                            <div className="field is-flex">
                                <input readOnly className="input radius-end-0 inp-link" placeholder="Copy the link" defaultValue={prop.link} />
                                <button title="Click here to copy this Link" data-link={btoa(prop.link)} className="button is-info radius-end" onClick={handleCopy}>Copy</button>
                            </div>
                        </section>

                        <div className="field">
                            <p className="mb-2">Share this link with your friends</p>
                            <ul className="list-unstyled list-inline mt-2 ml-0">
                                <li className="list-inline-item">
                                    <a target="_blank" title="Share this on Twitter" className="button is-info"
                                        href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(prop.link)} role="button"><i className="fab fa-twitter"></i></a></li>
                                <li className="list-inline-item">
                                    <a target="_blank" title="Share this on Facebook" className="button is-info "
                                        href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(prop.link)} role="button"><i className="fab fa-facebook-f"></i></a>
                                </li>
                                <li className="list-inline-item">
                                    <a target="_blank" title="Share this on Linkedin" className="button  is-info"
                                        href={"https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(prop.link)} role="button"><i
                                            className="fab fa-linkedin-in"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )
        }
        const closeModal = () => {
            document.querySelector('.modal').classList.remove('is-active');
            document.querySelector('.final-modal-section')?.classList.toggle("d-none")
        }
        return (
            <>
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        {
                                            <DoSuccess />
                                        }
                                    </div>
                                </div>
                            </article>
                        </div>

                    </div>
                    <button onClick={closeModal} className="modal-close is-large" aria-label="close"></button>
                </div>
            </>
        );
    }
    const handleSingleFileUpload = (e) => {
        const form = e.target;
        const btn = e.target.querySelector(`button[form="${form.id}"]`)
        //prevent reload
        e.preventDefault()
        const myForm = new octaValidate('upload_single', {
            errorElem: {
                'inp_single_file': 'inp_single_file_wrapper'
            }
        });
        if (myForm.validate()) {
            //put button in loading state
            btn.classList.toggle('is-loading')
            btn.setAttribute("disabled", "disabled")
            //form data
            const formData = new FormData(form);
            //send timezone too because of delete hours
            formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone)

            var xhr = new XMLHttpRequest();

            // listen for upload progress
            xhr.upload.onprogress = function (event) {
                document.querySelector('#single_progress_section').classList.remove('d-none')
                setProgress(Math.round(100 * event.loaded / event.total));
            };

            // handle error
            xhr.upload.onerror = function () {
                console.log(`Error during the upload: ${xhr.status}.`);
            };

            // upload completed successfully
            xhr.onload = function (res) {
                let response = JSON.parse(res.target.responseText)
                document.querySelector('#single_progress_section').classList.toggle('d-none')
                if (response.success) {
                    btn.classList.remove('is-loading')
                    btn.removeAttribute("disabled", "disabled")
                    toast.success(`${response.data.message}!`);
                    setData(response.data);
                    saveLink({
                        link: response.data.link,
                        file_id: response.data.file_id,
                        expTime: addExpiry()
                    });
                    //reset form
                    //form.reset()
                } else {
                    btn.classList.remove('is-loading')
                    btn.removeAttribute("disabled", "disabled")
                    toast.error(`${response.data.message}!`);
                }
            };

            xhr.open('POST', import.meta.env.VITE_BACKEND_URL + '/single_upload.php');
            xhr.send(formData);
        }
    }

    const handleMultiFileUpload = (e) => {
        const form = e.target;
        const btn = e.target.querySelector(`button[form="${form.id}"]`)
        //prevent reload
        e.preventDefault()
        const myForm = new octaValidate('upload_multiple', {
            errorElem: {
                'inp_multi_file': 'inp_multi_file_wrapper'
            }
        });
        if (myForm.validate()) {
            //put button in loading state
            btn.classList.toggle('is-loading')
            btn.setAttribute("disabled", "disabled")
            //form data
            const formData = new FormData(form);
            //send timezone too because of delete hours
            formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone)

            var xhr = new XMLHttpRequest();

            // listen for upload progress
            xhr.upload.onprogress = function (event) {
                document.querySelector('#multi_progress_section').classList.remove('d-none')
                setProgress(Math.round(100 * event.loaded / event.total));
            };

            // handle error
            xhr.upload.onerror = function () {
                console.log(`Error during the upload: ${xhr.status}.`);
            };

            // upload completed successfully
            xhr.onload = function (res) {
                let response = JSON.parse(res.target.responseText)
                document.querySelector('#multi_progress_section').classList.toggle('d-none')
                if (response.success) {
                    btn.classList.remove('is-loading')
                    btn.removeAttribute("disabled", "disabled")
                    toast.success(`${response.data.message}!`);
                    setData(response.data);
                    saveLink({
                        link: response.data.link,
                        file_id: response.data.file_id,
                        expTime: addExpiry()
                    });
                    //reset form
                    //form.reset()
                } else {
                    btn.classList.remove('is-loading')
                    btn.removeAttribute("disabled", "disabled")
                    toast.error(`${response.data.message}!`);
                }
            };

            xhr.open('POST', import.meta.env.VITE_BACKEND_URL + '/multi_upload.php');
            xhr.send(formData);
        }
    }

    const setFileName = (e) => {
        //get the current input
        return (document.querySelector('.file-name').innerText = e.target.files[0].name)
    }
    //I used a state to better handle it because I felt that this was not the best way to handle it
    //Thank you JAH
    // const switchContainer = (e) => {
    //     const id = e.target.getAttribute('upload-container');
    //     if (id == "single") {
    //         //set active class on the tab element
    //         document.querySelector('li#single').classList.toggle('is-active');
    //         //make upload container a block element
    //         document.querySelector('#upload_container_single').classList.toggle('d-block');
    //         //make element visible to user
    //         document.querySelector('#upload').scrollIntoView()
    //         /*** ***/
    //         document.querySelector('#upload_container_multiple').classList.remove('d-block');
    //         //remove active class on the other tab element
    //         document.querySelector('li#multiple').classList.remove('is-active');
    //     } else {
    //         //set active class on the tab element
    //         document.querySelector('li#multiple').classList.toggle('is-active');
    //         //make upload container a block element
    //         document.querySelector('#upload_container_multiple').classList.toggle('d-block');
    //         //make element visible to user
    //         document.querySelector('#upload').scrollIntoView()
    //         /*** ***/
    //         document.querySelector('#upload_container_single').classList.remove('d-block');
    //         //remove active class on the other tab element
    //         document.querySelector('li#single').classList.remove('is-active');
    //     }
    // }

    React.useEffect(() => {
        if (uploadCont) {

            document.querySelector('#upload').scrollIntoView()
        }
    }, [uploadCont])

    return (
        <>
            {
                (Object.keys(data).length) ? <DoFinal prop={data} /> : null
            }
            <section className="hero is-medium has-navbar-fixed-top">
                <Helmet>
                    <title>Oshare: Upload and Share links to files that matter</title>
                    <meta property="og:title" content="Upload and Share links to files that matter" />
                    <meta name="description" content="Upload and Share links to files that matter" />
                </Helmet>
                <div className="hero-body">
                    <div className="container m-none" style={{ top: '30%' }}>
                        <h1 className="title home-title has-text-light">Upload & Share links to files that matter</h1>
                        <p className="has-text-light font-pacifico">Making file sharing super easy for you</p>
                        <div id="homeBtn" className="mt-5">
                            <a href="#upload" className="btn-act button is-app-primary is-medium">Get started</a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container p-4">
                <section id="upload" className="section-upload">
                    <div className="upload-tabs">
                        <div className="tabs is-toggle is-centered">
                            <ul>
                                <li id="single" onClick={(e) => setUploadCont("single")} upload-container="single" className={uploadCont == "single" ? "is-active" : ""}>
                                    <a upload-container="single">
                                        <span upload-container="single" className="icon is-small"><i className="fas fa-file" aria-hidden="true"></i></span>
                                        <span upload-container="single">Single File Upload</span>
                                    </a>
                                </li>
                                <li upload-container="multiple" onClick={(e) => setUploadCont("multiple")} id="multiple" className={uploadCont == "multiple" ? "is-active" : ""}>
                                    <a upload-container="multiple">
                                        <span upload-container="multiple" className="icon is-small"><i className="fas fa-copy" aria-hidden="true"></i></span>
                                        <span upload-container="multiple">Multi File Upload</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {
                        (uploadCont && uploadCont == "single") ?

                            <div id="upload_container_single" className="upload-container p-5">
                                <section>
                                    <h3 className="title is-4">Upload Single File</h3>
                                </section>
                                <section>
                                    <div className="notification is-info is-light">
                                        <p className="m-none">All Uploaded files last for 24 hours</p>
                                    </div>
                                </section>
                                <form id="upload_single" onSubmit={handleSingleFileUpload}>
                                    <div className="file has-name is-right is-fullwidth" id="inp_single_file_wrapper">
                                        <label className="file-label">
                                            <input onChange={setFileName} octavalidate="R" id="inp_single_file" className="file-input" type="file" name="single_file" />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fas fa-upload"></i>
                                                </span>
                                                <span className="file-label">
                                                    Choose a file
                                                </span>
                                            </span>
                                            <span className="file-name">
                                                No file selected
                                            </span>
                                        </label>
                                    </div>
                                    <div id="single_progress_section" className="progress-section d-none">
                                        <progress className="progress is-primary" value={progress} max="100">{progress}%</progress>
                                    </div>
                                    <div className="field mt-4">
                                        <button form="upload_single" type="submit" className="button is-primary">Upload file</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div id="upload_container_multiple" className="upload-container p-5">
                                <section>
                                    <h3 className="title is-4">Upload Multiple Files</h3>
                                </section>
                                <section>
                                    <div className="notification is-info is-light">
                                        <p className="m-none">All Uploaded files last for 24 hours</p>
                                    </div>
                                </section>
                                <form action="" id="upload_multiple" encType="multipart/form-data" onSubmit={handleMultiFileUpload}>

                                    <MyDropzone />
                                    <div id="multi_progress_section" className="progress-section d-none">
                                        <progress className="progress is-danger" value={progress} max="100">{progress}%</progress>
                                    </div>
                                    <div className="field mt-4">
                                        <button form="upload_multiple" type="submit" className="button is-app-secondary">Upload file</button>
                                    </div>
                                </form>
                            </div>
                    }
                </section>
            </div>
        </>
    )
}