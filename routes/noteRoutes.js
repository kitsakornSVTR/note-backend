// routes/noteRoutes.js
const express = require('express');
const router = express.Router();

const { getAllNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');


// ทุก route ต้องผ่านการ login ก่อน (มี JWT)
router.get('/', authMiddleware, getAllNotes);
router.post('/', authMiddleware, createNote);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;
