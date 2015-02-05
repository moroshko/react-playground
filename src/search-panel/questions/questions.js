var React = require('react');

var Questions = React.createClass({
  render: function() {
    var title = 'Questions here';
    var es6content = `Hi! ${title}`;

    return (
      <div className='questions'>
        {es6content}
      </div>
    );
  }
});

module.exports = Questions;
