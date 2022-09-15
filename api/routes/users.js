import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is Auth')
})
router.get('/register', (req, res) => {
    res.send('This is Auth register')
})

export default router