
exports.hasProperty = function(objects, props) {
  var has = true;
  for(var i = 0; i < props.length; i++) {
    if (!objects.hasOwnProperty(props[i])) {
      has = false;
      break;
    }
  }
  return has;
}
