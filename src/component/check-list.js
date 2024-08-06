import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import useCookieState from "../utilities/useCookie";
import ConfirmationModal from "../utilities/confirmationModal";

function CheckList() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ text: '', id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cookieQueryParam = queryParams.get('cookieId');
  
  const [cookieValue, setCookieValue] = useCookieState('checklistItems' + cookieQueryParam);

  useEffect(() => {
    const savedItems = cookieValue;
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems([]);
    }
  }, [cookieQueryParam]);

  const handleChange = (event) => {
    setCurrentItem({ ...currentItem, text: event.target.value });
  };

  const addItem = (event) => {
    event.preventDefault();
    if (currentItem.text.trim() !== '') {
      let newItems;
      if (isEditing) {
        newItems = items.map((item) =>
          item.id === currentItem.id
            ? { ...item, text: currentItem.text }
            : item
        );
        setIsEditing(false);
      } else {
        newItems = [...items, { text: currentItem.text, id: Date.now() }];
      }
      setItems(newItems);
      setCookieValue(newItems, 'checklistItems' + cookieQueryParam, 8);
      setCurrentItem({ text: '', id: null });
    }
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    setCookieValue(newItems, 'checklistItems' + cookieQueryParam, 8);
    setOpenModal(false);
  };

  const openConfirm = (id) => {
      setDeleteId(id);
      setOpenModal(true);
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  const editItem = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const cancelChange = () => {
    setCurrentItem({ text: '', id: null });
    setIsEditing(false);
  };

  return (
    <div class="form">
      <h1 class="form-title">Check List for ID : {cookieQueryParam}</h1>
      <div class="form-content">
        <form onSubmit={addItem}>
          <input
            id="app-textbox"
            type="text"
            maxLength={50}
            placeholder="Enter a check list"
            value={currentItem.text}
            onChange={handleChange}
          />{" "}
          &nbsp;
          <button id="app-submit" type="submit">
            {isEditing ? "Update" : "Add"}
          </button>{" "}
          &nbsp;
          {isEditing && (
            <button id="app-button" type="button" onClick={cancelChange}>
              {"Cancel"}
            </button>
          )}
        </form>
        <br />
        <table id="app-table">
          <thead>
            <td>{"ITEM DESCRIPTION"}</td>
            <td>{"EDIT ACTION"}</td>
            <td>{"DELETE ACTION"}</td>
          </thead>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.text} </td>
              <td>
                <button id="app-button" onClick={() => editItem(item)}>
                  Edit
                </button>
              </td>
              <td>
                <button id="app-delete" onClick={() => openConfirm(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <ConfirmationModal
            open={openModal}
            handleClose={modalClose}
            handleConfirm={() => deleteItem(deleteId)}
            title="Confirm Deletion"
            description="Are you sure you want to delete this item?"
        />
      </div>
    </div>
  );
}

export default CheckList;
