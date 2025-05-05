import Tree from "./tree.js";
const tree = new Tree();
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(arr);
const root = tree.buildTree(arr);
tree.prettyPrint(root);