import initialProducts from "../data/product";

const STORAGE_KEY = "home_inventory_products";

function readStorage() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw);
		// initialize storage with defaults
		localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
		return [...initialProducts];
	} catch (err) {
		console.error("Failed to read products from storage", err);
		return [...initialProducts];
	}
}

function writeStorage(products) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
	} catch (err) {
		console.error("Failed to write products to storage", err);
	}
}

export function getAllProducts() {
	return readStorage();
}

export function getProductById(id) {
	const products = readStorage();
	return products.find((p) => p.id === Number(id)) || null;
}

export function addProduct({ name, quantity = 0, min = 0 }) {
	const products = readStorage();
	const nextId = products.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
	const newProd = {
		id: nextId,
		name: String(name),
		quantity: Number(quantity),
		min: Number(min),
		status: Number(quantity) <= Number(min) ? "Crítico" : "Normal",
	};
	products.push(newProd);
	writeStorage(products);
	return newProd;
}

export function updateProduct(id, patch) {
	const products = readStorage();
	const idx = products.findIndex((p) => p.id === Number(id));
	if (idx === -1) return null;
	products[idx] = {
		...products[idx],
		...patch,
	};
	// recalc status
	products[idx].status = products[idx].quantity <= products[idx].min ? "Crítico" : "Normal";
	writeStorage(products);
	return products[idx];
}

export function removeProduct(id) {
	let products = readStorage();
	products = products.filter((p) => p.id !== Number(id));
	writeStorage(products);
}

export default {
	getAllProducts,
	getProductById,
	addProduct,
	updateProduct,
	removeProduct,
};
