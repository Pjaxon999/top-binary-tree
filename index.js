import Tree from "./tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

// Print the initial tree (should be balanced)
console.log("Initial tree:");
tree.prettyPrint(tree.root);

// Test insert
tree.insert(10);  // Should insert 2 into the tree
console.log("\nTree after inserting 2:");
tree.prettyPrint(tree.root);

// Test duplicate insert
tree.insert(7);  // Should do nothing (duplicate)
console.log("\nTree after attempting to insert 7 (duplicate):");
tree.prettyPrint(tree.root);