var express = require('express');
var body = require('express-validator').body;
var validationResult = require('express-validator').validationResult;

var router = express.Router();

router.get('/', function (req, res) {
    res.render('form', {
        title: 'Registration Form',
        data: {}
    });
});

router.post(
    '/',
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').trim().isEmail().withMessage('A valid email is required.'),
    function (req, res) {
        var errors = validationResult(req);

        if (errors.isEmpty()) {
            res.render('success', {
                title: 'Registration Complete',
                name: req.body.name
            });
            return;
        }

        res.status(422).render('form', {
            title: 'Registration Form',
            errors: errors.array(),
            data: req.body
        });
    }
);

module.exports = router;
