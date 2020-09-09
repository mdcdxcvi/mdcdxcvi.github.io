import NextElement from './nextElement.js'
import database from './firebaseDatabase.js'

let data = {
    id: 0,
    elementList: [],
}

let htmlElements = {
    addButton: document.getElementById("addButton"),
    sortButton: document.getElementById("sortButton"),
    inputText: document.getElementById("inputText"),
    nextContents: document.getElementById("nextContents"),
    doneContents: document.getElementById("doneContents"),
}

htmlElements.inputText.focus();

htmlElements.sortButton.onclick = event => {
    data.elementList.sort((a, b) => b.getVotes() - a.getVotes());
    saveData();
}

htmlElements.addButton.onclick = event => {
    addElement();
}

htmlElements.inputText.onkeydown = event => {
    if (event.key === 'Enter') {
        addElement();
    }
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

window.done = elementId => {
    data.elementList.forEach(element => {
        if(element.id == elementId) {
            element.done = !element.done;
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
    htmlElements.doneContents.innerHTML = ''
    data = JSON.parse(s.val());

    data.elementList = data.elementList.map(e => {
        let element = new NextElement(e.id, e.content);
        element.positiveVotes = e.positiveVotes;
        element.negativeVotes = e.negativeVotes;
        element.done = e.done;
        return element;        
    })

    data.elementList.forEach(e => {
        let htmlElement = `<div id="element-${e.id}">${e.getHtml()}</div>`;
        if (e.done) htmlElements.doneContents.innerHTML += htmlElement;
        else htmlElements.nextContents.innerHTML += htmlElement;
    });
})

function addElement() {
    let text = htmlElements.inputText.value.trim();

    if (text) {
        let e = new NextElement(data.id++, text);
        data.elementList.push(e);
    }

    htmlElements.inputText.value = null;
    htmlElements.inputText.focus();
    saveData();
 }
