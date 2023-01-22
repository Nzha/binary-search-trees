const Node = (data) => {
  left = null;
  right = null;
  return { data, left, right };
};

const Tree = (array) => {
  root = buildTree(array);
  return { root };
};

const buildTree = (array, start, end) => {
  if (start > end) return null;

  let mid = Math.ceil((start + end) / 2);
  let root = Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

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

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let test = buildTree(arr, 0, 8);

prettyPrint(test);
