const prettyPrint = (node, prefix = "", isLeft = true) => {
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
    if (root == null) return ;
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
}

let bst = new BST([1, 2, 45, 2, 12, 3]);
prettyPrint(bst.root);
bst.insert(10);
prettyPrint(bst.root);
bst.delete(3);
prettyPrint(bst.root);
