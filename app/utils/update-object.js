// @flow

/**
 * Update an object in an immutable way
 *
 * @param {Object} oldObject the old object
 * @param {Object} updatedProperties properties to be updated
 */
const updateObject = (oldObject: Object, updatedProperties: Object): Object => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export default updateObject;
