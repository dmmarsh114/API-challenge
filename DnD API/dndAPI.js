let baseURL = 'http://www.dnd5eapi.co'

let mainList = document.getElementById('mainList');
let selectedList = document.getElementById('selectedList');

let card = document.getElementById('spellCard');
let cardTitle = document.getElementById('spellName');
let schoolTitle = document.getElementById('schoolTitle');
let charClasses = document.getElementById('charClassesTitle');
let infoList = document.getElementById('infoList');
let spellDesc = document.getElementById('spellDesc');

function getSpells() {
    fetch(baseURL + '/api/spells')
    .then(response => response.json())
    .then(jsonData => displaySpells(jsonData))
}

getSpells();

function displaySpells(data) {
    let results = data.results;
    results.forEach(item => {
        let spell = document.createElement('li');
        spell.classList.add('mainLi');
        
        mainList.appendChild(spell);

        let infoButton = document.createElement('button');
        infoButton.classList.add('button');
        infoButton.innerText = item.name;
        spell.appendChild(infoButton);

        infoButton.addEventListener('click', function(e, url) {
            url = item.url;
            getMoreInfo(url);
        });
    })
}

function getMoreInfo(url) {
    fetch(baseURL + url)
    .then(response => response.json())
    .then(jsonData => {
        console.log(jsonData);
        displayMoreInfo(jsonData);
    })    
}

function displayMoreInfo(data) {

    while (spellDesc.firstChild) {
        spellDesc.removeChild(spellDesc.firstChild);
    }

    while (infoList.firstElementChild) {
        infoList.removeChild(infoList.firstChild);
    }

    cardTitle.innerText = data.name;
    
    schoolTitle.innerText = 'School of ' + data.school.name;

    charClasses.innerText = 'Classes:';

    for (let i = 0; i < data.classes.length; i++) {
        let x = data.classes[i]
        if (i === 0) {
            charClasses.innerText += (' ' + x.name);
        } else {
            charClasses.innerText += (', ' + x.name);
        }
    }          

    let spellLevel = document.createElement('li');
    spellLevel.classList.add("list-group-item");
    spellLevel.innerText = 'Level: ' + data.level;
    infoList.appendChild(spellLevel);
    
    let range = document.createElement('li');
    range.classList.add("list-group-item");
    range.innerText = 'Range: ' + data.range;
    infoList.appendChild(range);

    let castingTime = document.createElement('li');
    castingTime.classList.add("list-group-item");
    castingTime.innerText = 'Casting Time: ' + data.casting_time;
    infoList.appendChild(castingTime);

    let duration = document.createElement('li');
    duration.classList.add("list-group-item");
    duration.innerText = 'Duration: ' + data.duration;
    infoList.appendChild(duration);

    let pageNum = document.createElement('li');
    pageNum.classList.add("list-group-item");
    pageNum.innerText = 'Page Number: ' + data.page;
    infoList.appendChild(pageNum);
    
    let description = data.desc;
    description.forEach(line => {
        let para = document.createElement('p');
        para.innerText = line;
        spellDesc.appendChild(para);
    })    

    if (data.higher_level) {
        data.higher_level.forEach(line => {
            let para2 = document.createElement('p');
            para2.innerText = line;
            spellDesc.appendChild(para2);
        })
    }
}