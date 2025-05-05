import Node from "./node.js";

export default class Tree {
    constructor (root) {
        this.root = root;
    }

    buildTreeRecursion(arr, start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        
        let root = new Node (arr[mid]);

        root.left = this.buildTreeRecursion(arr, start, mid - 1);
        root.right = this.buildTreeRecursion(arr, mid + 1, end);

        return root;
    }
    // takes an array of data and turns it into a balanced binary tree full of nodes. Make sure to remove duplicates and sort first
    buildTree(arr){
        // Need to remove any duplicates from the array and sort it before starting to build the tree recursively
        let s = new Set(arr);
        let deduplicatedArray = [...s];
        let sortedArray = deduplicatedArray.sort((a, b) => a - b);
        return this.buildTreeRecursion(sortedArray, 0, sortedArray.length - 1);
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}