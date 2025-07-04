const resenia =[
    {
        "id": 1,
        "name": "Juan Perez",
        "image": "/img/perfil_male.jpg",
        "review": "Excelente servicio, muy satisfecho con la compra.",
        "rating": 5
    },
    {
        "id": 2,
        "name": "Maria Lopez",
        "image": "/img/perfil_fame.jpg",
        "review": "Muy buena atención al cliente, volveré a comprar.",
        "rating": 4
    },
    {
        "id": 3,
        "name": "Carlos Gomez",
        "image": "/img/perfil_propio.jpg",
        "review": "Productos de alta calidad, totalmente recomendado.",
        "rating": 5
    }
]

const generateStart = (rating) => {
    return '<i class="fas fa-star"></i>'.repeat(rating);
}

const resContainer = document.getElementById("resenia");

resContainer.innerHTML = resenia.map(item => `
    <div class="resenia-item">
        <img src="${item.image}" alt="${item.name}" />
        <p>${item.review}</p>
        <div class="rating">  ${generateStart(item.rating)}</div>
        <h3>${item.name}</h3>
    </div>
`).join("");