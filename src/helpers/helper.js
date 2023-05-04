export function readFileImage(file, domEl) {
    if(file && domEl) {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = function (e) {
           domEl.src = e.target.result
        };
    }
}