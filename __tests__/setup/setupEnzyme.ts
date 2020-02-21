// tslint:disable-next-line
const { Response, Request, Headers, fetch } = require('whatwg-fetch');
// tslint:disable-next-line
var global: any;

global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
configure({ adapter: new EnzymeAdapter() });
