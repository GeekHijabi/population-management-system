import express from 'express';

const apiUrl = 'api/v1'

const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('Hello from PMS API');
})


export default router;
