import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/SampleCode.css'

class SampleCode extends Component {
  arr = null;

  generateArray = () => {
    var arr = [];
    while(arr.length < 5){
        var r = Math.floor(Math.random() * 100) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  settreedata = `{
  keys:[`+this.generateArray()+`]
}`
  settreecode = `let tree = new std.SetTree();
data.keys.map(n => tree.insert(n));
`
  
  maptreedata = `{
    keys:[`+this.generateArray()+`]
  }`
  maptreecode = `let tree = new std.MapTree();
data.keys.map(
  n=>tree.insert(n, 'number' + n.toString())
);
`

  listdata = `{
    push:[`+this.generateArray()+`]
}`
  listcode = `let li = new std.List();
data.push.map(d => li.pushBack(d));
[1,1,1].map(x => li.popFront());
data.push.map(n => li.pushFront(n));
[1,1,1].map(x => li.popBack());
`
  
  queuedata = `{
  base:[`+this.generateArray()+`]
  push:[`+this.generateArray()+`]
}`
  queuecode = `let qu = new std.Queue(data.base);
[1,1,1].map(n=>qu.pop());
data.push.map(d => qu.push(d));
`
  
  pqdata = `{
    push:[`+this.generateArray()+`]
}`
  pqcode = `let pq = new std.PriorityQueue();
data.push.map(d => pq.push(d));
[1,1,1,1,1].map(k => pq.pop());
`

  closeButton = () => {
    this.setState({open: !this.state.open})
  }
  clickButton = (code, data) => {
    this.props.changeSample(code, data);
    this.closeButton();
  }

  render() {
    return (
      <div className='samplecode'>
        <button className='samplecodebutton' onClick={this.closeButton}>Select Data Structure</button>
        {(this.state.open)?
          <div className='coverDom2'>
            <div className='changecodecontent'>
              <button className='gosample' onClick={() => this.clickButton(this.settreecode, this.settreedata)}>SetTree</button>
              <button className='gosample' onClick={() => this.clickButton(this.maptreecode, this.maptreedata)}>MapTree</button>
              <button className='gosample' onClick={() => this.clickButton(this.listcode, this.listdata)}>List</button>
              <button className='gosample' onClick={() => this.clickButton(this.queuecode, this.queuedata)}>Queue</button>
              <button className='gosample' onClick={() => this.clickButton(this.pqcode, this.pqdata)}>Priority Queue</button>
              <button className='closeshowdata' onClick={this.closeButton}>CLOSE</button>
            </div>
          </div>
        : null}
      </div>
    )
  }
}

SampleCode.propTypes = {
  changeSample : PropTypes.func
}

SampleCode.defaultProps = {
  changeSample: f=>f
}

export default SampleCode;