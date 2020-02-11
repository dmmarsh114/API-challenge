let baseURL = 'http://www.dnd5eapi.co'

let mainList = document.getElementById('mainList');
let selectedList = document.getElementById('selectedList');

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
        mainList.appendChild(spell);

        let infoButton = document.createElement('button');
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

    while (selectedList.firstChild) {
        selectedList.removeChild(selectedList.firstChild);
    }

    let spellHeading = document.createElement('h3');
    spellHeading.innerText = data.name;
    
    let school = document.createElement('p');
    school.innerText = 'School of ' + data.school.name;

    let classHeading = document.createElement('p');
    classHeading.innerText = 'Classes:';

    let classes = document.createElement('p');
    classHeading.appendChild(classes);

    data.classes.forEach(i => {
        let x = document.createElement('li');
        x.innerText = i.name;
        classes.appendChild(x);
    })

    let infoList = document.createElement('ul');

    let spellLevel = document.createElement('li');
    spellLevel.innerText = 'Level: ' + data.level;
    
    let range = document.createElement('li');
    range.innerText = 'Range: ' + data.range;
    
    let castingTime = document.createElement('li');
    castingTime.innerText = 'Casting Time: ' + data.casting_time;
    
    let duration = document.createElement('li');
    duration.innerText = 'Duration: ' + data.duration;
    
    let pageNum = document.createElement('li');
    pageNum.innerText = 'Page Number: ' + data.page;

    selectedList.appendChild(spellHeading);
    selectedList.appendChild(school);
    selectedList.appendChild(classHeading);
    selectedList.appendChild(infoList);
    infoList.appendChild(spellLevel);
    infoList.appendChild(range);
    infoList.appendChild(castingTime);
    infoList.appendChild(duration);
    infoList.appendChild(pageNum);
    
    let description = data.desc;
    description.forEach(line => {
        let para = document.createElement('p');
        para.innerText = line;
        selectedList.appendChild(para);
    })    

    if (data.higher_level) {
        data.higher_level.forEach(line => {
            let para2 = document.createElement('p');
            para2.innerText = line;
            selectedList.appendChild(para2);
        })
    }
}