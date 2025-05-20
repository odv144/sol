const products = [
    {
        id: 1,
        name: 'Cuadernos',
        description: 'Variedad de tamaños y diseños',
        image: 'https://i.postimg.cc/BQGm8GGz/cuadernos.jpg'
    },
    {
        id: 2,
        name: 'Lapices',
        description: 'Lapices de colores y grafito',
        image: 'https://i.postimg.cc/FKfyWP4c/lapices.jpg'
    },
    {
        id: 3,
        name: 'Bolsas',
        description: 'Bolsas de papel y tela',
        image: 'https://i.postimg.cc/bvHyhPpj/geometria.jpg'
    }
];

const gallery = document.querySelector('.gallery');
products.map(product => {
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${(Math.random() * 20 + 5).toFixed(2)}</p> 
        <button class="btn">Agregar al carrito</button>
    </div>`;
    gallery.appendChild(card);
});

