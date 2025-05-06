import Node from "./node.js";

export default class Tree {
    constructor (arr, root) {
        this.arr = arr;  
        this.root = this.buildTree(arr);
    }

    buildTreeRecursion(arr, start, end) {
        if (start > end) return null;
        let mid = start + Math.floor((end - start) / 2);

        // the root node is created from the middle to for the purposes of having a balanced tree, and can be used during the recursion
        let root = new Node (arr[mid]);

        // recursively build nodes
        root.left = this.buildTreeRecursion(arr, start, mid - 1);
        root.right = this.buildTreeRecursion(arr, mid + 1, end);

        // return the root node
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

    // insert a given value
    insert(value) {
        this.root = this.insertRecursive(this.root, value);
    }

    // helper function for insertion. Do nothing if there is a duplicate value
    insertRecursive(node, value) {
        // base case
        if (node === null) return new Node(value);

        // recursive cases to traverse tree
        if (value < node.data) {
            node.left = this.insertRecursive(node.left, value);
        } else if (value > node.data) {
            node.right = this.insertRecursive(node.right, value);
        }

        return node;
    }

    // remove a given value
    // 1. removing a node from the tree with no children => delete without update
    // 2. removing a node that has 1 child => replace with it's child. It's parent now points to it's child.
    // 3. removing a node that has 2 children => find the smallest value in the right subtree, replace node with that smallest child
    deleteItem(value) {
        
    }

    // used to show our tree structure in the console.
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