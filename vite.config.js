import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        watch: {
            usePolling: true, // 修复HMR热更新失效
        },
        host: "www.corho.com",
        port: 8080,
        cors: true,
        open: true,
        hmr: true,
    },
    plugins: [vue({ reactivityTransform: true }), vueSetupExtend()],
    resolve: {
        alias: {
            // '@':'./src' // 会引起热更新失效的问题
            "@": resolve(__dirname, "./src"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: "\n          @import \"@/assets/styles/variables.less\";\n          @import \"@/assets/styles/mixins.less\";\n        ",
            },
        },
    },
});
