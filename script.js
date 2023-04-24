function getPokemonStats() {
    const pokemonName = document.getElementById('pokemon-name').value;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => response.json())
      .then(data => {
        const stats = data.stats.map(stat => stat.base_stat);

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
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
      })
      .catch(error => console.error(error));
  }