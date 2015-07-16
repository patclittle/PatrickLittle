var React = require('react');
//THe box to hold comments
var CommentBox = React.createClass({
	getInitialState: function() { //Initialize the state as empty
		return {data:[]};
	},
	loadCommentsFromServer: function() { //Load json comments from server
    	$.ajax({
      		url: this.props.url,
      		dataType: 'json',
      		cache: false,
      		success: function(data) {
        		this.setState({data: data}); //set state as comment list if successful
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(this.props.url, status, err.toString());
      		}.bind(this)
    	});
 	},
 	componentDidMount: function() { // On load, load from server and keep polling
 		this.loadCommentsFromServer();
 		setInterval(this.loadCommentsFromServer,this.props.pollInterval);
 	},
 	handleCommentSubmit: function(comment){ //On submit, submit comment to server
 		$.ajax({
      		url: this.props.url,
      		dataType: 'json',
      		type: 'POST',
      		data: comment,
      		success: function(data) {
        		this.setState({data: data});
      		}.bind(this),
      		error: function(xhr, status, err) {
        		console.error(this.props.url, status, err.toString());
      		}.bind(this)
    	});
 	},
	render: function(){ //Render the comment box
		return(
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}
});

var CommentList = React.createClass({
  render: function() {
  		var commentNodes = this.props.data.map(function (comment){
    		return(
    			<Comment author={comment.author}>{comment.text}</Comment>
    		);
    	});
    	return (
      		<div className="commentList">
        		{commentNodes}
      		</div>
    	);
  	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var author = React.findDOMNode(this.refs.author).value.trim();
		var text = React.findDOMNode(this.refs.text).value.trim();
		if (!text || !author){
			return
		}
		this.props.onCommentSubmit({author: author, text: text});
		React.findDOMNode(this.refs.author).value = '';
		React.findDOMNode(this.refs.text).value = '';
	},
  	render: function() {
    	return (
      		<form className="commentForm" onSubmit={this.handleSubmit}>
        		<input type="text" placeholder="Your name..." ref="author"/>
        		<input type="text" placeholder="Comment..." ref="text"/>
        		<input type="submit" value="Comment!" />
      		</form>
    	);
  	}
});

var Comment = React.createClass({
	render: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return(
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}}/>
			</div>
		);
	}
});

React.render(
	<CommentBox url="comments.json" pollInterval={2000}/>,
	document.getElementById('content')
);