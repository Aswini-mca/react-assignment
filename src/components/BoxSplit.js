import React, { useState } from 'react'
import Home from './Home';

function BoxSplit() {

    const [boxes, setBoxes] = useState([{ id: 1, size: 400}]); // Initial square box

    const handleClick = (boxId, size) => {
       
        // If the size of the box is less than or equal to 1, stop splitting
        if (size <= 1) return;

         // Remove the clicked box
         const updatedBoxes = boxes.filter(box => box.id !== boxId);

        // Calculate size for the smaller squares
        const newSize = size / 2;

        // Add four smaller squares to the updated boxes array
        const children = [
            { id: boxId * 10 + 1, size: newSize },
            { id: boxId * 10 + 2, size: newSize },
            { id: boxId * 10 + 3, size: newSize },
            { id: boxId * 10 + 4, size: newSize }
        ];

        updatedBoxes.push(...children);

        // Set the state with updated boxes
        setBoxes(updatedBoxes);
    };

    const renderSquares = (boxes) => {
       
        return boxes.map(box => (
            <div
                key={box.id}
                style={{
                    width: box.size + 'px',
                    height: box.size + 'px',
                    border: '1px solid black',
                    position: 'absolute',
                    cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr', // Split into two columns
                    gridTemplateRows: '1fr 1fr', // Split into two rows
                }}
                onClick={() => {handleClick(box.id, box.size)}}
            >
           
                {/* Nested divs for each quarter */}
                <div style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}></div>
                <div style={{ borderLeft: '1px solid black', borderBottom: '1px solid black' }}></div>
                <div style={{ borderRight: '1px solid black', borderTop: '1px solid black' }}></div>
                <div style={{ borderLeft: '1px solid black', borderTop: '1px solid black' }}></div>
            </div>
        ));
            
    };

    return (
        <div>
            <Home />
            <h3>Click within the square box, upon clicking, it will split the square into four
                smaller squares of equal size,</h3>
            <div className='container'>
                <div style={{ width: '400px', height: '400px', border: '1px solid black', position: 'relative' }}>
                    {renderSquares(boxes)}
                </div>
            </div>
        </div>
    );
}

export default BoxSplit