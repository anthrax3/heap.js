var heap = require('../../heap');
var Base = heap.entities.Base;
var binding = heap.binding;
var constants = heap.constants;

var assert = require('assert');
var util = require('util');
var Buffer = require('buffer').Buffer;

function Field(heap, ptr) {
  Base.call(this, heap, 'field', ptr);
}
util.inherits(Field, Base);
module.exports = Field;

var offsets = {
  size: heap.ptrSize,
  field: 2 * heap.ptrSize
};
Field.offsets = offsets;

Field.shifts = {
  field: heap.ptrShift
};

Field.minSize = 8;

Field.fieldSize = function fieldSize(fields) {
  return fields * heap.ptrSize;
};

Field.size = function size(fields) {
  return this.super_.size() + heap.ptrSize + Field.fieldSize(fields);
};

Field.prototype.rawSize = function rawSize() {
  return Field.size(this.size());
};

Field.prototype.size = function size() {
  var res = binding.readTagged(this.deref(), offsets.size);
  assert(typeof res === 'number', 'Field.size should be a smi');
  return res;
};

Field.prototype.get = function get(index) {
  return this.heap.wrap(
       binding.readTagged(this.deref(), offsets.field + index * heap.ptrSize));
};

Field.prototype.set = function set(index, val) {
  return binding.writeTagged(this.deref(),
                             val.deref(),
                             offsets.field + index * heap.ptrSize);
};

Field.prototype.toJSON = function toJSON() {
  throw new Error('Converting hashmap to JSON');
};