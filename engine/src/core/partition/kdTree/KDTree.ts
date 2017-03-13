module egret3d {

    export class KDData{
        public location: number[];
        public data: any;
        constructor(location: number[], data?: any) {
            this.location = location;
            this.data = data;
        }
    }

    export class KDTree {

        public root: KDNode;
        constructor() {
        }

        public buildTree(data: KDData[]) {
            var points = data.map(function (d) {
                var point = [d.location[0], d.location[1]];
                point["datum"] = d;
                return point;
            });
            this.root = this.treeify(points, 0); 
        }

        private treeify(points:number[][], depth:number) {
            try { var k = points[0].length; }
            catch (e) { return null; }

            // Select axis based on depth so that axis cycles through all valid values
            var axis = depth % k;

            // TODO: To speed up, consider splitting points based on approximation of
            //       median; take median of random sample of points (perhaps of 1/10th 
            //       of the points)
            // Sort point list and choose median as pivot element
            points.sort(function (a, b) { return a[axis] - b[axis]; });
            var i_median = Math.floor(points.length / 2);

            // Create node and construct subtrees
            var point = points[i_median],
                left_points = points.slice(0, i_median),
                right_points = points.slice(i_median + 1);


            return new KDNode(
                point,
                axis,
                [this.treeify(left_points, depth + 1), this.treeify(right_points, depth + 1)],
                point["datum"]
            );
        }
    }

    export class KDNode {
        private location: number[];
        private axis;
        private subnodes;
        private datum:KDData;
        constructor(location: number[], axis, subnodes, datum: KDData) {
            this.location = location;
            this.axis = axis;
            this.subnodes = subnodes;  // = children nodes = [left child, right child]
            this.datum = datum;
        }

        public find(target: number[], count:number ) {
            count = count || 1;

            var queue = new BPQ(count);

            search(this);

            return queue.values;

            // k-NN algorithm outlined here:
            // http://web.stanford.edu/class/cs106l/handouts/assignment-3-kdtree.pdf
            function search(node: KDNode) {
                if (node === null) return;

                var distance: number = KDNode.distance(node.location, target);
                // Add current point to BPQ
                queue.add(node, distance);

                // Recursively search the half of the tree that contains the test point
                if (target[node.axis] < node.location[node.axis]) {
                    // Check left
                    search(node.subnodes[0]);
                    var otherNode = node.subnodes[1];
                }
                else {
                    // Check right
                    search(node.subnodes[1]);
                    var otherNode = node.subnodes[0];
                }

                // If candidate hypersphere crosses this splitting plane, look on the
                // other side of the plane by examining the other subtree
                var delta = Math.abs(node.location[node.axis] - target[node.axis]);
                if (!queue.isFull() || delta < queue.maxPriority()) {
                    search(otherNode);
                }
            }
        }

        public static distance(p0: number[], p1: number[]): number {
            return Math.sqrt(Math.pow(p1[0] - p0[0], 2) + Math.pow(p1[1] - p0[1], 2));
        }
    }

    class BPQ {

        private capacity;
        private elements;
        constructor(capacity) {
            this.capacity = capacity;
            this.elements = [];
        }

        public isFull() {
            return this.elements.length === this.capacity;
        }

        public isEmpty() {
            return this.elements.length === 0;
        };

        public maxPriority() {
            return this.elements[this.elements.length - 1].priority;
        };

        public get values(): any {
            return this.elements.map(function (d) { return d.value; });
        }

        public add(value, priority) {
            var q = this.elements,
                d = { value: value, priority: priority };
            if (this.isEmpty()) { q.push(d); }
            else {
                for (var i = 0; i < q.length; i++) {
                    if (priority < q[i].priority) {
                        q.splice(i, 0, d);
                        break;
                    }
                    else if ((i == q.length - 1) && !this.isFull()) {
                        q.push(d);
                    }
                }
            }
            this.elements = q.slice(0, this.capacity);
        }


    }
}