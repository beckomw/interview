

window.addEventListener("DOMContentLoaded", setup);


	// rendering the product cards and proper price labeling 

			function renderProducts(products) {
				const productGrid = document.getElementById('product-grid'); 
				productGrid.innerHTML = ''; 
				products.forEach(element => {
					const card = createProductCard(element); 
					productGrid.appendChild(card); 
				});
			}


			function createProductCard(product) {
				const card = document.createElement('div'); 
				card.className = 'product-card'; // this is so we can find and style the card later 

				const title = document.createElement('h3');
				title.textContent = product.title; 

				const price = document.createElement('p'); 
				//  the price is not in the correct format we need to make sure we display it correctly 
				price.textContent = `$${(product.price / 100).toFixed(2)}`; 
				const img = document.createElement('img'); 
				img.src = product.images[0].src; // 
				img.alt = product.title; 

				card.append(img, title, price); // Adding all the data we pulled and appending it to the div
				 
				return card; 

			}











async function setup() {
	// START HERE
	// API Endpoint: GET /products
	// Returns: Array of product objects with id, title, price (in cents), and array of images
	// TODO: Fetch products from the API 
	// TODO: Render the products to the page in a responsive grid
	// TODO: Sort the products by price (low to high by default)
	// TODO: Implement search functionality
	// BONUS: Use the refactored sorting function for dynamic sort order
	// BONUS: Add error handling for the fetch request
			// There was no "dev" branch available when I forked the Repository.  - Wayne 


			// Fetching products from the API (since Products is being stored in the API I have to manually them from the endpoint and create a variable for them)
		 	try {
				const response = await fetch('/products')
				if (!response.ok) {
					throw new Error(`Error status: ${response.status}`);
				}
				const products = await response.json();// we have to make sure the data is parsed and stays in JSON 
				console.log(products); // display the correct information 

					renderProducts(products);
			// using catch and a log statment to verify what the error is 

			} catch (error) {
				console.log("No products available", error); 
			}

		

			

			
		}



			

		






















/**
 * Sorts an array of products by price in ascending or descending order.
 *
 * Your task is to refactor and improve this function:
 * - Make it clean, modern, and readable.
 * - Allow sorting in either "asc" or "desc" order using the `sortOrder` parameter.
 * - Ensure the output remains the same.
 * - A plus, but you do not need to use the messyFunction() function.
 *
 * Requirements:
 * - Refactor the code to use modern JavaScript syntax and best practices.
 * - Rename variables and functions to be more descriptive.
 * - Fill in the missing parts of the JSDoc comments.
 *
 * Feel free to leave comments explaining your thought process.
 *
 * @param {Array} products - Array of product objects, each with a `price` property.
 * @param {string} sortOrder - Either "asc" for ascending or "desc" for descending sort order.
 * @returns {Array} - A new array of products sorted by price in the specified order.
 */
function messyFunction(data1, data2) {
	let t = [];
	for (let i = 0; i < data1.length; i++) {
		t.push(data1[i]);
	}
	for (let i = 0; i < t.length; i++) {
		for (let j = i + 1; j < t.length; j++) {
			if ((data2 === "asc" && t[i].price > t[j].price) || (data2 === "desc" && t[i].price < t[j].price)) {
				let tmp = t[i];
				t[i] = t[j];
				t[j] = tmp;
			}
		}
	}
	return t;
}
