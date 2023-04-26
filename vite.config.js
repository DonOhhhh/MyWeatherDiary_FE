import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgrPlugin()],
    server: {
        host: "0.0.0.0",
        port: 3000,
        proxy: {
            "/proxy": {
                target: "http://192.168.0.47:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/\/proxy/, "/api/v1"),
            },
        },
    },
    preview: {
        port: 80,
        proxy: {
            "/proxy": {
                target: "http://ip-10-10-4-10.ap-northeast-2.compute.internal:8080",
                changeOrigin: false,
                rewrite: (path) => path.replace(/\/proxy/, "/api/v1"),
            },
        },
    },
});
