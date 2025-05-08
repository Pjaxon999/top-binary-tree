import Tree from "./tree.js";

const tree = new Tree([3, 1, 7, 4, 2]);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.insert(10));
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());