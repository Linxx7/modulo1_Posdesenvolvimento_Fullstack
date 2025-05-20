// Array para armazenar os itens do carrinho
let cart = [];

// Selecionar elementos do DOM
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalElement = document.getElementById('total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Adicionar event listeners aos botões de adicionar ao carrinho
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Função para adicionar um produto ao carrinho
function addToCart(event) {
    const product = event.target.closest('.product');
    const id = product.dataset.id;
    const price = parseFloat(product.dataset.price);
    const name = product.querySelector('h3').textContent;
    const imgSrc = product.querySelector('img').src;

    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        existingItem.quantity++;
    } else {
        // Se o produto não estiver no carrinho, adiciona-o
        cart.push({
            id,
            name,
            price,
            imgSrc,
            quantity: 1
        });
    }

    // Atualizar a exibição do carrinho
    updateCart();
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    // Atualizar o contador de itens no carrinho
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Limpar o conteúdo atual do carrinho
    cartItems.innerHTML = '';

    // Se não houver itens no carrinho, exibir uma mensagem
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        totalElement.textContent = 'R$ 0,00';
        return;
    }

    // Adicionar cada item ao carrinho
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.dataset.id = item.id;

        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <div>
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase">+</button>
            </div>
            <button class="remove-item">X</button>
        `;

        cartItems.appendChild(cartItemElement);

        // Adicionar event listeners aos botões de quantidade
        const decreaseBtn = cartItemElement.querySelector('.decrease');
        const increaseBtn = cartItemElement.querySelector('.increase');
        const removeBtn = cartItemElement.querySelector('.remove-item');

        decreaseBtn.addEventListener('click', () => decreaseQuantity(item.id));
        increaseBtn.addEventListener('click', () => increaseQuantity(item.id));
        removeBtn.addEventListener('click', () => removeItem(item.id));
    });

    // Calcular e exibir o total
    updateTotal();
}

// Função para diminuir a quantidade de um item
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    } else if (item && item.quantity === 1) {
        removeItem(id);
    }
}

// Função para aumentar a quantidade de um item
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Função para remover um item do carrinho
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Função para calcular e atualizar o total
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Inicializar o carrinho
updateCart(); 