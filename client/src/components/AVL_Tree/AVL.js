import React, { Component } from "react";
import "./AVL.css";
import BinarySearchTree from "./classes/BinarySearchTree.js";
import BinarySearchTreeNode from "./components/BinarySearchTreeNode.js";

class AVL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insertValue: "",
      deleteValue: "",
      searchValue: "",
      previewContent: "",
      instruction:"",
      tree: new BinarySearchTree()
    };
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
    this.resetActiveStatusOfNodes = this.resetActiveStatusOfNodes.bind(this);
    this.resetPreviewContent = this.resetPreviewContent.bind(this);
    this.resetInstruction=this.resetInstruction.bind(this);

    this.traversePreOrder = this.traversePreOrder.bind(this);
    this.traverseInOrder = this.traverseInOrder.bind(this);
    this.traversePostOrder = this.traversePostOrder.bind(this);
    this.breadthFirstSearch = this.breadthFirstSearch.bind(this);
    this.search = this.search.bind(this);
    this.pause = this.pause.bind(this);

    this.onChangeInsertValue = this.onChangeInsertValue.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.onChangeDeleteValue = this.onChangeDeleteValue.bind(this);
  }

  pause(milliseconds) {
    var date = new Date();
    while (new Date() - date <= milliseconds) {
      /* Do nothing */
    }
  }

  resetPreviewContent(){
    this.setState({
        previewContent: ""
    })
  }
  resetInstruction(){
    this.setState({
      instruction:""
    })
  }

  resetActiveStatusOfNodes(){
    this.state.tree.traverseInOrder(this.state.tree.root, function(node) {
      node.active = false;
    });
  }

  onChangeInsertValue(event) {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.resetInstruction();
    this.setState({
      insertValue: parseInt(event.target.value)
    });
  }

  onChangeDeleteValue(event) {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.resetInstruction();
    this.setState({
      deleteValue: parseInt(event.target.value)
    });
  }

  onChangeSearchValue(event) {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.resetInstruction();
    this.setState({
      searchValue: parseInt(event.target.value)
    });
  }

  insert() {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.resetInstruction();
    this.state.tree.insertNewNode(this.state.insertValue);
    this.setState({
      instruction:"Inserted node "+this.state.insertValue
    })
    this.setState({
      insertValue: ""
    });
  }

  delete() {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.resetInstruction();
    this.state.tree.delete(this.state.deleteValue);
    this.setState({
      instruction:"Deleted node "+this.state.deleteValue
    })
    this.setState({
      deleteValue: ""
    });
  }

  search() {
    this.resetActiveStatusOfNodes();
    this.resetPreviewContent();
    this.resetInstruction();
    let searchResult = this.state.tree.find(
      this.state.tree.root,
      this.state.searchValue
    );

    if (searchResult) {
      searchResult.active = true;
    } else {
      this.setState({
        previewContent: "Not Found!"
      });
    }

    this.setState({
      searchValue: ""
    });
  }

  traversePreOrder() {
    this.resetActiveStatusOfNodes();
    let values = [];
    this.state.tree.traversePreOrder(this.state.tree.root, function(node) {
      values.push(node.value);
    });
    this.setState({
      previewContent: values.join(" --> ")
    });
    
  }

  traversePostOrder() {
    this.resetActiveStatusOfNodes();
    let values = [];
    this.state.tree.traversePostOrder(this.state.tree.root, function(node) {
      values.push(node.value);
    });
    this.setState({
      previewContent: values.join(" --> ")
    });
  }

  traverseInOrder() {
    this.resetActiveStatusOfNodes();
    let values = [];
    this.state.tree.traverseInOrder(this.state.tree.root, function(node) {
      values.push(node.value);
    });
    this.setState({
      previewContent: values.join(" --> ")
    });
  }

  breadthFirstSearch() {
    this.resetActiveStatusOfNodes();
    let values = [];
    this.state.tree.breadthFirstSearch(this.state.tree.root, function(node) {
      values.push(node.value);
    });
    this.setState({
      previewContent: values.join(" --> ")
    });
  }

  render() {
    const hasRootNode = this.state.tree.root;
    return (
      <div className="AVLdiv">
        <div id="AVL">
          <div id="treeAVL" className="treeAVL">
            {hasRootNode ? (
              <ul>
                <BinarySearchTreeNode
                  node={this.state.tree.root}
                  nodeType="root"
                />
              </ul>
            ) : (
              <h5> Tree is currently empty. Try adding new nodes. </h5>
            )}
          </div>
          <div id='description'>
            {this.state.instruction}
          </div>
          <div id="basic-actions">
            <div className="action">
              <input className='inputTxt'
                value={this.state.insertValue}
                onChange={this.onChangeInsertValue}
                type="number"
              />
              <button
                onClick={this.insert}
                className="btn btn-secondary btn-sm"
              >
                ADD
              </button>
            </div>

            <div className="action">
              <input className='inputTxt'
                value={this.state.deleteValue}
                onChange={this.onChangeDeleteValue}
                type="number"
              />
              <button
                onClick={this.delete}
                className="btn btn-secondary btn-sm"
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>
        <div id="traversal-preview">
          { this.state.previewContent }
        </div>

        <div id="traversal-actions">
          <div className="action">
            <input className='inputTxt'
              value={this.state.searchValue}
              onChange={this.onChangeSearchValue}
              type="number"
            />
            <button
              onClick={this.search}
              className="btn btn-secondary btn-sm"
            >
              FIND
            </button>
          </div>
      </div>
    </div>
    );
  }
}

export default AVL;
