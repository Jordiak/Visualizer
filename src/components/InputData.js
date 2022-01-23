import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../stylesheet/InputData.css'

class InputData extends Component {
  constructor() {
    super()
    var tree = [];
    var ctr = 0;
    for(let i=0; i<5; i+=1) {
      const n = Math.floor(Math.random()*1000);
      tree[ctr] = n;
      ctr+=1;
    }
    this.inputData = `{
  keys:[`+tree+`]
}`
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.submit) {
      this.props.getData(this.txtarea.value)
    }
    if (nextProps.sampleData !== ``) {
      this.txtarea.value = nextProps.sampleData;
    }
  }
  render() {
    return (
      <textarea ref={input=>this.txtarea=input} className='input-data' wrap='off' spellCheck='false' defaultValue={this.inputData}>
      </textarea>
    )
  }
}

InputData.propTypes = {
  getData: PropTypes.func
}

InputData.defaultProps ={
  getData: f=>f
}

export default InputData