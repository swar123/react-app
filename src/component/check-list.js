import React, { useState } from 'react';

function CheckList() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ text: '', id: null });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    setCurrentItem({ ...currentItem, text: event.target.value });
  };

  const addItem = (event) => {
    event.preventDefault();
    if (currentItem.text.trim() !== '') {
      if (isEditing) {
        setItems(
          items.map((item) =>
            item.id === currentItem.id ? { ...item, text: currentItem.text } : item
          )
        );
        setIsEditing(false);
      } else {
        setItems([...items, { text: currentItem.text, id: Date.now() }]);
      }
      setCurrentItem({ text: '', id: null });
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const cancelChange = () => {
    setCurrentItem({ text: '', id: null });
    setIsEditing(false);
  }

  return (
    <div class="form">
      <h1 class="form-title">Check List</h1>
      <div class="form-content">
      <form onSubmit={addItem}>
        <input id="app-textbox"
          type="text"
          placeholder="Enter a check list"
          value={currentItem.text}
          onChange={handleChange}
        /> &nbsp;
        <button id="app-submit" type="submit">{isEditing ? 'Update' : 'Add'}</button> &nbsp;
        { isEditing && <button id="app-button" type="button" onClick={ () => cancelChange() }>{'Cancel'}</button>}          
      </form>
      <br/>
      <table id="app-table">
        <thead>
          <td>{'ITEM DESCRIPTION'}</td>
          <td>{'EDIT ACTION'}</td>
          <td>{'DELETE ACTION'}</td>
        </thead>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.text} </td>
            <td><button id="app-button" onClick={() => editItem(item)}>Edit</button></td>
            <td><button id="app-delete" onClick={() => deleteItem(item.id)}>Delete</button></td>
          </tr>
        ))}
      </table>
      </div>
    </div>
  );
}

export default CheckList;