'use strict';

jest.dontMock('../questions.js');

var React = require('react/addons');
var Questions = require('../questions.js');
var TestUtils = React.addons.TestUtils;

describe('Questions', function() {
  it('should render content', function() {
    var questions = TestUtils.renderIntoDocument(<Questions />);
    var questionsWrapper =
      TestUtils.findRenderedDOMComponentWithClass(questions, 'questions');

    expect(questionsWrapper.getDOMNode().textContent).toEqual('Hi! Questions here');
  });
});
