const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('test-add');
});

router.post('/test/new', async (req, res) => {
    const {name, lastname, phone, dni, email, date} = req.body;
    const errors = [];
    if (!name) {
        errors.push({text: 'Please write a name'});
    }
    if (!lastname) {
        errors.push({text: 'Please write a lastname'});
    }
    if (!phone) {
        errors.push({text: 'Please write a phone'});
    }
    if (!dni) {
        errors.push({text: 'Please write a DNI'});
    }
    if (!email) {
        errors.push({text: 'Please write an email'});
    }
    if (!date) {
        errors.push({text: 'Please write a date'});
    }

    if (errors.length > 0) {
        res.render('test-add', {
            errors, name, lastname, phone, dni, email, date
        });
    } else {
        const newUser = new User({name, lastname, phone, dni, email, date});
        await newUser.save();
        req.flash('success_msg', 'User added Successfully');
        res.redirect('/test/list');
    }
});

router.get('/test/list', async (req, res) => {
    const users = await User.find().lean();
    res.render('test-list', { users });
});

router.get('/test/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id).lean();
    res.render('test-edit', {user});
});

router.put('/test/edit-user/:id', async (req, res) => {
    const {name, lastname, phone, dni, email, date} = req.body;
    await User.findByIdAndUpdate(req.params.id, {name, lastname, phone, dni, email, date});
    res.redirect('/test/list');
});

router.delete('/test/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/test/list');
});

module.exports = router;