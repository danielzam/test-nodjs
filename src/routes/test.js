const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('test-add');
});

router.post('/test/new', (req, res) => {
    const {name, lastname, phone, dni, email, date} = req.body;
    res.send('Ok');
});

module.exports = router;