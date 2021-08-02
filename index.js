const express = require('express');
const app = express();

const { users, posts } = require('./data.js');

app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults);
});

app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults);
});

function paginatedResults(models) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < models.length) {
            results.next = page + 1;
        }

        if (startIndex > 0) {
            results.prev = page - 1;
        }

        results.results = models.slice(startIndex, endIndex);

        res.paginatedResults = results;

        next();
    }
}

const PORT = 5000;
app.listen(PORT, () => console.log('Server started at port ' + PORT));
