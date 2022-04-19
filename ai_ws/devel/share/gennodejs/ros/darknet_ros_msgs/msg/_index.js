
"use strict";

let ObjectCount = require('./ObjectCount.js');
let BoundingBoxes = require('./BoundingBoxes.js');
let BoundingBox = require('./BoundingBox.js');
let CheckForObjectsActionFeedback = require('./CheckForObjectsActionFeedback.js');
let CheckForObjectsAction = require('./CheckForObjectsAction.js');
let CheckForObjectsFeedback = require('./CheckForObjectsFeedback.js');
let CheckForObjectsGoal = require('./CheckForObjectsGoal.js');
let CheckForObjectsActionGoal = require('./CheckForObjectsActionGoal.js');
let CheckForObjectsResult = require('./CheckForObjectsResult.js');
let CheckForObjectsActionResult = require('./CheckForObjectsActionResult.js');

module.exports = {
  ObjectCount: ObjectCount,
  BoundingBoxes: BoundingBoxes,
  BoundingBox: BoundingBox,
  CheckForObjectsActionFeedback: CheckForObjectsActionFeedback,
  CheckForObjectsAction: CheckForObjectsAction,
  CheckForObjectsFeedback: CheckForObjectsFeedback,
  CheckForObjectsGoal: CheckForObjectsGoal,
  CheckForObjectsActionGoal: CheckForObjectsActionGoal,
  CheckForObjectsResult: CheckForObjectsResult,
  CheckForObjectsActionResult: CheckForObjectsActionResult,
};
