var React = require('react');
var Api = require('../utils/api');

module.exports = React.createClass({
    componentWillMount: function () {
        Api.get('topics/defaults')
            .then(function (data) {
                this.setState({
                    topics: data.data
                });
            }.bind(this));
    },
    getInitialState: function () {
        return {
            topics: []
        };
    },
    renderTopics: function () {
        return this.state.topics.map(function (topic) {
            return (
                <li>{topic.name}</li>
            );
        });
    },
    render: function () {
        return (
            <div className="list-group">
                Topic List
                {this.renderTopics()}
            </div>
        );
    }
});
