var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    var KDData = (function () {
        function KDData(location, data) {
            this.location = location;
            this.data = data;
        }
        return KDData;
    }());
    egret3d.KDData = KDData;
    __reflect(KDData.prototype, "egret3d.KDData");
    var KDTree = (function () {
        function KDTree() {
        }
        KDTree.prototype.buildTree = function (data) {
            var points = data.map(function (d) {
                var point = [d.location[0], d.location[1]];
                point["datum"] = d;
                return point;
            });
            this.root = this.treeify(points, 0);
        };
        KDTree.prototype.treeify = function (points, depth) {
            try {
                var k = points[0].length;
            }
            catch (e) {
                return null;
            }
            // Select axis based on depth so that axis cycles through all valid values
            var axis = depth % k;
            // TODO: To speed up, consider splitting points based on approximation of
            //       median; take median of random sample of points (perhaps of 1/10th 
            //       of the points)
            // Sort point list and choose median as pivot element
            points.sort(function (a, b) { return a[axis] - b[axis]; });
            var i_median = Math.floor(points.length / 2);
            // Create node and construct subtrees
            var point = points[i_median], left_points = points.slice(0, i_median), right_points = points.slice(i_median + 1);
            return new KDNode(point, axis, [this.treeify(left_points, depth + 1), this.treeify(right_points, depth + 1)], point["datum"]);
        };
        return KDTree;
    }());
    egret3d.KDTree = KDTree;
    __reflect(KDTree.prototype, "egret3d.KDTree");
    var KDNode = (function () {
        function KDNode(location, axis, subnodes, datum) {
            this.location = location;
            this.axis = axis;
            this.subnodes = subnodes; // = children nodes = [left child, right child]
            this.datum = datum;
        }
        KDNode.prototype.find = function (target, count) {
            count = count || 1;
            var queue = new BPQ(count);
            search(this);
            return queue.values;
            // k-NN algorithm outlined here:
            // http://web.stanford.edu/class/cs106l/handouts/assignment-3-kdtree.pdf
            function search(node) {
                if (node === null)
                    return;
                var distance = KDNode.distance(node.location, target);
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
        };
        KDNode.distance = function (p0, p1) {
            return Math.sqrt(Math.pow(p1[0] - p0[0], 2) + Math.pow(p1[1] - p0[1], 2));
        };
        return KDNode;
    }());
    egret3d.KDNode = KDNode;
    __reflect(KDNode.prototype, "egret3d.KDNode");
    var BPQ = (function () {
        function BPQ(capacity) {
            this.capacity = capacity;
            this.elements = [];
        }
        BPQ.prototype.isFull = function () {
            return this.elements.length === this.capacity;
        };
        BPQ.prototype.isEmpty = function () {
            return this.elements.length === 0;
        };
        ;
        BPQ.prototype.maxPriority = function () {
            return this.elements[this.elements.length - 1].priority;
        };
        ;
        Object.defineProperty(BPQ.prototype, "values", {
            get: function () {
                return this.elements.map(function (d) { return d.value; });
            },
            enumerable: true,
            configurable: true
        });
        BPQ.prototype.add = function (value, priority) {
            var q = this.elements, d = { value: value, priority: priority };
            if (this.isEmpty()) {
                q.push(d);
            }
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
        };
        return BPQ;
    }());
    __reflect(BPQ.prototype, "BPQ");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=KDTree.js.map