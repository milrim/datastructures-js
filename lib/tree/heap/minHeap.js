/**
 * datastructures-js/heap/MinHeap
 * @class
 * @extends Heap
 * @copyright 2018 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Heap = require('./heap');

class MinHeap extends Heap {

  /**
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * @public
   * gets the min element in the heap
   * @returns {number}
   */
  min() {
    return this._root();
  }

  /**
   * @public
   * removes the min element from the heap
   * @returns {number}
   */
  extractMin() {
    return this._removeRoot();
  }

  /**
   * @public
   * removes an element at a given index
   * @param {number} index
   */
  remove(index) {
    if (index >= 0 && index < this._size) {
      this._updateKey(index, this.min() - 1);
      this.extractMin();
    }
  }

  /**
   * @private
   * find the min child of a parent
   * @param {number} i
   */
  _minChild(left, right) {
    if (left < this._size && right < this._size) {
      if (this._nodes[left] < this._nodes[right]) {
        return left;
      }
      else {
        return right;
      }
    }
    else if (right < this._size) {
      return right;
    }
    else if (left < this._size) {
      return left;
    }
  }

  /**
   * @protected
   * fix the min element of the heap starting from a child
   * @param {number} i
   */
  _bubble(i) {
    let index = i;
    let parent = this._parent(i);
    while (index > 0 && this._nodes[parent] > this._nodes[index]) {
      this._swap(index, parent);
      index = parent;
      parent = this._parent(index);
    }
  }

  /**
   * @private
   * fix the min element of the heap starting from a parent
   * @param {number} parent
   */
  _fixRoot(parent) {
    let minChild = this._minChild(this._left(parent), this._right(parent));
    if (minChild !== null && this._nodes[parent] > this._nodes[minChild]) {
      this._swap(parent, minChild);
      this._fixRoot(minChild);
    }
  }

}

module.exports = MinHeap;