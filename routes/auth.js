import express from 'express';

const router = express.Router();

router.get('/:message', (req, res) => {
    res.status(200).send(`Hello ${req.params.message}`);
     
})

module.exports = router;