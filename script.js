let myChart = null;
let pokemonData = [];

function getPokemonStats() {

    const pokemonName = document.getElementById('pokemon-name').value;

    if (myChart !== null) {
      myChart.destroy();
    }

    document.getElementById('error-message').innerHTML = '';

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokemon not found.');
        }
        return response.json();
      })
      .then(data => {
        const stats = data.stats.map(stat => stat.base_stat);

        const ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
            datasets: [{
              label: `${pokemonName} Stats`,
              data: stats,
              backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
        const pokeImageData = data.sprites.front_default;
        const pokeImg = document.createElement('img');
        pokeImg.setAttribute('src', pokeImageData);
        pokeImg.setAttribute('alt', pokemonName);
        document.getElementById('pokepic').innerHTML = '';
        document.getElementById('pokepic').appendChild(pokeImg);

        const storedpokeData = {
          name: pokemonName,
          stats: stats,
          imageUrl: pokeImageData
        };
        pokemonData.push(storedpokeData);
        localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
      })
      .catch(error => {
        console.error(error);
        document.getElementById('error-message').innerHTML = error.message;
      });
  }