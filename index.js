import Tree from "./tree.js";

const tree = new Tree([3, 1, 7, 4, 2]);
console.log("Current Tree:")
tree.prettyPrint(tree.root);
// Test 1: Print traversal
console.log("Attempting to print traversal")
tree.levelOrder(node => console.log(node.data));

// Test 2: Collect values
console.log("Attemping to store values in an array via breadth-first traversal")
const result = [];
tree.levelOrder(node => result.push(node.data));
console.log(result);

/* const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
console.log("Initial tree:")
tree.prettyPrint(tree.root);
// Level Order callback test
*/
