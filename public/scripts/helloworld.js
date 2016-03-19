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