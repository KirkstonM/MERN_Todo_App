import todoItemModal from "../models/item.js";


//SAVE ITEM
export const registerItem = async(req, res) => {
    try {
        const todo = await new todoItemModal({
            item: req.body.item
        });

        todo.save()

        res.json(todo);
    } catch (error) {
        res.json({message : error});
    }
};

//GET ITEMS

export const getTodoList = async (req, res) => {
    try {
        const todoList = await todoItemModal.find();
    res.json(todoList);
    } catch (error) {
        res.send({ message : error});
    }
};

//DELETE ITEM 

export const deleteItem = async(req, res) => {
    try {
        const deleteTodoItem = await todoItemModal.findByIdAndDelete(req.params.id);
        res.json('item deleted');
        
    } catch (error) {
        res.send({ message : error});
    }
};

//UPDATE ITEM
export const updateItem = async(req, res) => {

    try {
        const { id } = req.params;
        const todoItem = await todoItemModal.findById(id);

        const updateItem = await todoItemModal.findByIdAndUpdate(
            id,
            {$set: req.body}
        );

        res.json("item updated");
    } catch (error) {
        res.send({ message : error}); 
    }
    
};
