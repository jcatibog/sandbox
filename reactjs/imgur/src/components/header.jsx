var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = Router.Link;

var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange')
    ],
    componentWillMount: function () {
        Actions.getTopics();
    },
    getInitialState: function () {
        return {
            topics: []
        }
    },
    onChange: function (event, topics) {
        this.setState({ topics: topics});
    },
    renderTopics: function () {
        return this.state.topics.map(function (topic) {
            return (
                <li key={topic.id}>
                    <Link activeClassName="active" to={"topics/" + topic.id} >{topic.name}</Link>
                </li>
            );
        });
    },
    render: function () {
        return (
            <nav className="navbar navbar-default header">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Imgur Browser</Link>
                    <ul className="nav navbar-nav navbar-right">
                        {this.renderTopics()}
                    </ul>
                </div>
            </nav>
        );
    }
});
