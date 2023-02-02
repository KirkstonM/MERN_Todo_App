import React, { useEffect, useState } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Container, Button } from 'react-bootstrap';


function App() {

  const [finalData, setFinalData] = useState([]);
  const [itemName, setItemName] = useState("");
  const [isUpdate, setIsUpdate] = useState("");
  const [updateItem, setUpdateItem] = useState("");

  console.log(isUpdate);

  useEffect(() => {
    fetchData();

  }, [])

  // FETCHING DATA

  async function fetchData() {
    try {
      await fetch('http://localhost:3001/todos')
        .then(res => res.json())
        .then(data => setFinalData(data))
    } catch (error) {
      console.log({ message: error });
    }
  };

  //POSTING DATA

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/todos/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: itemName
        })
      })
        .then(res => {
          if (res.status === 400) {
            console.log("error");
          }
          return res.json();
        })
        .then(data => {
          setFinalData(prev => [...prev, data])
          setItemName("")

        })
    } catch (error) {
      console.log({ message: error });
    }
  }

  // DELETING DATA

  async function deleteItem(id) {
    try {
      await fetch(`http://localhost:3001/todos/delete/${id}`, {
        method: 'DELETE'
      })
      const newArr = finalData.filter(item => item._id !== id);
      setFinalData(newArr);
    } catch (error) {
      console.log({ message: error })
    }
  }

  async function updatetodoItem(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/todos/update/${isUpdate}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          item: updateItem
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))

      const updateItemIndex = finalData.findIndex(item => item._id === isUpdate);
      const updateItems = finalData[updateItemIndex].index = updateItem;
      setIsUpdate('');
      setUpdateItem('');
      fetchData();


    } catch (error) {
      console.log({ message: error });
    }

  }

  // RENDERING THE UPDATE FORM
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => updatetodoItem(e)}>
      <input className="form-control w-50" type="text" placeholder="New Item" onChange={(e) => setUpdateItem(e.target.value)} value={updateItem} />
      <Button variant='warning' type="submit">Update</Button>
    </form>
  )

  function clearItem() {
    setItemName('');
  }

  return (
    <>
      <div className='App'>
        <Container className='todo--container'>
          <div className='header'>
            <h2> Your Tasks </h2>
          </div>

          <div className='form--container'>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="itemName"
                value={itemName}
                placeholder="Enter item"
                onChange={(e) => setItemName(e.target.value)}
                className="form-control"
                required
              />
              <div className='form--button_container'>
                <Button type='submit' variant='success'> Add Item </Button>
                <Button type='clear' variant='danger' onClick={clearItem}> Clear Item </Button>
              </div>
            </Form>
          </div>

          <div className='todo--list'>
            {
              finalData.map(obj => {
                return <div key={obj._id} className='todo-items'>
                  {isUpdate === obj._id ? renderUpdateForm() :

                    <>
                      <div className='todo--item--container'>
                        <div>
                          <h4>{obj.item}</h4>
                        </div>
                        <div className='todolist--controls'>
                          <Button onClick={() => setIsUpdate(obj._id)} variant="outline-warning" className='me-5'> Update </Button>
                          <Button onClick={() => deleteItem(obj._id)} variant="outline-danger" className='me-5'> delete </Button>
                        </div>
                      </div>

                    </>
                  }

                </div>

              })
            }
          </div>
        </Container>
      </div>

    </>

  );
}

export default App;
