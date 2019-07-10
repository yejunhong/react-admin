const TEST = 'T';
function TestAction(state = 0, action: any) {
  return Object.assign({}, state, {name: '22222', age: 20});
}

function TestAction1(state = 0, action: any) {
  console.log(action)
  return Object.assign({}, state, {name: '22222', age: 20});
}

export {TEST, TestAction, TestAction1};