var URL = "https://www.reddit.com/r/gaming/comments/3ddk7q/it_worked/.json";

var React = require('react');

var CommentArea = React.createClass({
	render: function(){
		return (<div> This the comment area </div>);
	}
});

var ExpandoButton = React.createClass({
	render: function(){
		return (<div> This is the button </div>);
	}
});

var CommentsController = React.createClass({
	render: function(){
		return (<div> This is the controller
					<ExpandoButton />
					<CommentArea />
				</div>
		);
	}
});

React.render(
	<CommentsController />,
	document.getElementById('content')
);