import React from 'react';
import { render} from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Syllabus from '../client/components/Syllabus';
import Lesson from '../client/components/Lesson';
import { enableFetchMocks } from 'jest-fetch-mock';
import { syllabusData, svgs } from './test-data';
import { unmountComponentAtNode } from 'react-dom';

enableFetchMocks();

// setup a new DOM element as a render target
let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup after each test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('Syllabus', () => {
  let svgsData = svgs;
  let lessonData = syllabusData.weeks[0].lessons[0];
  let key = 'testKey';
  let lessonNumber = 1;
  test('renders the app', () => {
    fetch.mockResponses(
      [
        JSON.stringify(syllabusData),
        { status: 200 }
      ],
      [
        JSON.stringify(svgs),
        { status: 200 }
      ]
    );
    render(<Syllabus />);
  });

  test('SEE ALL button changes its text when clicked', () => {
    render(<Lesson svgsData={svgsData} lessonData={lessonData} key={key} lessonNumber={lessonNumber} />);
    let seeAll = screen.queryByText('SEE ALL');
    let seeLess = screen.queryByText('SEE LESS');
    expect(seeAll).toBeDefined();
    expect(seeLess).toBeFalsy();
    userEvent.click(seeAll);
    seeAll = screen.queryByText('SEE ALL');
    seeAll = screen.queryByText('SEE LESS');
    expect(seeAll.pendingProps?.children).toBeUndefined;
    expect(seeLess).toBeDefined();
  });
});