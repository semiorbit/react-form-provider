import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json' assert {type: 'json'};
import list from './modules.json' assert {type: 'json'};

const defineEntryPoint = (component) => {
    const src = `src/${component}.js`;
    const output = `dist/${component}.js`;
    return {
        input: src,
        output: {file: output, format: 'esm', name: component},
        plugins: [
            external(),
            babel({
                exclude: 'node_modules/**'
            }),
            del({targets: [output]}),
        ],
        external: Object.keys(pkg.peerDependencies || {})
    }
};

export default list.map(entry => defineEntryPoint(entry));