// public/scripts.js

// Function to add a favorite movie
function addFavorite(title, year, type, poster_url) {
    fetch('/favorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, year, type, poster_url }),
    })
    .then(response => response.json())
    .then(() => {
        alert('Movie added to favorites!');
    })
    .catch(error => {
        console.error(error);
        alert('Failed to add movie to favorites.');
    });
}

// Function to dynamically display search results
function displaySearchResults(movies) {
    const movieResults = document.getElementById('movieResults');

    movies.forEach(movie => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = movie.Poster;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = movie.Title;

        const year = document.createElement('p');
        year.classList.add('card-text');
        year.textContent = `Year: ${movie.Year}`;

        const type = document.createElement('p');
        type.classList.add('card-text');
        type.textContent = `Type: ${movie.Type}`;

        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('btn', 'btn-primary');
        favoriteButton.textContent = 'Favorite';

        favoriteButton.addEventListener('click', () => {
            addFavorite(movie.Title, movie.Year, movie.Type, movie.Poster);
        });

        cardBody.appendChild(title);
        cardBody.appendChild(year);
        cardBody.appendChild(type);
        cardBody.appendChild(favoriteButton);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        movieResults.appendChild(col);
    });
}

// Function to dynamically display favorites
function displayFavorites(favorites) {
    const favoritesList = document.getElementById('favoritesList');

    favorites.forEach(favorite => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = favorite.title;

        const yearCell = document.createElement('td');
        yearCell.textContent = favorite.year;

        const typeCell = document.createElement('td');
        typeCell.textContent = favorite.type;

        const posterCell = document.createElement('td');
        const posterImage = document.createElement('img');
        posterImage.src = favorite.poster_url;
        posterImage.alt = favorite.title;
        posterImage.height = 100;

        posterCell.appendChild(posterImage);

        row.appendChild(titleCell);
        row.appendChild(yearCell);
        row.appendChild(typeCell);
        row.appendChild(posterCell);

        favoritesList.appendChild(row);
    });
}
