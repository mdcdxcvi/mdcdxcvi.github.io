import NextElement from './nextElement.js'
import database from './firebaseDatabase.js'

let data = {
    id: 0,
    elementList: [],
}

let htmlElements = {
    addButton: document.getElementById("addButton"),
    inputText: document.getElementById("inputText"),
    nextContents: document.getElementById("nextContents"),
}

htmlElements.inputText.focus();

htmlElements.addButton.onclick = event => {
    let text = htmlElements.inputText.value.trim();

    if (text) {
        let e = new NextElement(data.id++, text);
        data.elementList.push(e);
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
        }
    });

    saveData();
}


window.voteUp = elementId => {
    data.elementList.forEach(element => {
        if(element.id == elementId) {
            element.positiveVotes++;
        }
    });

    saveData();
}

function saveData() {
    database.ref("NextData").set(JSON.stringify(data));
}

database.ref("NextData").on('value', s => {
    if(!s.val()) return;

    htmlElements.nextContents.innerHTML = ''
    data = JSON.parse(s.val());

    data.elementList = data.elementList.map(e => {
        let element = new NextElement(e.id, e.content);
        element.positiveVotes = e.positiveVotes;
        element.negativeVotes = e.negativeVotes;
        return element;        
    })

    data.elementList.forEach(e => {
        htmlElements.nextContents.innerHTML += `<div id="element-${e.id}">${e.getHtml()}</div>`;
    });
})
