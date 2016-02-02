var React = require('react');
var Reflux = require('reflux');

var ImageStore = require('../stores/image-store');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange')
    ],
    onChange: function (event, image) {
        this.setState({ image: image });
    },
    render: function () {
        return (
            <div>
                I am an image detail!
            </div>
        );
    }
});
