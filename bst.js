class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(arr) {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);

    this.arr = arr;

    this.root = this.#buildTree(arr, 0, this.arr.length - 1);
  }
  #buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let rootNode = new Node(arr[mid]);
    rootNode.left = this.#buildTree(arr, start, mid - 1);
    rootNode.right = this.#buildTree(arr, mid + 1, end);
    return rootNode;
  }

  insert(val, root = this.root) {
    if (this.arr.includes(val)) return;
    if (root == null) {
      let node = new Node(val);
      return node;
    }
    if (root.value > val) root.left = this.insert(val, root.left);
    else root.right = this.insert(val, root.right);
    return root;
  }

  delete(val) {
    // delete node
  }
  find(val) {
    // return the node with given value
  }
  levelOrder(fun) {
    // return value if no fun is given
  }
  inOrder(fun) {
    // yeild each node to provided function
    // else return an array of values
  }
  preorder(fun) {
    // yeild each node to provided function
    // else return an array of values
  }
  height(node) {
    // return the height of the node - node to leaf node
  }
  depth(node) {
    // return depth of the node - from root to node
  }
  isBalanced() {
    // check if the tree is balanced
  }
  rebalance() {
    // rebalance a unbalance tree
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomArray(n, min = 1, max = 20) {
  let arr = [];

  while (n) {
    let x = Math.floor(Math.random() * (max - min)) + min;

    if (!arr.includes(x)) {
      arr.push(x);
      n--;
    }
  }
  return arr;
}

let rArr = [11,23,45,67,43];
let bst = new BST(rArr);

prettyPrint(bst.root);
bst.insert(11);
prettyPrint(bst.root);
