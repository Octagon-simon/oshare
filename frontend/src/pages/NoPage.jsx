import React from "react";

export default function NoPage(){
    const style = {
        transform: "translate(-50%, 50%)",
        left: "50%"
    }
    return (
        <>
            <section className="container p-3" style={style}>
                <div className="has-text-centered">
                    <img src="/sad.svg" width="150px" />
                    <h5 className="title is-4 mt-3 mb-3">Oops!</h5>
                    <p className="m-0 title is-6">We've searched far and wide but cannot find the page you are looking for</p>
                    <a href="./" className="mt-5 button btn-act is-app-primary-outline">Take me home</a>
                </div>
            </section>
        </>
    )
}