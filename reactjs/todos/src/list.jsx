var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
    renderList: function () {
        if (!Object.keys(this.props.items).length) {
            return (
                <h4>Add a todo to get started.</h4>
            );
        } else {
            var children = [];
            for (var key in this.props.items) {
                var item = this.props.items[key];
                children.push(
                    <ListItem
                        item={item}
                        key={item.key}
                    >
                    </ListItem>
                );
            }
            return children;
        }
    },
    render: function () {
        return (
            <ul>
                {this.renderList()}
            </ul>
        );
    }
});
