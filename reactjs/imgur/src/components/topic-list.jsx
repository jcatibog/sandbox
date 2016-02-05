var React = require('react');
var ReactRouter = require('react-router');
var Reflux = require('reflux');

var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');

var Link = ReactRouter.Link;

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
        };
    },
    onChange: function (event, topics) {
        this.setState({ topics: topics });
    },
    renderTopics: function () {
        return this.state.topics.map(function (topic) {
            return (
                <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
                    <h4>{topic.name}</h4>
                    <p>{topic.description}</p>
                </Link>
            );
        });
    },
    render: function () {
        return (
            <div className="list-group">
                {this.renderTopics()}
            </div>
        );
    }
});
