const Node = (data) => {
  left = null;
  right = null;
  return { data, left, right };
};

const Tree = (array) => {
  root = buildTree(array, 0, array.length - 1);

  const insert = (root, value) => {
    // If tree is empty, return a new node
    if (root === null) root = Node(value);

    // Otherwise, recur down the tree
    if (value < root.data) {
      root.left = insert(root.left, value);
    } else if (value > root.data) {
      root.right = insert(root.right, value);
    }

    return root;
  };

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  return { root, insert, prettyPrint };
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

myFirstTree.insert(myFirstTree.root, 81);
myFirstTree.prettyPrint(myFirstTree.root);
