import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useCookieState from "../utilities/useCookie";
import ConfirmationModal from "../utilities/confirmationModal";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const CheckListGrid = () => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({ text: '', id: null });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cookieQueryParam = queryParams.get('cookieId');
    
    const [cookieValue, setCookieValue] = useCookieState('checklistItems' + cookieQueryParam);
    const inputFieldRef = useRef(null);
    useEffect(() => {
        setLoading(true); 
        try {
            const savedItems = cookieValue;
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
    }, [cookieQueryParam]);

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
        setCookieValue(newItems, 'checklistItems' + cookieQueryParam, 8)
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
  
    const editItem = (id) => {
      const edItem = items.filter((item) => item.id === id)[0];
      setCurrentItem(edItem);
      setIsEditing(true);
      if (inputFieldRef.current) {
        inputFieldRef.current.focus();
      }      
    };
  
    const cancelChange = () => {
      setCurrentItem({ text: '', id: null });
      setIsEditing(false);
    }

  
    const columnDefs = [
        { headerName: 'ID', field: 'id', cellStyle: { textAlign: 'left' } },
        { headerName: 'Name', field: 'text' , width: 700, cellStyle: { textAlign: 'left' }},
        {
          headerName: 'Actions',
          field:'actions',
          cellRenderer: (params) => (
            <div  style={{ display: 'flex', gap: '10px' }}>
              <IconButton aria-label="edit" onClick={() => editItem(params.data.id)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => openConfirm(params.data.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ),
          width: 200,
          suppressSizeToFit: true,
        },
      ];
 
  return (
    <div className="form">
      <h1 className="form-title">Check List for ID : {cookieQueryParam}</h1>
      <div className="form-content">
            <form onSubmit={ addItem }>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField id="outlined-basic" label="Enter a check list" variant="outlined" size="small" fullWidth
                  value={currentItem.text}  maxLength={50} onChange={ handleChange } autoFocus inputRef={inputFieldRef} />
                <Button variant="outlined" type="submit" endIcon={<SendIcon />}>{isEditing ? 'Update' : 'Add'}</Button>
                { isEditing && <Button variant="outlined" color="error" startIcon={<CancelIcon />}  onClick={ () => cancelChange() } height={100}>{'Cancel'}</Button>}  
              </Box>        
            </form>
            <br/>

            <div className="ag-theme-quartz" style={{ height: 500 }} >
                { loading ? ( <div className="loading-spinner">Loading...</div>) 
                : (<AgGridReact rowData={items} columnDefs={columnDefs} rowSelection="single" />)
                }
            </div>
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
};

export default CheckListGrid;