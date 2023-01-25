const Node = (data) => {
  left = null;
  right = null;
  return { data, left, right };
};

const Tree = (array) => {
  root = buildTree(array, 0, array.length - 1);

  const insertNode = (node, value) => {
    // If tree is empty, return a new node
    if (!node) node = Node(value);

    // Otherwise, recur down the tree
    if (value < node.data) {
      node.left = insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = insertNode(node.right, value);
    }

    return node;
  };

  const deleteNode = (node, value) => {
    // If tree is empty, return a new node
    if (!node) return root;

    // Otherwise, recur down the tree
    if (value < node.data) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = deleteNode(node.right, value);
    } else {
      // If node has no child (i.e. is a leaf) or only one child
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      // If node has 2 children
      if (node.left && node.right) {
        node.data = minValue(node.right);
        node.right = deleteNode(node.right, node.data);
      }
    }

    return node;
  };

  const minValue = (node = root) => {
    let minValue = node.data;
    while (node.left) {
      minValue = node.left.data;
      node = node.left;
    }
    return minValue;
  };

  const find = (root, value) => {
    if (root === null) return false;

    if (value < root.data) {
      return find(root.left, value);
    } else if (value > root.data) {
      return find(root.right, value);
    }

    return root;
  };

  // BREADTH FIRST SEARCH TRAVERSAL(BFS)
  const levelOrder = (root, callback) => {
    let result = [];
    let queue = [];
    queue.push(root);

    if (!root) return result;

    while (queue.length !== 0) {
      let current = queue.shift();
      result.push(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      if (callback) callback(current.data);
    }

    if (!callback) return result;
  };

  // DEPTH FIRST SEARCH TRAVERSAL (DFS)
  // Root/Node — Left — Right
  const preorder = (root, callback, result = []) => {
    if (!root) return result;
    callback ? callback(root.data) : result.push(root.data);
    preorder(root.left, callback, result);
    preorder(root.right, callback, result);
    return result;
  };

  // Left — Root/Node — Right
  const inorder = (root, callback, result = []) => {
    if (!root) return result;
    inorder(root.left, callback, result);
    callback ? callback(root.data) : result.push(root.data);
    inorder(root.right, callback, result);
    return result;
  };

  // Left — Right — Root/Node
  const postorder = (root, callback, result = []) => {
    if (!root) return result;
    postorder(root.left, callback, result);
    postorder(root.right, callback, result);
    callback ? callback(root.data) : result.push(root.data);
    return result;
  };

  const height = (node = root) => {
    // Empty trees have a height of -1;
    if (!node) return -1;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  const isBalanced = (node = root) => {
    if (!node) return -1;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    const difference = Math.abs(leftHeight - rightHeight);
    return !(difference > 1);
  };

  const rebalance = (node) => {
    if (!node) return;
    const sortedArray = inorder(node);
    const newTree = buildTree(sortedArray, 0, sortedArray.length - 1);
    return newTree;
  };

  // Console.log tree in a nice manner
  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  return {
    root,
    insertNode,
    deleteNode,
    minValue,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    isBalanced,
    rebalance,
    prettyPrint,
  };
};

const buildTree = (array, start, end) => {
  if (start > end) return null;

  let mid = Math.ceil((start + end) / 2);
  let root = Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
};

const formatArray = (arr) => {
  const sortedArr = arr.sort((a, b) => a - b);
  const removeDupArr = sortedArr.filter((el, index) => {
    return sortedArr.indexOf(el) === index;
  });
  return removeDupArr;
};

const randomArray = () => {
  let array = [];
  let arrayLength = Math.floor(Math.random() * (20 - 10)) + 10;
  for (let i = 0; i < arrayLength; i++) {
    let randomInt = Math.floor(Math.random() * 99) + 1;
    array.push(randomInt);
  }
  return array;
};

const randomInt = () => Math.floor(Math.random() * 999) + 1;

const formatArr = formatArray(randomArray());
console.log(formatArr);

let myFirstTree = Tree(formatArr);

myFirstTree.prettyPrint();
console.log(`Balanced: ${myFirstTree.isBalanced()}`);
console.log(`Height: ${myFirstTree.height()}`);
console.log(`Min: ${myFirstTree.minValue()}`);
console.log(myFirstTree.levelOrder(myFirstTree.root));
console.log(myFirstTree.preorder(myFirstTree.root));
console.log(myFirstTree.inorder(myFirstTree.root));
console.log(myFirstTree.postorder(myFirstTree.root));

myFirstTree.insertNode(myFirstTree.root, randomInt());
myFirstTree.insertNode(myFirstTree.root, randomInt());
myFirstTree.insertNode(myFirstTree.root, randomInt());
myFirstTree.insertNode(myFirstTree.root, randomInt());
myFirstTree.prettyPrint();
console.log(`Balanced: ${myFirstTree.isBalanced()}`);
console.log(`Height: ${myFirstTree.height()}`);

const rebalancedTree = myFirstTree.rebalance(myFirstTree.root);
myFirstTree.prettyPrint(rebalancedTree);
console.log(`Balanced: ${myFirstTree.isBalanced(rebalancedTree)}`);
console.log(`Height: ${myFirstTree.height(rebalancedTree)}`);
