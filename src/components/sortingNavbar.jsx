import React from 'react';

import Algorithms from './sorting-navbar/algorithms';
import Size from './sorting-navbar/size';
import Speed from './sorting-navbar/speed';

// Navbar Component
class Navbar extends React.Component {
    state = {
        Algorithms: [
			{ value: 1, type: 'Bubble Sort' },
			{ value: 2, type: 'Insertion Sort' },
			{ value: 3, type: 'Merge Sort' },
			{ value: 4, type: 'Quick Sort' },
            { value: 5, type: 'Heap Sort' },
		],
		lengths: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
		speeds: [0.50, 0.75, 1.00, 2.00, 4.00,8.00,16.00,32.00,64.00,128.00]
    };

    // prevent the default link behaviour for navbar
    // hide/display button
    handleClick = (e) => {
        e.preventDefault();
        this.props.response();
    }

    render() {
        return (
            <div className="navbar-sorting" id="navbar">
                <Algorithms 
                    onChange = {this.props.onChange}
                    algorithms = {this.state.Algorithms}
                />
                <Size 
                    onChange = {this.props.onChange}
                    lengths = {this.state.lengths}
                />
                <Speed 
                    onChange = {this.props.onChange}
                    speeds = {this.state.speeds}
                />
                <button id="random" onClick = {() => this.props.newList(1)}>Generate</button>
                <button id="start" onClick = {() => this.props.start()}>Start</button>
                <a 
                    className="icon" 
                    onClick = {(e) => this.handleClick(e)}
                    href = "/">
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        );
    }
}
 
export default Navbar;