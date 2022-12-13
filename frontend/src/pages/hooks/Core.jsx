export default function Core(){

    const doFileSize = (bytes) => {
        const mb = Math.round(Number(bytes) / 1024 / 1024);
        const kb = Math.round(Number(bytes) / 1024);

        return (mb) ? mb+" Mb" : kb+" Kb"
    }

    return {
        doFileSize
    }
}