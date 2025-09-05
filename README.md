# Interview Round 2

This is a live coding session that should take about 1-2 hrs.
We'll be piggy-backing off of the project done during round 1.
Take 5-10 mins to plan out-loud and prioritize features.
Most of the HTML and CSS has been completed for you and is found in this repo.
This part of the interview we will go through your planning and development process to implement the objectives below.
Think aloud and we'll ask questions along the way. This is "open book", don't be discouraged to look up anything.
Cart API docs are found below.

### I'll be adding:

- A pre-developed cart page with element templates. (/src/static/cart.html)
- Additional classes to your CSS file. (/src/static/index.css)
- A Cart API to the server.
- 3 screenshots to use as a reference.
- A boilerplate cart.js file. (/src/static/cart.js)

### Objectives:

- [ ] Implement the "Add To Cart" feature on products. (Refer to /resources/Product-add-to-cart.png)
- [ ] Cart icon navigates to /cart
- [ ] Use the empty cart template
- [ ] Fetch and render the cart
- [ ] Use the product template
- [ ] Change quantity feature
- [ ] Calculate total line item price with quantity
- [ ] Calculate cart total price
- [ ] Updates to cart API rerenders the cart items

# Cart API Docs

<details>
<summary><b>Requesting the API</b></summary>

Host: `http://localhost:3000/api/cart`

Sample request

```js
// Example fetch for add to cart
fetch("https://localhost:3000/api/cart/add", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		[12341234]: 1,
	}),
});
```

</details>

<details>
<summary>
<b>
<code>GET</code>
<code>/</code>
Fetch cart
</b>
</summary>

#### Response

The current cart object.

```json
// Example Response
{
	"items": [
		{
			"id": 8267098980637,
			"image": {
				"src": "https://cdn.shopify.com/s/files/1/0746/7876/3805/products/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1682125898"
			},
			"price": 35099,
			"quantity": 1,
			"title": "Oxygen Snowboard"
		}
	]
}
```

</details>

<details>
<summary>
<b>
<code>POST</code>
<code>/add</code>
Add products to cart
</b>
</summary>

#### Request

Object with key value pairs of the product ID and quantity to add.

```json
// Example Request
{
	"8267098980637": 1,
	"8267099111709": 2
}
```

#### Response

The updated cart object.

```json
// Example Response
{
	"items": [
		{
			"id": 8267098980637,
			"image": {
				"src": "https://cdn.shopify.com/s/files/1/0746/7876/3805/products/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1682125898"
			},
			"price": 35099,
			"quantity": 1,
			"title": "Oxygen Snowboard"
		}
	]
}
```

</details>

<details>
<summary>
<b>
<code>POST</code>
<code>/remove</code>
Remove products from cart
</b>
</summary>

#### Request

Array of product IDs to remove.

```json
// Example Request
["8267098980637", "8267099111709"]
```

#### Response

The updated cart object.

```json
// Example Response
{
	"items": []
}
```

</details>

<details>
<summary>
<b>
<code>POST</code>
<code>/update</code>
Update cart item quantity
</b>
</summary>

#### Request

Object with key value pairs of the product ID and new quantity.

```json
// Example Request
{
	"8267098980637": 3
}
```

#### Response

The current cart object.

```json
// Example Response
{
	"items": [
		{
			"id": 8267098980637,
			"image": {
				"src": "https://cdn.shopify.com/s/files/1/0746/7876/3805/products/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1682125898"
			},
			"price": 35099,
			"quantity": 3,
			"title": "Oxygen Snowboard"
		}
	]
}
```

</details>
