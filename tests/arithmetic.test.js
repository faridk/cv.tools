const { FaceRecognitionEngine } = require('./../src/components/FaceRecognition.js');

// // Use xtest() or test.skip() to skip tests
// test('name', () => {
//   expect(/* calling a function to test it */).toBe(/* expected return */);
// });

test('FaceRecognitionEngine', () => {
  expect(new FaceRecognitionEngine()).toBe(true);
});

// test.each([[1, 1, 2], [-1, 2, 1], [2, 1, 3]])(
//   '%i + %i equals %i', (a, b, expected) => {
//     expect(add(a, b)).toBe(expected);
//   },
// );