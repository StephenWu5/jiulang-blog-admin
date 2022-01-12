import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

// 配置全局的document和window变量来模拟实际的浏览器行为
const jsdom =  require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('');
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = window;
