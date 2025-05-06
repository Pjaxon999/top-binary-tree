import Tree from "./tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
console.log("Initial tree:")
tree.prettyPrint(tree.root);
// Delete test
// no children
console.log("attemping to delete 3");
tree.deleteItem(3);
tree.prettyPrint(tree.root);
// one child
console.log("attempting to delete 9");
tree.deleteItem(9);
tree.prettyPrint(tree.root);
// two children
console.log("attemping to delete 67");
tree.deleteItem(67);
tree.prettyPrint(tree.root);
// no such value
console.log("attemping to delete 100000");
tree.deleteItem(10000);
tree.prettyPrint(tree.root);