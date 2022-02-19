import React from 'react';

// Frame Component for rendering list
class Frame extends React.Component {
    render() { 
        return (
            <div className="frame"  >
                <div className="array" style={{height:"500px"}}>
                   
                    {this.props.list.map((element, index) => (
                        <div
                            className = {this.getClass(element.classType)}
                            key = {index}
                            style = {{height : `${4.5*element.key}px`}}
                            value = {element.key}>
                            {element.key}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // using css classes to change color of elements
    getClass = (value) => {
        if(value === 0) return 'cell';
        else if(value === 1) return 'cell current';
        return 'cell done';
    };
}
 
export default Frame;