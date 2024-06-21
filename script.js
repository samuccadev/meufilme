// Exemplo de dados de filmes (pode ser substituído por um backend ou API real)
const movies = [
  {
    title: "Kevin",
    image: "filme1.jpg",
    description: "Descrição do Filme 1.",
  },
  {
    title: "Machete",
    image: "filme2.jpg",
    description: "Descrição do Filme 2.",
  },
  {
    title: "Playmobil",
    image: "filme3.jpg",
    description: "Descrição do Filme 3.",
  },
  {
    title: "A noite da virada",
    image: "filme4.jpg",
    description: "Descrição do Filme 4.",
  },
  // Adicionar mais filmes conforme necessário
];

// Função para renderizar os filmes na página
function renderMovies(movieData) {
  const movieListElement = document.getElementById("movieList");
  movieListElement.innerHTML = ""; // Limpa a lista atual

  (movieData || movies).forEach((movie) => {
    const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.description}</p>
                        <button class="btn btn-primary" onclick="showDetails('${movie.title}', '${movie.image}', '${movie.description}')">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `;
    movieListElement.innerHTML += card;
  });
}

function renderMovies(movieData) {
  const movieListElement = document.getElementById("movieList");
  movieListElement.innerHTML = ""; // Limpa a lista atual

  (movieData || movies).forEach((movie) => {
    const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.description}</p>
                        <button class="btn btn-primary" onclick="showDetails('${movie.title}', '${movie.image}', '${movie.description}')">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `;
    movieListElement.innerHTML += card;
  });
}

// Função para exibir os detalhes do filme em um modal
function showDetails(title, image, description) {
  const modalBody = `
        <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <img src="${image}" class="img-fluid mb-3" alt="${title}">
            <p>${description}</p>
        </div>
    `;

  // Criação dinâmica do modal com Bootstrap
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");
  modalDialog.innerHTML = modalBody;

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.appendChild(modalDialog);

  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = "movieModal";
  modal.tabIndex = "-1";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "movieModalLabel");
  modal.setAttribute("aria-hidden", "true");
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  // Ativação do modal com Bootstrap
  $("#movieModal").modal("show");

  // Remove o modal do DOM após fechamento
  $("#movieModal").on("hidden.bs.modal", function (e) {
    document.body.removeChild(modal);
  });
}

// Função para filtrar os filmes com base no texto de pesquisa
function filterMovies(searchText) {
  const filteredMovies = movies.filter((movie) => {
    const titleMatches = movie.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const descriptionMatches = movie.description
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return titleMatches || descriptionMatches;
  });

  renderMovies(filteredMovies); // Renderiza os filmes filtrados na página
}

// Função para configurar a funcionalidade de pesquisa
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    filterMovies(this.value.trim());
  });
}

// Chamada da função para gerar os cartões de filme e configurar a pesquisa
document.addEventListener("DOMContentLoaded", function () {
  renderMovies(); // Renderiza todos os filmes ao carregar a página
  setupSearch(); // Configura a funcionalidade de pesquisa
});
