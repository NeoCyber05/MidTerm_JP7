import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' + HashRouter: works from any static host or a double-clicked dist/index.html
export default defineConfig({ base: './', plugins: [react()] })
