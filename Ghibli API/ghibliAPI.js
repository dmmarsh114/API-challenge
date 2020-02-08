let url = 'https://ghibliapi.herokuapp.com';
let filmEndpoint = '/films';
let peopleEndpoint = '/people';

let list = document.querySelector('ul');


function getFilms() {
    fetch(url + filmEndpoint)
    .then(response => response.json())
    .then(jsonFilms => {
        console.log('Films:', jsonFilms);
        displayFilms(jsonFilms);
    })
}

function getPeople() {    
    fetch(url+peopleEndpoint)
    .then(response => response.json())
    .then(jsonPeople => {
        console.log('People:', jsonPeople);
        getAppearances(jsonPeople);
    })
}

function displayFilms(filmData) {
    
    filmData.forEach(film => {
        // console.log(film);
        
        let filmId = film.id;

        let filmName = document.createElement('li');
        filmName.innerText = film.title;
        
        let description = document.createElement('p');
        description.innerText = film.description;
        
        let people = document.createElement('span');
        people.textContent = 'hello';
        
        
        list.appendChild(filmName);
        filmName.appendChild(description);
        filmName.appendChild(people);
    });
}

function getAppearances(peopleArray) {
    peopleArray.forEach(person => {
        return person.films;
    })
}

function compare(film, appearances) {
    let filmURL = (url += filmEndpoint += film);
    
     
}

getFilms();
getPeople();