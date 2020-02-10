let baseURL = 'http://www.dnd5eapi.co'

let mainList = document.getElementById('mainList');
let selectedList = document.getElementById('selectedList');

function fetchBase() {
    fetch(baseURL + '/api/')
    .then(response => response.json())
    .then(jsonData => displayBase(jsonData))
}

fetchBase();

function displayBase(data) {

    console.log(data);

    for (let item in data) {

        let itemEndpoint = data[item];

        let listItem = document.createElement('li');
        
        let itemButton = document.createElement('button');
        itemButton.innerText = `Get me ${item}`;
        itemButton.addEventListener('click', function(e, endpoint, name) {
            endpoint = itemEndpoint;
            name = item;
            getStuff(endpoint, name);
        })

        mainList.appendChild(listItem);
        listItem.appendChild(itemButton);
    }
}

function getStuff(endpoint, name) {
    fetch(baseURL + endpoint)
    .then(response => response.json())
    .then(jsonData => {
        console.log(`${name}:`, jsonData.results)
        displayStuff(jsonData.results);
    })
}

// function displayStuff(data) {
//     for (let item in data) {

//         let itemEndpoint = data[item];

//         let listItem = document.createElement('li');
        
//         let itemButton = document.createElement('button');
//         itemButton.innerText = `Get me ${item}`;
//         itemButton.addEventListener('click', function(e, endpoint, name) {
//             endpoint = itemEndpoint;
//             name = item;
//             getStuff(endpoint, name);
//         })

//         selectedList.appendChild(listItem);
//         listItem.appendChild(itemButton);
//     }
// }