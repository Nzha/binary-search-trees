const Node = (data) => {
  left = null;
  right = null;
  return { data, left, right };
};

const Tree = (array) => {
  root = buildTree(array, 0, array.length - 1);

  const insertNode = (root, value) => {
    // If tree is empty, return a new node
    if (!root) root = Node(value);

    // Otherwise, recur down the tree
    if (value < root.data) {
      root.left = insertNode(root.left, value);
    } else if (value > root.data) {
      root.right = insertNode(root.right, value);
    }

    return root;
  };

  const deleteNode = (root, value) => {
    // If tree is empty, return a new node
    if (!root) return root;

    // Otherwise, recur down the tree
    if (value < root.data) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = deleteNode(root.right, value);
    } else {
      // If node has no child (i.e. is a leaf) or only one child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // If node has 2 children
      if (root.left && root.right) {
        root.data = minValue(root.right);
        root.right = deleteNode(root.right, root.data);
      }
    }

    return root;
  };

  const minValue = (root) => {
    let minValue = root.data;
    while (root.left) {
      minValue = root.left.data;
      root = root.left;
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
  const levelOrder = (callback) => {
    let result = [];
    let queue = [];
    queue.push(this.root);

    if (!this.root) return result;

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
  // Root — Left — Right
  const preorder = (root, callback, result = []) => {
    if (!root) return result;
    callback ? callback(root.data) : result.push(root.data);
    preorder(root.left, callback, result);
    preorder(root.right, callback, result);
    return result;
  };

  // Left — Root — Right
  const inorder = (root, callback, result = []) => {
    if (!root) return result;
    inorder(root.left, callback, result);
    callback ? callback(root.data) : result.push(root.data);
    inorder(root.right, callback, result);
    return result;
  };

  // Left — Right — Root
  const postorder = (root, callback, result = []) => {
    if (!root) return result;
    postorder(root.left, callback, result);
    postorder(root.right, callback, result);
    callback ? callback(root.data) : result.push(root.data);
    return result;
  };

  // Console.log tree in a nice manner
  const prettyPrint = (node, prefix = '', isLeft = true) => {
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
  console.log(removeDupArr);
  return removeDupArr;
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const formatArr = formatArray(arr);

let myFirstTree = Tree(formatArr);

myFirstTree.insertNode(myFirstTree.root, 81);
// myFirstTree.deleteNode(myFirstTree.root, 4);
// console.log(myFirstTree.minValue(myFirstTree.root));
// console.log(myFirstTree.find(myFirstTree.root, 8));
// console.log(myFirstTree.levelOrder());
// console.log(myFirstTree.preorder(myFirstTree.root));
// console.log(myFirstTree.inorder(myFirstTree.root));
console.log(myFirstTree.postorder(myFirstTree.root));
myFirstTree.prettyPrint(myFirstTree.root);
