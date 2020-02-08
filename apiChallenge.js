let url = 'https://ghibliapi.herokuapp.com';
let filmEndpoint = '/films';
let peopleEndpoint = '/people';

let list = document.querySelector('ul');

// get films
fetch(url + filmEndpoint)
.then(response => response.json())
.then(jsonFilms => displayFilms(jsonFilms))

// get people
function getPeople(filmId) {
    fetch(url + peopleEndpoint)
    .then(response => response.json())
    .then(jsonPeople => {
        console.log(jsonPeople);
        // console.log('Film ID:', filmId);

        jsonPeople.forEach(person => {
            console.log(person.name, person.films.length);
        })
    })
}

function displayFilms(filmData) {
    console.log('Films:', filmData);

    filmData.forEach(film => {
        // console.log(film);

        let filmId = film.id;
    
        let filmName = document.createElement('li');
        filmName.innerText = film.title;
        
        let description = document.createElement('p');
        description.innerText = film.description;

        let button = document.createElement('button');
        button.innerText = `get people from ${film.title}`;
        button.addEventListener('click', function(clickEvent, x) {
            x = filmId;
            getPeople(filmId);
        });
        
        list.appendChild(filmName);
        filmName.appendChild(description);
        filmName.appendChild(button);
    });
}


// function getPeople(x, film) {
//     x = film.title;
//     fetch(film.people[0])
//         .then(response => response.json())
//         .then(jsonPeople => displayPeople(jsonPeople));
//     return x;
// }

// function displayPeople(peopleData) {
//     console.log(peopleData);
    
//     let peopleList = document.createElement('ul');

//     peopleData.forEach(person => {
//         // console.log(person.name);

//     })
// }