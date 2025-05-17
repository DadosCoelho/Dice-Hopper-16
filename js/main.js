document.addEventListener('DOMContentLoaded', () => {
  // Lógica para carregar e exibir os jogos
  fetch('./games.json')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#games-table tbody');
      tableBody.innerHTML = ''; // Limpa a tabela

      data.forEach(game => {
        const row = document.createElement('tr');

        // Coluna: Nome do Jogo (clicável)
        const nameCell = document.createElement('td');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = game.name;
        nameSpan.className = 'game-link';
        nameSpan.addEventListener('click', () => {
          // Redireciona para a página do jogo
          window.location.href = `./games/${game.folder}/index.html`;
        });
        nameCell.appendChild(nameSpan);
        row.appendChild(nameCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar games.json:', error);
      const tableBody = document.querySelector('#games-table tbody');
      tableBody.innerHTML = '<tr><td>Erro ao carregar os jogos. Verifique o arquivo games.json.</td></tr>';
    });

  // Lógica para alternar o tema claro/escuro
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Atualiza o ícone do botão
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌓';
  });

  // Opcional: Salvar a preferência de tema no localStorage
  // Para que o tema persista entre as páginas, você precisaria
  // adicionar lógica similar nos scripts de cada jogo e no main.js
  // para ler o localStorage ao carregar a página.
  /*
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.textContent = '☀️';
  } else {
      themeToggle.textContent = '��';
  }

  themeToggle.addEventListener('click', () => {
      document.body.classList.classList.toggle('dark-theme');
      let theme = 'light';
      if (document.body.classList.contains('dark-theme')) {
          theme = 'dark';
          themeToggle.textContent = '☀️';
      } else {
          themeToggle.textContent = '��';
      }
      localStorage.setItem('theme', theme);
  });
  */
});