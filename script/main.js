var input = document.getElementsByClassName("input")[0];
var list = document.getElementsByClassName("list")[0];
var button = document.getElementsByClassName("button")[0];
var prevSelect = "";

function main() {
    fillList();
    input.addEventListener("click", showList);
    button.addEventListener("click", showList);
    input.addEventListener("input", showSelection);
    list.addEventListener("click", choose);
    document.addEventListener("click", cancel);
    window.addEventListener("scroll", cancel);
    window.addEventListener("resize", cancel);
}

function fillList() {
    for (let i = 0; i < data.length; i++) {
        let elem = document.createElement("option");
        elem.setAttribute("label", data[i].label);
        list.appendChild(elem);
    }
}

function showList() {
    if (input.getBoundingClientRect().bottom + list.clientHeight > window.innerHeight) {
        list.style.bottom = (input.clientHeight + list.clientHeight + 10) + "px";
    } else {
        list.style.bottom = 0 + "px";
    }

    list.style.visibility = "visible";
    input.value = "";
    input.focus();
    event.stopPropagation();

}

function showSelection(event) {
    let options = document.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
        let label = options[i].getAttribute("label");
        if (label.substr(0, input.value.length).toLowerCase() !== input.value.toLowerCase()) {
            options[i].hidden = true;
        } else {
            options[i].hidden = false;
        }
    }
}

function getChar(event) {
    if (event.which != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
    }
    return null;
}

function choose(event) {
    list.style.visibility = "hidden";
    let label = event.target.getAttribute("label");
    input.value = label;
    prevSelect = label;
    event.stopPropagation()
}

function cancel() {
    list.style.visibility = "hidden";
    input.value = prevSelect;
    input.blur();
    let options = document.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].hidden = false;
    }
}

main();
