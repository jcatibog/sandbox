var React = require('react');
var Reflux = require('reflux');

var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange')
    ],
    componentWillMount: function () {
        Actions.getImages(this.props.params.id);
    },
    componentWillReceiveProps: function (nextProps) {
        Actions.getImages(nextProps.params.id);
    },
    getInitialState: function () {
        return {
            images: []
        }
    },
    onChange: function (event, images) {
        this.setState({ images: images });
    },
    renderImages: function () {
        return this.state.images.slice(0, 20).map(function (image) {
            return (
                <ImagePreview key={image.id} {...image} />
            );
        });
    },
    render: function () {
        return (
            <div className="topic">
                {this.renderImages()}
            </div>
        );
    }
});
