import React, { useState } from 'react'
import Home from './Home';

function ElementTransfer() {

    // State variables for Bucket 1, Bucket 2, and selected items
    const [bucket1, setBucket1] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    const [bucket2, setBucket2] = useState(['Item 5', 'Item 6']);
    const [selectedItems, setSelectedItems] = useState([]);

    // Function to add selected items from Bucket 1 to Bucket 2
    const addSelectedToBucket2 = () => {
        if (bucket1.length === 0) {
            alert("Bucket 1 is empty!");
            return;
        }
        if (selectedItems.length === 0) {
            alert("No item selected!");
            return;
        }
        // Check if any selected item belongs to Bucket 2
        const selectedItemsInBucket2 = selectedItems.some(item => bucket2.includes(item));
        if (selectedItemsInBucket2) {
            alert("Select items from Bucket 1 only to Add!");
            return;
        }
        setBucket2([...bucket2, ...selectedItems]); // Add selected items to Bucket 2
        setBucket1(bucket1.filter(item => !selectedItems.includes(item))); // Remove selected items from Bucket 1
        setSelectedItems([]); // Clear selected items
    };

    // Function to add all items from Bucket 1 to Bucket 2
    const addAllItemsToBucket2 = () => {
        if (bucket1.length === 0) {
            alert("Bucket 1 is empty!");
            return;
        }
        setBucket2([...bucket2, ...bucket1]); // Add all items from Bucket 1 to Bucket 2
        setBucket1([]); // Empty Bucket 1
    };

    // Function to remove selected items from Bucket 2 and return them to Bucket 1
    const removeSelectedFromBucket2 = () => {
        if (bucket2.length === 0) {
            alert("Bucket 2 is empty!");
            return;
        }
        if (selectedItems.length === 0) {
            alert("No item selected!");
            return;
        }
        setBucket1([...bucket1, ...selectedItems]); // Add selected items back to Bucket 1
        setBucket2(bucket2.filter(item => !selectedItems.includes(item))); // Remove selected items from Bucket 2
        setSelectedItems([]); // Clear selected items
    };

    // Function to remove all items from Bucket 2 and return them to Bucket 1
    const removeAllItemsFromBucket2 = () => {
        if (bucket2.length === 0) {
            alert("Bucket 2 is empty!");
            return;
        }
        setBucket1([...bucket1, ...bucket2]); // Add all items from Bucket 2 back to Bucket 1
        setBucket2([]); // Empty Bucket 2
    };

    // Function to handle item click (select/deselect item)
    const handleItemClick = (item) => {

        if (selectedItems.includes(item)) {
            // If item is already selected, deselect it
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            // If item is not selected, select it
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <div>
            <Home />
            <h3>Element Transfer Problem</h3>
            <div className='container'>
                <div className='bucket'>
                    <h3>Bucket 1</h3>
                    <div className='bucket-container'>
                        {bucket1.map((element, index) => (
                            <div className='button' key={index} onClick={() => handleItemClick(element)}>{element}
                                {selectedItems.includes(element) && <span> (selected)</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='button-container'>
                    <div className='button' onClick={addSelectedToBucket2}>Add</div>
                    <div className='button' onClick={removeSelectedFromBucket2}>Remove</div>
                    <div className='button' onClick={addAllItemsToBucket2}>Add All</div>
                    <div className='button' onClick={removeAllItemsFromBucket2}>Remove All</div>
                </div>
                <div className='bucket'>
                    <h3>Bucket 2</h3>
                    <div className='bucket-container'>
                        {bucket2.map((element, index) => (
                            <div className='button' key={index} onClick={() => handleItemClick(element)}>{element}
                                {selectedItems.includes(element) && <span> (selected)</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElementTransfer