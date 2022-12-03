import React, { useCallback } from "react";
import { octaValidate } from 'octavalidate-reactjs'
import { useDropzone } from 'react-dropzone'
import "react-dropzone/"
export default function Home() {
    // const reverse = function(){
    //     return this.split('').reverse().join()
    // } 
    // String.prototype.reverse = reverse
    /*


    */

    // function myDropzone() {
    //     const onDrop = useCallback(acceptedFiles => {
    //         // Do something with the files
    //     }, [])
    //     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    //     return (
    //         <div {...getRootProps()}>
    //             <input {...getInputProps()} />
    //             {
    //                 isDragActive ?
    //                     <p>Drop the files here ...</p> :
    //                     <p>Drag 'n' drop some files here, or click to select files</p>
    //             }
    //         </div>
    //     )
    // }
    function MyDropzone({ open }) {
        const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
            useDropzone({});
        const files = acceptedFiles.map((file) => (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        ));
        return (
            <div className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
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
                        <button type="button" onClick={open} className="btn">
                            Click to select files
                        </button>
                    </div>
                </div>
                <aside>
                    <ul>{files}</ul>
                </aside>
            </div>
        );
    }


    const handleSingleFileUpload = (e) => {
        //prevent reload
        e.preventDefault()
        const myForm = new octaValidate('upload_single', {
            errorElem: {
                'inp_single_file': 'inp_single_file_wrapper'
            }
        });
        if (myForm.validate()) {
            //upload the file
        }
    }

    const setFileName = (e) => {
        //get the current input
        return (document.querySelector('.file-name').innerText = e.target.files[0].name)
    }
    const switchContainer = (e) => {
        const id = e.target.getAttribute('upload-container');
        if (id == "single") {
            //set active class on the tab element
            document.querySelector('li#single').classList.toggle('is-active');
            //make upload container a block element
            document.querySelector('#upload_container_single').classList.toggle('d-block');
            //make element visible to user
            document.querySelector('#upload_container_single').scrollIntoView()
            /*** ***/
            document.querySelector('#upload_container_multiple').classList.remove('d-block');
            //remove active class on the other tab element
            document.querySelector('li#multiple').classList.remove('is-active');
        } else {
            //set active class on the tab element
            document.querySelector('li#multiple').classList.toggle('is-active');
            //make upload container a block element
            document.querySelector('#upload_container_multiple').classList.toggle('d-block');
            //make element visible to user
            document.querySelector('#upload_container_multiple').scrollIntoView()
            /*** ***/
            document.querySelector('#upload_container_single').classList.remove('d-block');
            //remove active class on the other tab element
            document.querySelector('li#single').classList.remove('is-active');
        }
    }
    return (
        <>
            <section className="hero is-medium has-navbar-fixed-top">
                <div className="hero-body">
                    <div className="container m-none" style={{ top: '30%' }}>
                        <h1 className="title home-title has-text-light">Upload & Share only files that matter</h1>
                        <p className=" shas-text-light font-pacifico">Quality contents just for Developers</p>
                        <div id="homeBtn" className="mt-5">
                            <a href="#upload" className="btn-act button is-app-primary is-medium">Get started</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-upload">
                <div className="upload-tabs">
                    <div className="tabs is-toggle is-centered">
                        <ul>
                            <li id="single" onClick={switchContainer} upload-container="single" className="is-active">
                                <a upload-container="single">
                                    <span upload-container="single" className="icon is-small"><i className="fas fa-file" aria-hidden="true"></i></span>
                                    <span upload-container="single">Single File Upload</span>
                                </a>
                            </li>
                            <li upload-container="multiple" onClick={switchContainer} id="multiple">
                                <a upload-container="multiple">
                                    <span upload-container="multiple" className="icon is-small"><i className="fas fa-copy" aria-hidden="true"></i></span>
                                    <span upload-container="multiple">Multi File Upload</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="upload_container_single" className="upload-container p-5 d-block">
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
                                    Screen Shot 2017-07-29 at 15.54.25.png
                                </span>
                            </label>
                        </div>
                        <div className="field mt-4">
                            <button className="button is-primary">Upload file</button>
                        </div>
                    </form>
                </div>
                <div id="upload_container_multiple" className="upload-container p-5">
                    <section>
                        <h3 className="title is-4">Upload Multiple Files</h3>
                    </section>
                    <section>
                        <div className="notification is-info is-light">
                            <p className="m-none">All Uploaded files last for 24 hours</p>
                        </div>
                    </section>
                    <form action="ss" id="upload_multiple" encType="multipart/form-data">
                        <MyDropzone />
                        <input id="inp_multiple_files" type="file" name="multiple_file" />
                        <div className="field mt-4">
                            <button className="button is-primary">Upload file</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}