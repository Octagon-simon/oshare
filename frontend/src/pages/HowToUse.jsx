import React from "react";
import { Helmet } from "react-helmet";

export default function HowToUse() {
    const pStyle = {
        backgroundColor: "#fbfbfb"
    }
    return (
        <>
            <Helmet>
                <title>How to use Oshare</title>
                <meta property="og:title" content="How to use Oshare" />
                <meta name="description" content="Learn how you can use Oshare to upload and send files with ease" />
            </Helmet>
            <section className="container mt-5 p-4">
                <article>
                    <h3 className="title is-4 has-text-centered">HOW TO USE</h3>
                    <p className="mb-1" style={pStyle}>Oshare is a <b>web-app</b> that allows you to share links to uploaded files irrespective of the distances involved. <br /></p>
                    <p className="mb-1">
                        All you need to do is to Upload the file that you wish to share, once the upload is complete, a <strong>unique</strong> link will be generated for you.<br />
                    </p>
                    <p>Now you just have to copy the link and share it to your friends.</p>
                    <h4 className="title is-5 mb-2 mt-3"><i className="fas fa-object-group"></i>&nbsp;Upload Options</h4>
                    <div>
                        <p>Oshare comes with two (2) file upload options;</p>
                        <ol className="ml-5">
                            <li>Single File Upload</li>
                            <li>Multiple Files Upload</li>
                        </ol>
                        <h5 className="title is-5 mb-2 mt-3"><i className="fas fa-arrow-up"></i>&nbsp;Single File Upload</h5>
                        <p className="mb-2">The single file upload allows you to upload <b>one file at a time.</b> This is useful if you want to upload just one file and not a group of files.
                        </p>
                        <h5 className="title is-5 mb-2 mt-3"><i className="fas fa-arrow-up"></i><i className="fas fa-arrow-up"></i>&nbsp;Multiple Files Upload</h5>
                        <p className="mb-2"> This upload type allows you to upload a <b>group of files</b> by selecting them individually or using the <em>drag-and-drop</em> feature on the container.</p>
                        <p className="notification is-info is-light">When the files upload successfully, they are automatically zipped and stored on our server!</p>
                    </div>
                    <h4 className="title is-5 mb-3 mt-3"><i className="fas fa-chain"></i>&nbsp;Generated Links</h4>
                    <div className="p-2">
                        <p className="notification is-info is-light mb-2">
                            All uploaded files are valid for 24 hours only.
                        </p>
                        <p className="mb-2">Once an upload is successful, a unique link will be generated for that particular file uploaded. <br /><br /> If you should <a href="/links">visit this page</a>, you will see all the files you uploaded in the last 24 hours as well as their <b>unique links & QR codes</b>.</p>
                        <p className="notification is-danger is-light">
                            Please note that these links are stored on your browser, so if you clear your browser's storage, the links will be deleted too.
                        </p>
                        <p className="has-text-centered">
                            <a href="./" className="mt-3 button btn-act is-app-primary">Start uploading&nbsp;<i className="fa-sm fas fa-arrow-right"></i></a>
                        </p>

                    </div>
                </article>
            </section>
        </>
    )
}