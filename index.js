import Tree from "./tree.js";

const tree = new Tree([3, 1, 7, 4, 2]);
console.log("Inorder:");
tree.inOrder(node => console.log(node.data));
console.log("Preorder:");
tree.preOrder(node => console.log(node.data));
console.log("Postorder:");
tree.postOrder(node => console.log(node.data));

