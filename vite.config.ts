import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "src/assets"),
			components: path.resolve(__dirname, "src/components"),
			router: path.resolve(__dirname, "src/router"),
			hooks: path.resolve(__dirname, "src/hooks"),
			lib: path.resolve(__dirname, "src/lib"),
			context: path.resolve(__dirname, "src/context"),
			providers: path.resolve(__dirname, "src/providers"),
			pages: path.resolve(__dirname, "src/pages"),
			api: path.resolve(__dirname, "src/api"),
			layouts: path.resolve(__dirname, "src/layouts"),
			types: path.resolve(__dirname, "src/types"),
			constants: path.resolve(__dirname, "src/constants"),
			modules: path.resolve(__dirname, "src/modules"), 
			stores: path.resolve(__dirname, "src/stores"), 
			config: path.resolve(__dirname, "src/config"),
			"@": path.resolve(__dirname, "src"), 
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:4000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
