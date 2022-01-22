import React from 'react';


import Size from './sorting-navbar/size';
import Speed from './sorting-navbar/speed';

// Navbar Component
class Navbar extends React.Component {
    state = {
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
                <table className="navbar-table">
                    <tr>
                        <td>Items to Sort</td>
                        <td><Size 
                        onChange = {this.props.onChange}
                        lengths = {this.state.lengths}
                        />
                       </td>
                    </tr>
                    <tr>
                        <td>
                        Speed of Sort</td>
                        <td>
                        <Speed 
                        onChange = {this.props.onChange}
                        speeds = {this.state.speeds}
                        />
                        </td>
                    </tr>
                </table>
                <button id="random" onClick = {() => this.props.newList(1)}>Generate Items</button>
                <br/>
                <button id="start" onClick = {() => this.props.start()}>Start Sort</button>
                <a 
                    className="icon" q
                    onClick = {(e) => this.handleClick(e)}
                    href = "/">
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        );
    }
}
export default Navbar;