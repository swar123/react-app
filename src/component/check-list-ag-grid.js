import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CheckListGrid = ({cookieId}) => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({ text: '', id: null });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); 
        try {
            const savedItems = Cookies.get('checklistItems' + cookieId);
            if (savedItems) {
                setItems(JSON.parse(savedItems));
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error('Failed to parse cookies:', error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [cookieId]);

    const handleChange = (event) => {
      event.preventDefault();
      setCurrentItem({ ...currentItem, text: event.target.value });
    };
  
    const addItem = (event) => {
      event.preventDefault();
      if (currentItem.text.trim() !== '') {
        let newItems;
        if (isEditing) {
          newItems = items.map((item) =>
            item.id === currentItem.id ? { ...item, text: currentItem.text } : item
          );
          setIsEditing(false);
        } else {
          newItems = [...items, { text: currentItem.text, id: Date.now() }];
        }
        setItems(newItems);
        Cookies.set('checklistItems'+ cookieId, JSON.stringify(newItems), { expires: 7 });
        setCurrentItem({ text: '', id: null });
      }
    };
  
    const deleteItem = (id) => {
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      Cookies.set('checklistItems'+ cookieId, JSON.stringify(newItems), { expires: 7 });
    };
  
    const editItem = (id) => {
      const edItem = items.filter((item) => item.id === id)??[0];
      setCurrentItem(edItem);
      setIsEditing(true);
    };
  
    const cancelChange = () => {
      setCurrentItem({ text: '', id: null });
      setIsEditing(false);
    }

  
    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'text' },
        {
          headerName: 'Actions',
          field:'actions',
          cellRenderer: (params) => (
            <div  style={{ display: 'flex', gap: '10px' }}>
              <button id="app-button" onClick={() => editItem(params.data.id)}>Edit</button>
              <button id="app-delete" onClick={() => deleteItem(params.data.id)}>Delete</button>
            </div>
          ),
          width: 300,
          suppressSizeToFit: true,
        },
      ];
 
  return (
    <div className="form">
      <h1 className="form-title">Check List for ID : {cookieId}</h1>
      <div className="form-content">
            <form onSubmit={ addItem }>
                <input id="app-textbox"
                    type="text"
                    maxLength={50}
                    placeholder="Enter a check list"
                    value={currentItem.text}
                    onChange={ handleChange }
                /> &nbsp;
                <button id="app-submit" type="submit">{isEditing ? 'Update' : 'Add'}</button> &nbsp;
                { isEditing && <button id="app-button" type="button" onClick={ () => cancelChange() }>{'Cancel'}</button>}          
            </form>
            <br/>
            <div className="ag-theme-quartz" style={{ height: 500 }} >
                { loading ? ( <div className="loading-spinner">Loading...</div>) 
                : (<AgGridReact rowData={items} columnDefs={columnDefs} rowSelection="single" />)
                }
            </div>
        </div>
    </div>
   );
};

export default CheckListGrid;