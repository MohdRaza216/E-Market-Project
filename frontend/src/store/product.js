import { create } from 'zustand';

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		try {
			const res = await fetch(`/api/products/${pid}`, {
				method: "DELETE",
			});
	
			// Log the entire response to debug
		console.log("Response status:", res.status);
		console.log("Response headers:", res.headers);

		let data = {};
		if (res.headers.get("content-type")?.includes("application/json")) {
			data = await res.json();
		}
		console.log("Response data:", data);

	
			if (!res.ok || !data.success) {
				return { success: false, message: data.message || "Failed to delete product" };
			}
	
			// Update the UI immediately by filtering out the deleted product
			set((state) => ({
				products: state.products.filter((product) => product._id !== pid),
			}));
	
			return { success: true, message: data.message || "Product deleted successfully" };
		} catch (error) {
			return { success: false, message: error.message || "An error occurred" };
		}
	},	
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));