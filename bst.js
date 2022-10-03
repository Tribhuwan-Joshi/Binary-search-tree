const prettyPrint = (node = null, prefix = "", isLeft = true) => {
  if (!node) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
   
  }
}

class BST {
  constructor(arr = []) {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);
    this.arr = arr;
    this.root = this.#buildTree(this.arr, 0, this.arr.length - 1);
     this.inorderArr = [];
     this.preOrderArr = [];
     this.postOrderArr = [];
  }

  #buildTree(arr, low, end) {
    if (low > end) return null;
    let mid = Math.floor((low + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.#buildTree(arr, low, mid - 1);
    node.right = this.#buildTree(arr, mid + 1, end);
    return node;
  }
  insert(val, root = this.root) {
    if (this.arr.includes(val)) return;
    if (root == null) return new Node(val);
    if (val > root.value) root.right = this.insert(val, root.right);
    else root.left = this.insert(val, root.left);
    return root;
  }
  #findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root;
  }
  delete(val, root = this.root) {
    if (root == null) return;
    if (val > root.value) root.right = this.delete(val, root.right);
    else if (val < root.value) root.left = this.delete(val, root.left);
    else {
      if (root.left == null) {
        let temp = root.right;
        root = null;
        return temp;
      } else if (root.right == null) {
        let temp = root.left;
        root = null;
        return temp;
      }
      let temp = this.#findMin(root.right);
      root.value = temp.value;
      root.right = this.delete(temp.value, root.right);
    }
    return root;
  }
  find(val, root = this.root) {
    if (root == null || root.value == val) return root;
    if (root.value > val) return this.find(val, root.left);
    else return this.find(val, root.right);
  }
  levelOrder(root = this.root) {
    let res = [];
    if (root == null) return;
    let q = [];
    q.push(root);
    while (q.length) {
      let node = q[0];
      res.push(node.value);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
      q.shift();
    }
  }
  inorder(root = this.root) {
    if (root == null) return;
    this.inorder(root.left);
    this.inorderArr.push(root.value);
    this.inorder(root.right);
  }

  preOrder(root = this.root) {
    if (root == null) return;
    this.preOrderArr.push(root.value);
    this.preOrder(root.left);
    this.preOrder(root.right);
  }

  postOrder(root = this.root) {
    if (root == null) return;
    this.postOrder(root.left);
    this.postOrder(root.right);
    this.postOrderArr.push(root.value);
  }
  #height(node = this.root) {
    if (node == null) return -1;
    let leftHeight = this.#height(node.left);
    let righHeight = this.#height(node.right);
    return Math.max(leftHeight, righHeight) + 1;
  }
  depth(val = null, node = this.root) {
    if (val) node = this.find(val);
    if (node == null || node == this.root) return 0;
    let count = 0;
    let current = this.root;
    while (current != node) {
      count++;
      if (current.value > node.value) current = current.left;
      if (current.value < node.value) current = current.right;
    }
    return count;
  }
  getheight(val = null, root = this.root) {
    // you can pass the value of find it's height else it will find the height of whole tree
    if (!val) return this.#height(root);
    let node = this.find(val);
    return this.#height(node);
  }
  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }
    return (
      this.isBalanced(root.left) &&
      this.isBalanced(root.right) &&
      Math.abs(this.#height(root.left) - this.#height(root.right)) < 2
    );
  }
  rebalance(root = this.root) {
    if (this.isBalanced()) return;
    this.inorderArr = [];
    this.inorder();
    this.root = this.#buildTree(this.inorderArr, 0, this.inorderArr.length - 1);
  }
}

function randomArr() {
  let arr = [];
  let n = 7;
  while (n) {
    let x = Math.floor(Math.random() * 19) + 1;
    if (!arr.includes(x)) {
      arr.push(x);
      n--;
    }
  }
  return arr;
}

function driver() {
  let bst = new BST(randomArr());
 
  console.log(bst.isBalanced());
  bst.inorder();
  bst.preOrder();
  bst.postOrder();
  console.log("PreOrder ", bst.preOrderArr);
  console.log("Inorder ", bst.inorderArr);
  console.log("PostOrder ", bst.postOrderArr);
  bst.insert(1000);
  bst.insert(12345);
  bst.insert(200);
  console.log(bst.isBalanced());
  bst.rebalance();
  console.log(bst.isBalanced());
  bst.inorder();
  bst.preOrder();
  bst.postOrder();
  console.log("PreOrder ", bst.preOrderArr);
  console.log("Inorder ", bst.inorderArr);
  console.log("PostOrder ", bst.postOrderArr);
}

driver();
