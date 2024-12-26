document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.querySelectorAll('.item').forEach(item => {
    const images = item.querySelectorAll('.gallery-img');
    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    item.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    item.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartCountElement = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    
    // contador
    function updateCart() {
        cartCountElement.textContent = cartItems.length;
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <p>${item.product}</p>
                <p>Precio: $${item.price}</p>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        cartTotalElement.textContent = total;
    }

    // Agregar un producto
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const product = event.target.getAttribute("data-product");
            const price = parseFloat(event.target.getAttribute("data-price"));
            cartItems.push({ product, price });
            updateCart();
        });
    });

    // Eliminar un producto
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = parseInt(event.target.getAttribute("data-index"));
            cartItems.splice(index, 1);
            updateCart();
        }
    });

    // Finalizar compra
    document.getElementById("checkout").addEventListener("click", () => {
        if (cartItems.length > 0) {
            alert("Gracias por tu compra!");
            cartItems.length = 0; // Vaciar carrito
            updateCart();
        } else {
            alert("El carrito está vacío.");
        }
    });
});

