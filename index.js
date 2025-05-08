import Tree from "./tree.js";

const tree = new Tree([3, 1, 7, 4, 2]);
console.log("Sorted/deduplicated array:", [...new Set([3,1,7,4,2])].sort((a,b) => a-b));
tree.prettyPrint(tree.root);