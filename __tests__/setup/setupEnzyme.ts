// tslint:disable-next-line
const { Response, Request, Headers, fetch } = require('whatwg-fetch');

// @ts-ignore
const global = {
  Headers,
  Request,
  Response,
  fetch,
};

import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
configure({ adapter: new EnzymeAdapter() });
