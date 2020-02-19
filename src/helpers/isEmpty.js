
/**
 * Simple helper method that check for null
 * value of any data type
 * @param {*} value
 */
const IsEmpty = (value) => (
  value === undefined
        || value === null
        || (typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
);

module.exports = IsEmpty;
