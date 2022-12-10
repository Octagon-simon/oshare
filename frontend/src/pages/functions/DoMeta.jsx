export default function DoMeta({ title, desc, image }) {
    //remove old tags
    document.querySelectorAll("meta, title").forEach(el => {
        if (el.getAttribute("set-by")) {
            el.remove();
        }
    })
    const frag = document.createDocumentFragment();
    //title
    const t = document.createElement("title");
    t.innerText = title;
    t.setAttribute("set-by", "DoMeta")
    //open graph title
    const ot = document.createElement("meta");
    ot.setAttribute("property", "og:title");
    ot.setAttribute("content", desc);
    ot.setAttribute("set-by", "DoMeta")
    //desc
    const d = document.createElement("meta");
    d.setAttribute("name", "description")
    d.setAttribute("content", desc)
    d.setAttribute("set-by", "DoMeta")
    //open graph image
    const od = document.createElement("meta");
    od.setAttribute("property", "og:image")
    od.setAttribute("content", image)
    od.setAttribute("set-by", "DoMeta")
    //append
    frag.appendChild(t);
    frag.appendChild(ot);
    frag.appendChild(d);
    frag.appendChild(od);
    document.head.appendChild(frag)
}