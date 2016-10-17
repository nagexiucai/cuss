/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module cuss
 * @fileoverview Test suite for `cuss`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var profanities = require('profanities');
var fck = require('f-ck');
var cuss = require('./');

var missing = [];

/* Tests. */
test('cuss', function (t) {
  t.equal(typeof cuss, 'object', 'should be an object #1');

  t.ok('asshat' in cuss, 'should contain words #1');
  t.ok('addict' in cuss, 'should contain words #2');
  t.ok('beaver' in cuss, 'should contain words #3');

  t.equal(cuss.asshat, 2, 'should map to a rating #1');
  t.equal(cuss.addict, 1, 'should map to a rating #2');
  t.equal(cuss.beaver, 0, 'should map to a rating #3');

  t.end();
});

test('profanities', function (t) {
  profanities.forEach(function (profanity) {
    t.test(fck(profanity), function (st) {
      st.plan(4);

      if (!(profanity in cuss)) {
        missing.push(profanity);
      }

      st.ok(profanity in cuss, 'should exist');
      st.equal(typeof cuss[profanity], 'number', 'should be a number');
      st.ok(cuss[profanity] >= 0, 'should be gte 0');
      st.ok(cuss[profanity] <= 2, 'should be lte 2');
    });
  });

  t.test(function (st) {
    st.equal(Object.keys(cuss).length, 1751, 'should have a count');
    st.deepEqual(missing, [], 'should not have missing profanities');
    st.end();
  });

  t.end();
});
