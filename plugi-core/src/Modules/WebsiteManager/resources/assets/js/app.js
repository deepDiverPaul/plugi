window.addEventListener("message", onMessage, false);

function onMessage(event) {
    if (event.data === 'thumb-saved') {
        const itr = document.querySelector("iframe.thumb-renderer")
        itr.attributes.src = `${itr.attributes.src}`
    }
}
