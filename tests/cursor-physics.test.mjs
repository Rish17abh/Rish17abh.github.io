import { test } from 'node:test';
import assert from 'node:assert/strict';
import { samplePointer } from '../src/lib/cursor-physics.ts';

test('steady high speed settles instead of sustaining an acceleration pulse', () => {
  let state = samplePointer(null,0,0,0);
  let peak = 0;
  for(let i=1;i<=25;i++) {state=samplePointer(state,i*30,0,i*16);peak=Math.max(peak,state.acceleration);}
  assert.ok(peak > .4);
  assert.ok(state.acceleration < .001);
});
test('a direction reversal responds even at unchanged speed', () => {
  let state=samplePointer(null,0,0,0);
  for(let i=1;i<=20;i++)state=samplePointer(state,i*20,0,i*16);
  state=samplePointer(state,380,0,336);
  assert.ok(state.acceleration > .5);
  assert.ok(state.acceleration <= 1);
});
test('leaving and re-entering does not create a spurious burst', () => {
  const previous=samplePointer(null,0,0,0);
  const state=samplePointer(previous,1000,1000,500);
  assert.equal(state.acceleration,0);
  assert.equal(state.vx,0);
});
test('zero time and extreme movement stay finite and bounded', () => {
  let state=samplePointer(null,0,0,20);
  state=samplePointer(state,1000,1000,20);
  assert.equal(state.acceleration,0);
  state=samplePointer(state,-1e6,1e6,21);
  assert.ok(Number.isFinite(state.acceleration));
  assert.ok(state.acceleration>=0 && state.acceleration<=1);
});
