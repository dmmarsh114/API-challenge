let baseURL = 'http://www.dnd5eapi.co'

let list = document.querySelector('ul');

function fetchBase() {
    fetch(baseURL + '/api/')
    .then(response => response.json())
    .then(jsonData => displayBase(jsonData))
}

fetchBase();

function displayBase(data) {

    console.log(data);

    for (let item in data) {

        let x = data[item];

        let listItem = document.createElement('li');
        
        let itemButton = document.createElement('button');
        itemButton.innerText = `Get me ${item}`;
        itemButton.addEventListener('click', function(e, y, z) {
            y = x;
            z = item;
            getStuff(y, z);
        })

        list.appendChild(listItem);
        listItem.appendChild(itemButton);
    }
}

function getStuff(endpoint, name) {
    fetch(baseURL + endpoint)
    .then(response => response.json())
    .then(jsonData => console.log(`${name}:`, jsonData.results))
}