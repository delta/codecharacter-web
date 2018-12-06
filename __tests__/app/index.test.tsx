import { App } from 'app/index';
import { shallow } from 'enzyme';
import * as React from 'react';

test('Main App Component Renders', () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});
