const express = require('express');
let error5xx = (err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something wrong!');
};

module.exports = { error5xx };

