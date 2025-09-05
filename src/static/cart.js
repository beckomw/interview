

window.addEventListener("DOMContentLoaded", setup);

function setup() {
	renderCart();
	
}




async function renderCart() {
	const cart = await fetchCart();

	const cartItemsContainer = document.getElementById("cart-items");
	const cartTotalPriceEl = document.getElementById("cart--total-price");
	const emptyCartTemplate = document.getElementById("template--empty-cart");
	const cartItemTemplate = document.getElementById("template--cart-item");

	if (!cart || cart.items.length === 0) {
	const emptyCart = emptyCartTemplate.content.cloneNode(true); 
		cartItemsContainer.appendChild(emptyCart); 
		cartTotalPriceEl.innerText = ""; 
		return ; 
	}

	let totalCartPrice = 0;

	for (const item of cart.items) {
		const cartItem = cartItemTemplate.content.cloneNode(true);
		

		const img = cartItem.querySelector(".cart-item--img");
		img.src = item.image.src;
		img.alt = item.title;

		const title = cartItem.querySelector("[name='title']");
		title.innerText = item.title; 


		const quantitySelect = cartItem.querySelector(".cart-item--quantity");
		quantitySelect.value = item.quantity;
		quantitySelect.addEventListener("change", (e) => {
			updateQuantity(item.id, e.target.value);
		});

		const linePrice = item.price * item.quantity; 
		const linePriceEL = cartItem.querySelector("[name='line-price']"); 
		linePriceEL.innerText = `$${(linePrice / 100).toFixed(2)}`;
		
		totalCartPrice += linePrice;

		// Item Removal 
		const removeButton = cartItem.querySelector("[name='remove']"); 
		removeButton.addEventListener("click",() => {
			removeItem(item.id); 
		}); 

		
		cartItemsContainer.appendChild(cartItem);
	}
	cartTotalPriceEl.innerText = `Total: $${(totalCartPrice / 100).toFixed(2)}`;
}


async function fetchCart() {
	const res = await fetch("/api/cart");

	return await res.json();
}

async function updateQuantity(id, quantity) {
	await fetch("/api/cart/update", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ [id]: quantity }),
	});

	renderCart();
}


async function removeItem(){
	await fetch("/api/cart/remove", {
		method: "POST", 
		headers: {"Content-Type": "application/json"}, 
		body: JSON.stringify([id]), 
	})

	renderCart(); 
}