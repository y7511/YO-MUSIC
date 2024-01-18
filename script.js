const searchForm = document.getElementById('search-form');
const resultsDiv = document.getElementById('results');
const apiKey = 'ef2d9ec4ff50473dd9a09b1c04891e7f'; 

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const artistName = document.getElementById('artist').value.trim();

    if (artistName) {
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data.artist) {
                    resultsDiv.innerHTML = '';

                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');
                    

                    const cardBody = document.createElement('div');
                    cardBody.classList.add('card-body');

                    const image = document.createElement('img');
                    image.src = data.artist.image[2]['#text'];
                    image.classList.add('card-img-top');
                    cardBody.appendChild(image);

                    const cardTitle = document.createElement('h5');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = data.artist.name;
                    cardBody.appendChild(cardTitle);

                    const listGroup = document.createElement('ul');
                    listGroup.classList.add('list-group', 'list-group-flush');

                    if (data.artist.listeners) {
                        const listenersItem = document.createElement('li');
                        listenersItem.classList.add('list-group-item');
                        listenersItem.textContent = `Listeners: ${data.artist.listeners.toLocaleString()}`;
                        listGroup.appendChild(listenersItem);
                    }

                    if (data.artist.playcount) {
                        const playcountItem = document.createElement('li');
                        playcountItem.classList.add('list-group-item');
                        playcountItem.textContent = `Total Plays: ${data.artist.playcount.toLocaleString()}`;
                        listGroup.appendChild(playcountItem);
                    }

                    if (data.artist.tags.tag) {
                        const tagsItem = document.createElement('li');
                        tagsItem.classList.add('list-group-item');
                        tagsItem.textContent = `Genres: ${data.artist.tags.tag.map(tag => tag.name).join(', ')}`;
                        listGroup.appendChild(tagsItem);
                    }

                    if (data.artist.bio.summary) {
                        const bioItem = document.createElement('li');
                        bioItem.classList.add('list-group-item');
                        bioItem.textContent = `Bio: ${data.artist.bio.summary}`;
                        listGroup.appendChild(bioItem);
                    }

                    

                    cardBody.appendChild(listGroup);
                    card.appendChild(cardBody);
                    resultsDiv.appendChild(card);
                } else {
                    resultsDiv.textContent = 'Artist not found.';
                }
            })
            .catch(error => console.error(error));
    }
});