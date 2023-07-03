import visualizer from 'rollup-plugin-visualizer';
import mdPlugin, { Mode } from 'vite-plugin-markdown';

/** @type {() => import('vite').UserConfig} */
export default ({ command }) => ({
	root: 'src',
	base: './',
	build: {
		outDir: '../docs',
		emptyOutDir: true,
		rollupOptions: command === 'build' && {
			plugins: [visualizer({ open: true })],
		},
	},
	plugins: [
		mdPlugin({
			mode: Mode.HTML,
		}),
	],
});
