function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    if (ev.target.tagName === 'INPUT') {
        var inputValue = ev.target.value;
        var key = draggedElement.value;

        var isCorrect = questionsArr.some(question => question[key] === inputValue);

        if (isCorrect) {
            ev.target.style.border = '2px solid rgb(11, 255, 11';
        } else {
            ev.target.style.border = '2px solid red';
        }

        ev.target.value = inputValue;
    }
}

const resetBtn = document.querySelector('.resetAll');
const inputs = document.querySelector('.inputs');
const buttons = document.querySelector('.buttons');
const score = document.querySelector('.score');

const questionsArr = [
    { 'HTML': 'Veebilehe märgistuskeel' },
    { 'CSS': 'Veebilehtede stiilitabel' },
    { 'JavaScript': 'Veebisaitide programmeerimiskeel' },
    { 'Git': 'Koodiversiooni süsteem' },
    { 'API': 'Programmide vastastikuseks suhtluseks mõeldud liides' },
    { 'Node.js': 'JavaScripti käituskeskkond serveri jaoks' }
];


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const update = (questions) => {
    inputs.innerHTML = '';
    buttons.innerHTML = '';

    const shuffledQuestions = shuffleArray(questions);

    for (let i = 0; i < shuffledQuestions.length; i++) {
        const key = Object.keys(shuffledQuestions[i])[0];
        const value = shuffledQuestions[i][key];

        inputs.insertAdjacentHTML('beforeend', `
            <div id="btn${i + 1}" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
            <input type="button" value="${key}" id="drag${i + 1}" draggable="true" ondragstart="drag(event)" width="336" height="69">
        `);
    }

    for (let i = 0; i < 6; i++) {
        buttons.insertAdjacentHTML('beforeend', `
            <input type="text" value="${shuffledQuestions[i][Object.keys(shuffledQuestions[i])[0]]}" id="dropZone${i + 1}" ondrop="drop(event)" ondragover="allowDrop(event)">
        `);
    }
};

update(questionsArr);

resetBtn.addEventListener('click', () => {
    for (let i = 0; i < 6; i++) {
        const dropZone = document.getElementById(`dropZone${i + 1}`);
        dropZone.style.border = 'none';
        dropZone.value = '';
    }
    shuffleArray(questionsArr);
    update(questionsArr);
});
