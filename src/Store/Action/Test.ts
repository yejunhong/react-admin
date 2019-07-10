const TEST = 'T';
function TestAction(S: any) {
  console.log(111);
  return {type: TEST, S}
}
export default {TEST, TestAction};