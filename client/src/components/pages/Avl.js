import React,{useState} from 'react';
import Collapsible from '../functions/Collapsible.js';
import AVL from '../AVL_Tree/AVL.js';
import SideCollapsible from '../functions/SideCollapsible.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "../functions/modal.css";

export default function Avl(){
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
      }
      else {
        document.body.classList.remove('active-modal')
      };
    
    
    return(
        <div className='AVL-page'>
            <button onClick={toggleModal} className="btn-modal">ⓘ
            INSTRUCIONS
            </button>
            <AVL/>
            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Path Finding Instructions</h2><br/>
           
            
            <p>Drag the starting point (blue) and the ending point (red) to change their positions.</p><br/>

            
            <p>
              Click an empty cell to create a wall.
            </p><br/>

            
            <p>The clear grid button will remove the previous path<br/>
                Clear wall button will remove walls.
            </p><br/>

            
            <p>
              Choose from the available algorithm to start the path finding process.
            </p><br/>

            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}
        </div>
    )
}