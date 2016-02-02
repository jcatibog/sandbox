var Reflux = require('reflux');
var _ = require('lodash');

var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [ Actions ],
    getImages: function (topicId) {
        Api.get('topics/' + topicId)
            .then(function (json) {
                this.images = _.reject(json.data, function (image) {
                    return image.is_album;
                });
                this.triggerChange();
            }.bind(this));
    },
    triggerChange: function () {
        this.trigger('change', this.images);
    }
});
