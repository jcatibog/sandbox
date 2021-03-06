var Reflux = require('reflux');
var _ = require('lodash');

var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [ Actions ],
    getImage: function (id) {
        Api.get('gallery/image/' + id)
            .then(function (json) {
                if (this.images) {
                    this.images.push(json.data);
                } else {
                    this.images = [json.data];
                }
                this.triggerChange();
            }.bind(this));
    },
    getImages: function (topicId) {
        Api.get('topics/' + topicId)
            .then(function (json) {
                this.images = _.reject(json.data, function (image) {
                    return image.is_album;
                });
                this.triggerChange();
            }.bind(this));
    },
    find: function (id) {
        var image = _.findWhere(this.images, {id: id});
        if (image) {
            return image;
        } else {
            this.getImage(id);
            return null;
        }
    },
    triggerChange: function () {
        this.trigger('change', this.images);
    }
});
