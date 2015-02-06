'use strict';

var React = require('react');
var Questions = require('./questions/questions');
var QuestionSearch = require('./question-search/question-search');

var SearchPanel = React.createClass({
  render: function() {
    return (
      <div className='search-panel'>
        <Questions />
        <QuestionSearch />
      </div>
    );
  }
});

module.exports = SearchPanel;
