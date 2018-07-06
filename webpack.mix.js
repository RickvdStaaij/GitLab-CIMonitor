let mix = require('laravel-mix');

mix.js('monitor/monitor.js', 'dist');

mix.sass('monitor/sass/monitor.sass', 'dist');

mix.options({
    extractVueStyles: true,
    globalVueStyles: `./src/sass/nawcast/_variables.sass`,
    // uglify: {
    //     uglifyOptions: {
    //         compress: {
    //             drop_console: mix.inProduction(),
    //         },
    //     },
    // },
});

if (!mix.inProduction()) {
    mix.webpackConfig({ devtool: `inline-source-map` });
}

mix.version();

mix.browserSync({
    proxy: `localhost:9999`,
    injectChanges: false,
    files: [`dist/**/*`],
});

mix.disableSuccessNotifications();

mix.setPublicPath(`dist/`);
