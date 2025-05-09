import Tree from "./tree.js";

// helper function for generating random numbers
function randomInteger(max) {
    return Math.floor(Math.random() * max);
}

// helper function to print nodes
const printNode = node => console.log(node.data);

const randomLength = randomInteger(20);
const randomArray = Array.from(
    {length: randomLength},
    () => randomInteger(100)
);

let tree = new Tree(randomArray);
console.log(tree.isBalanced());
console.log(tree.levelOrder(printNode));
console.log(tree.preOrder(printNode));
console.log(tree.inOrder(printNode));
console.log(tree.postOrder(printNode));
tree.insert(101);
tree.insert(110);
tree.insert(120);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder(printNode));
console.log(tree.preOrder(printNode));
console.log(tree.inOrder(printNode));
console.log(tree.postOrder(printNode));
