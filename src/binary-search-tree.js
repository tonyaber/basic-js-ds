const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions


*/

module.exports = class BinarySearchTree {
  constructor() {
    this.node = null;
  } 

  root() {
    return this.node;
  }

  add( data, node = this.node) {
    if (node == null) {
      this.node = new Node(data);
      return;
    }
    
    if (data < node.data) {
      if (node.left == null) {
        node.left = new Node(data);
      } else {
        this.add(data, node.left);
      }
    }
    if (data > node.data) {
      if (node.right == null) {
        node.right = new Node(data);
      } else {
        this.add(data, node.right);
      }
    }
    
  }

  has(data) {
    if (this.find(data, this.node)) {
      return true;
    }
    return false;
  }

  find(data, node = this.node) {
    if (node.data == data) {
      return node;
    }
    if (data < node.data) {
      if (node.left == null) {
        return null;
      } else {
        return this.find(data, node.left);
      }
    } else if (data > node.data) {
      if (node.right == null) {
        return null;
      } else {
        return this.find(data, node.right);
      }
    }
  }
  //поиск минимального узла для удаления
  minNode(node) {
    if (node.left == null)
      return node;
    else
      return this.minNode(node.left);
  }

  remove(data, node=this.node) {
    if (node == null) {
      return null;
    }
    if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else if (data > node.data) {
      node.right = this.remove(data, node.right);
      return node;
    } else {
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      else if (node.left == null) {
        node = node.right;
        return node;
      }
      else if (node.right == null) {
        node = node.left;
        return node;
      }

      const newRoot = this.minNode(node.right);
      node.data = newRoot.data;
      node.right = this.remove(newRoot.data, node.right);
      return node;
    }
  }

  min(node=this.node) {
    if (node.left == null) {
      return node.data;
    }
    return this.min(node.left)
  }

  max(node = this.node) {
    if (node.right == null) {
      return node.data;
    }
    return this.max(node.right)
  }
}