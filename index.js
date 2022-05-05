const app = require('./app');
const config = require('./src/config/environments/index');

const port = config.PORT || 3000;

function main() {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

main();