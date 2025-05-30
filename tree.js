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

    // helper function for insertion. Does nothing if there is a duplicate value
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

    // insert a given value
    insert(value) {
        this.root = this.insertRecursive(this.root, value);
    }

    // helper function for recursive delete that finds the successor
    findSuccessor(node) {
        let current = node.right;
        while (current.left !== null) {
            current = current.left;
        }
        return current; 
    }

    deleteRecursive(node, value) {
        // based!
        if (node === null) return null;

        // recursive cases
        if (value < node.data) {
            node.left = this.deleteRecursive(node.left, value);
        } else if (value > node.data) {
            node.right = this.deleteRecursive(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null && node.right !== null) {
                return node.right;
            }
            if (node.left !== null && node.right === null) {
                return node.left;
            } else {
                let successor = this.findSuccessor(node);
                node.data = successor.data;
                node.right = this.deleteRecursive(node.right, successor.data);
            }
        }
        return node;
    }    

    // remove a node that has the given value 
    // needs to search through a value via tree traversal, when a value is found do the following based on the case:
    // 1. removing a node from the tree with no children => delete without update
    // 2. removing a node that has 1 child => replace with it's child. It's parent now points to it's child.
    // 3. removing a node that has 2 children => find the smallest value in the right subtree, replace node with that smallest child
    deleteItem(value) {
        this.root = this.deleteRecursive(this.root, value);
    }

    // helper function for find
    findRecursive(node, value) {
        if (node === null || node.data === value) return node;

        if (value < node.data) {
            return this.findRecursive(node.left, value);
        } else if (value > node.data) {
            return this.findRecursive(node.right, value);
        }
    }

    // find a node with the given value
    find(value) {
        return this.findRecursive(this.root, value);
    }

    // iterative helper function for levelOrder traversal
    levelOrderIteration(node, callback) {
        if (node === null) return;
    
        let visiting = [];
        visiting.push(node);
        while(visiting.length !== 0) {
            let currentNode = visiting.shift();
            callback(currentNode);
            if (currentNode.left !== null) visiting.push(currentNode.left);
            if (currentNode.right !== null) visiting.push(currentNode.right);
        }

    }
    // function that accepts a callback function and traverses the tree in breadth-first level order and calls the callback on each node
    levelOrder(callback) {
        if (typeof callback !== 'function'){
            throw new Error('levelOrder requires a callback function as an argument');
        }

        //handle empty tree case
        if (this.root === null) return;

        this.levelOrderIteration(this.root, callback);
    }

    // helper function for recursive preorder traversal
    preOrderRecursion(node, callback){
        if (node === null) return;

        callback(node);
        this.preOrderRecursion(node.left, callback);
        this.preOrderRecursion(node.right, callback);
    }

    // preorder traversal depth first
    preOrder(callback) {
        if (typeof callback !== 'function'){
            throw new Error('levelOrder requires a callback function as an argument');
        }

        //handle empty tree case
        if (this.root === null) return;

        this.preOrderRecursion(this.root, callback);
    }

    // helper function for recursive inorder traversal
    inOrderTraversalRecursion(node, callback) {
        if (node === null) return;

        this.inOrderTraversalRecursion(node.left, callback);
        callback(node);
        this.inOrderTraversalRecursion(node.right, callback);
    }

    // inorder traversal depth first
    inOrder(callback) {
        if (typeof callback !== 'function'){
            throw new Error('inOrder requires a callback function as an argument');
        }

        //handle empty tree case
        if (this.root === null) return;

        this.inOrderTraversalRecursion(this.root, callback);
    }

    // helper function for recursive postorder traversal
    postOrderTraversalRecursion(node, callback) {
        if (node === null) return;

        this.postOrderTraversalRecursion(node.left, callback);
        this.postOrderTraversalRecursion(node.right, callback);
        callback(node);
    }

    // postorder traversal depth first
    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('postOrder requires a callback function as an argument');
        }

        // handle empty tree
        if (this.root === null) return;

        this.postOrderTraversalRecursion(this.root, callback);
    }

    // recursive helper function for height
    heightRecursion(node) {
        if (node === null) return -1;
        return 1 + Math.max(this.heightRecursion(node.left), this.heightRecursion(node.right));
    }

    // returns the height of a node containing the given value
    height(value) {
        let target = this.find(value);
        if (target === null) return null;
        return this.heightRecursion(target);
    }

    // find the depth of a node that has a given value
    depth(value) {
        let target = this.find(value);
        if (target === null) return null;
        if (this.root.data === value) return 0;

        let visiting = [];
        // need an object so I can store the depth of how far I am into the tree I am while iterating over it. Otherwise the depth is lost on each shift from the array (don't ask me how I know that)
        visiting.push({node: this.root, depth: 0});

        while(visiting.length !== 0) {
            let currentlyVisiting = visiting.shift();
            let currentNode = currentlyVisiting.node;
            let currentDepth = currentlyVisiting.depth;

            if (currentNode === target) return currentDepth;
            if (currentNode.left !== null) {
                visiting.push({node: currentNode.left, depth: currentDepth + 1});
            }
            if (currentNode.right !== null) {
                visiting.push({node: currentNode.right, depth: currentDepth + 1});
            }
        }
    }

    // method that checks to see if the BST is balanced
    isBalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.heightRecursion(node.left);
        const rightHeight = this.heightRecursion(node.right);
    
        const heightDifference = Math.abs(leftHeight - rightHeight);
        if (heightDifference > 1) {
            return false; 
        }
    
        const isLeftBalanced = this.isBalanced(node.left);
        if (!isLeftBalanced) {
            return false;
        }

        const isRightBalanced = this.isBalanced(node.right);
        if (!isRightBalanced) {
            return false;
        }
    
        return true;
    }

    // rebalances an unbalanced tree
    rebalance() {
        if (this.isBalanced() === true) return;
        let arr = [];
        this.inOrder(node => arr.push(node.data));
        this.root = this.buildTree(arr);
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