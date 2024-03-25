import React, { useState } from 'react'
import Home from './Home'

function NestedList() {
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Application',
            children: [
                { id: 11, name: 'FrontEnd', children: [{ id: 111, name: 'React' }, { id: 121, name: 'Angular' }] },
                { id: 12, name: 'BackEnd', children: [{ id: 122, name: 'NodeJs' }, { id: 232, name: 'Spring Boot' }] },
                { id: 13, name: 'Database', children: [{ id: 133, name: 'MongoDb' }, { id: 333, name: 'MySQL' }] },
            ],
        },
        {
            id: 2,
            name: 'Library',
            children: [
                { id: 21, name: 'Plugin 1', children: [{ id: 211, name: 'Subchild 1.1' }, { id: 121, name: 'Subchild 2.1' }] },
                { id: 22, name: 'Plugin 2', children: [{ id: 222, name: 'Subchild 1.2' }, { id: 232, name: 'Subchild 2.2' }] },
                { id: 32, name: 'Plugin 3', children: [{ id: 322, name: 'Subchild 1.3' }, { id: 333, name: 'Subchild 2.3' }] },
            ],
        },
        {
            id: 3,
            name: 'System',
            children: [
                { id: 31, name: 'Windows', children: [{ id: 311, name: 'Version 11' }, { id: 121, name: 'Processor' }] },
                { id: 32, name: 'Device Manager', children: [{ id: 322, name: 'Printer' }, { id: 232, name: 'Scanner' }] },
                { id: 33, name: 'Setting', children: [{ id: 333, name: 'Display' }, { id: 333, name: 'Brightness' }] },
            ],
        },
        {
            id: 4,
            name: 'Users',
            children: [
                { id: 41, name: 'Admin', children: [{ id: 411, name: 'Desktop' },{ id: 421, name: 'Document' }] },
                { id: 42, name: 'Guest', children: [{ id: 422, name: 'Download' },{ id: 412, name: 'Screenshots' }] },
                { id: 43, name: 'Shared', children: [{ id: 433, name: 'Pictures' },{ id: 413, name: 'Music' }] },
            ],
        },
    ]);
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);
    const [clickedParent, setClickedParent] = useState(null);
    const [clickedChild, setClickedChild] = useState(null);

    const handleParentClick = (parentId) => {
        setSelectedParent(parentId);
        setSelectedChild(null); // Reset selected child when parent is clicked
        setClickedParent(parentId);
    };

    const handleChildClick = (childId) => {
        setSelectedChild(childId);
        setClickedChild(childId);
    };

    return (
        <div>
            <Home />
            <h3>Nested List component</h3>
            <div className='nested-container'>
                <div className='container-left'>
                    <div className="nested-list-container">
                        {data.map((parent, index) => (
                            <div className={`parent-container ${clickedParent === parent.id ? 'clicked' : ''}`} key={index} onClick={() => handleParentClick(parent.id)}>
                                <p>📁{parent.name}</p>
                                <p>➤</p>
                            </div>
                        ))}
                    </div>
                    {selectedParent !== null && (
                        <div className='nested-list-container'>
                            {data[selectedParent - 1].children.map((child, index) => (
                                <div className={`child-container ${clickedChild === child.id ? 'clicked' : ''}`} key={index} onClick={() => handleChildClick(child.id)}>
                                    <p>📁{child.name}</p>
                                    <p>➤</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedChild !== null && (
                        <div className='nested-list-container'>
                            {data[selectedParent - 1].children.find(child => child.id === selectedChild).children.map((subchild, index) => (
                                <div className='subchild-container' key={index}>
                                    <p>📁{subchild.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default NestedList