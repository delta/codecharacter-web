// tslint:disable-next-line
const { Response, Request, Headers, fetch } = require('whatwg-fetch');

// @ts-ignore
const global = {
  Headers,
  Request,
  Response,
  fetch,
};

// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() })

import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
// tslint:disable:no-any
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });
