export default function Core() {

    const doFileSize = (bytes) => {
        const mb = Math.round(Number(bytes) / 1024 / 1024);
        const kb = Math.round(Number(bytes) / 1024);

        return (mb) ? mb + " Mb" : kb + " Kb"
    }

    const detectAgent = () => {
        let userAgent = navigator.userAgent;
        let browserName = "";

        if (userAgent.match(/chrome|chromium|crios/i)) {
            browserName = "chrome";
        } else if (userAgent.match(/firefox|fxios/i)) {
            browserName = "firefox";
        } else if (userAgent.match(/safari/i)) {
            browserName = "safari";
        } else if (userAgent.match(/opr\//i)) {
            browserName = "opera";
        } else if (userAgent.match(/edg/i)) {
            browserName = "edge";
        } else {
            browserName = "No browser detection";
        }
        //return stuff
        return browserName;
    }

    return {
        doFileSize, detectAgent
    }
}