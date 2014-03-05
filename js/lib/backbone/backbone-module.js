console.log("SYSTEM: BackBone module loading...");

define(["bb-raw"], function(bb) {
  bb.noConflict();       // Remove backbone from the global scope
  //delete window.Store; // also remove ugly store variable created by naughty bb-loc
  return bb;
});