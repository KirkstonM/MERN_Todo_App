import express from 'express';
import { getTodoList, registerItem, deleteItem, updateItem } from "../controls/todoItem.js";


const router = express.Router();

// GET : http://localhost:3001/todos
router.get('/todos', getTodoList);

//POST : http://localhost:3001/new
router.post('/todos/new', registerItem);

//DELETE : http://localhost:3001/todos/:id
router.delete('/todos/delete/:id', deleteItem)

//UPDATE : http://localhost:3001/todos/:id
router.put('/todos/update/:id', updateItem);


export default router;