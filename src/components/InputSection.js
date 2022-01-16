import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputCode from './InputCode'
import InputData from './InputData'
import SampleCode from './SampleCode'
import '../stylesheet/InputSection.css'

class InputSection extends Component {
  constructor() {
    super()
    this.state = {
      submit:false,
      showCaution: false,
      sampleCode: ``,
      sampleData: ``,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.sampleCode !== ``) {
      return true;
    }
    const {submit, showCaution} = this.state;
    return (!submit && nextState.submit) || (showCaution !== nextState.showCaution)
  }

  componentDidUpdate() {
    if (this.state.submit) {
      this.setState({
        submit: false,
        sampleCode: ``,
        sampleData: ``,})
    } else {
      this.setState({
        sampleCode: ``,
        sampleData: ``
      })
    }
  }

  changeShow = () => {
    console.log('click')
    this.setState({showCaution: !this.state.showCaution})
  }

  render() {
    return (
      <section className='input-section'>
        {/* <div className='text-input1'>Write Code</div> */}
        {/* <button className='precaution' onClick={this.changeShow}><img className='cautionImg' src={require('../public/caution.png')} alt='caution'/></button>     */}
        <button className='input-button' onClick={input => this.setState({submit: true})}>Initialize</button>
        <SampleCode changeSample = {(code, data) => this.setState({sampleCode: code, sampleData: data})}/>
        <InputCode submit={this.state.submit} getCode={this.props.getCode} sampleCode = {this.state.sampleCode}/>
        <div className='text-input2'>Input Data</div>
        <InputData submit={this.state.submit} getData={this.props.getData} sampleData = {this.state.sampleData}/>
        {(this.state.showCaution)?
        <div className='coverDom'>
        <div className='cautionContent'>
          <p className='linestyle'>1. Declare the variables at the top of the scope block.</p>
          <p className='linestyle'>2. Semicolon is needed at the end of each line</p>
          <p className='linestyle'>3. Method Chaining is not animated</p>
          <p className='linestyle'>4. The method in parameter is not animated</p>
          <button className='input-button-close' onClick={this.changeShow}>Close</button>
        </div> 
        </div>
        :null}
      </section>
    )
  }
}

InputSection.propTypes = {
  getCode: PropTypes.func,
  getData: PropTypes.func,
  inputdata: PropTypes.object
}

InputSection.defaultProps = {
  getCode: f=>f,
  getData: f=>f
}

export default InputSection