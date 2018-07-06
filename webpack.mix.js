let mix = require('laravel-mix');

mix.js('app/monitor/monitor.js', 'dist');

mix.js('app/server/server.js', 'dist');

mix.options({
    extractVueStyles: true,
    // globalVueStyles: `./src/sass/nawcast/_variables.sass`,
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

mix.disableSuccessNotifications();

mix.setPublicPath(`dist/`);
