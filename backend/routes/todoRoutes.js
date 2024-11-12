const express = require('express');
const { body } = require('express-validator');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getTodos);
router.post(
  '/',
  [body('title').notEmpty().withMessage('Title is required')],
  validate,
  createTodo
);
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'), // Optional title validation
  ],
  validate,
  updateTodo
);
router.delete('/:id', deleteTodo);

module.exports = router;
