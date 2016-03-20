var attr =[
	<h1>Hello world</h1>,
	<h2>React is awesome</h2>,
];

ReactDOM.render(
	<h1>{attr}</h1>,
	document.getElementById('example')
);

// create a component 首字母必须大写，且只能有一个顶层标签 class,for JavaScript中的关键字替换为 className，htmlFor
var HelloMessage = React.createClass({
	render: function() {
		return <h1 className="error">Hello {this.props.name}</h1>;
	}
});

ReactDOM.render(
	<HelloMessage name="Bob" />,
	document.getElementById('hellomessage')
);

// this.props.children
var NodesList = React.createClass({
	render: function() {
		return (
			<ol>
				{
					React.Children.map(this.props.children, function(child) {
						return <li>{child}</li>;
					})
				}
			</ol>
		);
	}
});

ReactDOM.render(
	<NodesList>
		<span>hello</span>
		<span>this.props.children</span>
	</NodesList>,
	document.getElementById('nodeslist')
);

// PropTypes
var MyTitle = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
	},
	getDefaultProps: function () {
		return {
			title: "helllo world"
		};
	},
	render: function() {
		return <h1>{this.props.title}</h1>;
	}
});

var data = 12;
ReactDOM.render(
	<div>
		<MyTitle title={data} />
		<MyTitle />
	</div>,
	document.getElementById("hellotitle")
);

// Virtual DOM
var VD = React.createClass({
	handleClick: function() {
		this.refs.myTextInput.focus();
	},
	render: function() {
		return (
			<div>
				<input type="text" ref="myTextInput" />
				<input type="button" value="focus the text input" onClick={this.handleClick} />
			</div>
		);
	}
});

ReactDOM.render(
	<VD />,
	document.getElementById("vd")
);

// this.state
var LikeButton = React.createClass({
	getInitialState: function() {
		return {liked: false};
	},
	handleClick: function(event) {
		this.setState({liked: !this.state.liked});
	},
	render: function() {
		var text = this.state.liked ? 'like' : 'haven\'t liked';
		return (
			<p onClick={this.handleClick}>
				You {text} this. Click to toggle.
			</p>
		)
	}
});

ReactDOM.render(
	<LikeButton />,
	document.getElementById('likebutton')
);

// form
var Input = React.createClass({
	getInitialState: function() {
		return {value: 'Hello'};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	render: function() {
		var value = this.state.value;
		return (
			<div>
				<input type="text" value={value} onChange={this.handleChange}/>
				<p>{value}</p>
			</div>
		);
	}
});

ReactDOM.render(<Input />, document.getElementById("myinput"));

// componet lifecycle
var Hello = React.createClass({
	getInitialState: function() {
		return {
			opacity: 1.0
		};
	},
	componentDidMount() {
		this.timer = setInterval(function(){
			var opacity = this.state.opacity;
			opacity -= .05;
			if (opacity < 0.1) {
				opacity = 1.0;
			}
			this.setState({
				opacity: opacity
			});
		}.bind(this), 100);
	},
	render: function () {
		return (
			<div style={{opacity: this.state.opacity}}>
				Hello {this.props.name}
			</div>
		);
	}
});

ReactDOM.render(
	<Hello name="world"></Hello>,
	document.getElementById("hello"));

// ajax Promise
var RepoList =  React.createClass({
	getInitialState: function() {
		return {loading: true, error: null, data: null};
	},
	componentDidMount() {
		this.props.promise.then(
			value => this.setState({loading: false, data: value}),
			error => this.setState({loading: false, error: error}));
	},
	render() {
		if (this.state.loading) {
			return <span>Loading...</span>;
		} else if (this.state.error != null) {
			return <span>Error: {this.state.error.message}</span>
		} else {
			var repos = this.state.data.items;
			var repoList = repos.map(function (repo) {
				return (
					<li><a href={repo.html_url}>{repo.name}</a>({repo.stargazers_count} starts) <br/>{repo.description}</li>
				);
			})
		}
		return (
			<main>
				<h1>Most Popular JavaScript Projects in Github</h1>
				<ol>{repoList}</ol>
			</main>
		);
	}
});

ReactDOM.render(
	<RepoList promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}></RepoList>,
	document.getElementById('repos')
);
