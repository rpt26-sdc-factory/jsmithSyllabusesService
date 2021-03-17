const syllabusesData = require('../data/syllabuses.json');

//data needs to be generated prior to running tests
describe('syllabusesGenerator outputs data in the proper format', () => {
  test('syllabusesData should be an object with the correct properties', () => {
    expect(typeof syllabusesData).toBe('object');
    expect(typeof syllabusesData[0]).toBe('object');
    expect(typeof syllabusesData[0].id).toBe('number');
    expect(Array.isArray(syllabusesData[0].weeks)).toBe(true);
    expect(typeof syllabusesData[0].weeks[0].weekNumber).toBe('number');
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons)).toBe(true);
    expect(typeof syllabusesData[0].weeks[0].lessons[0].hoursToCompleteLesson).toBe('number');
    expect(typeof syllabusesData[0].weeks[0].lessons[0].lessonTitle).toBe('string');
    expect(typeof syllabusesData[0].weeks[0].lessons[0].lessonDescription).toBe('string');
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons[0].videos)).toBe(true);
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons[0].readings)).toBe(true);
    expect(Array.isArray(syllabusesData[0].weeks[0].lessons[0].exercises)).toBe(true);
    expect(syllabusesData.length).toBe(100);
  });
});
