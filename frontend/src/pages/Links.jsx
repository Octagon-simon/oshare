import React, { useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import useLinkAction from "./hooks/LinkAction";
import useTimeFormat from "./hooks/TimeFormat";
import { Helmet } from "react-helmet";

export default function Links() {
    const [data, setData] = useState("")
    const [showModal, setShowModal] = useState(false)
    const { savedLinks } = useLinkAction()
    const { checkValidity, getHours } = useTimeFormat();
    //do if validity has passed, unset the item from session storage
    const handleCopy = (e) => {
        const link = e.target.getAttribute('data-link')
        if (link) {
            window.navigator.clipboard.writeText(atob(link)).then(() => {
                toast.info("File Link has been copied 🤩")
            }, () => {
                toast.error("Failed to copy link 😔")
            })
        }
    }
    const handleQrCodeBtn = (e) => {
        const link = atob(e.target.getAttribute("data-link"))
        setData(link)
        setShowModal(true)
    }

    const ShowQrCode = ({ link = data }) => {
        const closeModal = () => {
            document.querySelector('.modal').classList.remove('is-active')
            setShowModal(false)
        }
        return (
            <>
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                            <article className="media">
                                <div className="media-content">
                                    <div className="content has-text-centered">
                                        <QRCodeSVG value={link} />
                                        <h6 className="title is-6 mt-2 mb-0">Scan the QR Code</h6>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <button onClick={closeModal} className="modal-close is-large" aria-label="close"></button>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>My File Links</title>
                <meta property="og:title" content="My File Links" />
                <meta name="description" content="Visit this page to copy and view the QR codes of the links to your uploaded files." />
            </Helmet>
            <div className="container history-container mw-500 p-3 mt-5">
                <h4 className="title is-4 mb-3">My Links</h4>
                <p className="mb-2">Here are the links from your past uploads</p>

                {
                    (Object.keys(savedLinks).length) ?
                        <>
                            {showModal && <ShowQrCode />}
                            <p className="notification is-info is-light p-3 mb-5">
                                All links will become invalid after 24 hours from when it was generated.
                            </p>
                            <div className="table-responsive">
                                <table className="table is-bordered is-fullwidth">
                                    <thead>
                                        <tr className="text-center">
                                            <th scope="col">#</th>
                                            <th scope="col">Link</th>
                                            <th scope="col">Time Left</th>
                                            <th scope="col" colSpan={2} className="has-text-centered">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="append_links">
                                        {
                                            savedLinks.map((el, ind) => {
                                                return (
                                                    <tr key={ind}>
                                                        <td>{++ind}</td>
                                                        <td>{el.link}</td>
                                                        <td>
                                                            {(el.expTime) ? getHours(el.expTime) + " Hours" : ""}
                                                        </td>
                                                        <td className="has-text-centered">
                                                            <button data-link={btoa(el.link)} onClick={handleQrCodeBtn} className="button is-danger">QR code</button>
                                                        </td>
                                                        <td className="has-text-centered">
                                                            <button data-link={btoa(el.link)} onClick={handleCopy} className="button is-primary">Copy link</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>

                        :
                        <>
                            <div className="p-5 notification is-danger is-light">
                                <p className="m-0 has-text-centered">No File links were found</p>
                            </div>
                        </>
                }
            </div>
        </>
    )
}