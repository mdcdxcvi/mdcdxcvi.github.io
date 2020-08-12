import NextElement from './nextElement.js'

let data = {
    id: 0,
    elementList: [],
}

let htmlElements = {
    addButton: document.getElementById("addButton"),
    inputText: document.getElementById("inputText"),
    nextContents: document.getElementById("nextContents"),
}

loadData();

htmlElements.inputText.focus();

htmlElements.addButton.onclick = event => {
    let text = htmlElements.inputText.value.trim();

    if (text) {
        let e = new NextElement(data.id++, text);
        data.elementList.push(e);
        htmlElements.nextContents.innerHTML += `<div id="element-${e.id}">${e.getHtml()}</div>`;
    }

    htmlElements.inputText.value = null;
    htmlElements.inputText.focus();
    saveData();
}


window.deleteElement = elementId => {
    data.elementList.forEach(element => {
        if(element.id == elementId) {
            let index = data.elementList.indexOf(element);
            data.elementList.splice(index, 1);
        }
    });

    document.getElementById(`element-${elementId}`).remove();
    saveData();
}


window.voteDown = elementId => {
    data.elementList.forEach(element => {
        if(element.id == elementId) {
            element.negativeVotes++;
            document.getElementById(`element-${elementId}`).innerHTML = element.getHtml();
        }
    });

    saveData();
}


window.voteUp = elementId => {
    data.elementList.forEach(element => {
        if(element.id == elementId) {
            element.positiveVotes++;
            document.getElementById(`element-${elementId}`).innerHTML = element.getHtml();
        }
    });

    saveData();
}

function saveData() {
    localStorage.setItem("NextData", JSON.stringify(data));
}

function loadData() {
    let loadedData = localStorage.getItem("NextData");
    data = JSON.parse(loadedData);

    data.elementList.forEach(e => {
        let element = new NextElement(e.id, e.content);
        element.positiveVotes = e.positiveVotes;
        element.negativeVotes = e.negativeVotes;

        htmlElements.nextContents.innerHTML += `<div id="element-${element.id}">${element.getHtml()}</div>`;
    })
}
