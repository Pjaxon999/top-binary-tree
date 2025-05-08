import Tree from "./tree.js";

const tree = new Tree([3, 1, 7, 4, 2]);
tree.prettyPrint(tree.root);
console.log(tree.depth(4));  // Should log 1
console.log(tree.depth(7));
console.log(tree.depth(0));
console.log(tree.depth(3));