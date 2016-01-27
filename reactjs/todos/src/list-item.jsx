var React = require('react');

module.exports = React.createClass({
    render: function () {
        console.log(this.props);
        return (
            <li>
                {this.props.item.text} - {this.props.key} - {this.props.item.done}
            </li>
        );
    }
})
