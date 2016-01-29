// npm libs
var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

// src
var Header = require('./header');
var List = require('./list');

var rootUrl = 'https://radiant-heat-1055.firebaseio.com/';

var App = React.createClass({
    mixins: [ ReactFire ],
    componentWillMount: function () {
        this.fb = new Firebase(rootUrl + 'items/');
        // this.bindAsObject(this.fb, 'items');
        this.fb.on('value', function (dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key();
                var item = childSnapshot.val();
                item.key = key;
                items.push(item);
            }.bind(this));
            this.setState({
                items: items,
                loaded: true
            });
        }.bind(this));
    },
    deleteButton: function () {
        if (Object.keys(this.state.items).length) {
            return (
                <div className="text-center clear-complete">
                    <hr />
                    <button
                        type="button"
                        onClick={this.onDeleteDoneClick}
                        className="btn btn-default">
                        Clear Complete
                    </button>
                </div>
            );
        }
    },
    getInitialState: function () {
        return {
            items: {},
            loaded: false
        };
    },
    onDeleteDoneClick: function () {
        for (var key in this.state.items) {
            if (this.state.items[key].done) {
                this.fb.child(this.state.items[key].key).remove();
            }
        }
    },
    render: function() {
        return (
            <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                    <h2 className="text-center">
                        To-Do List
                    </h2>
                    <Header itemsStore={this.fb} />
                    <hr />
                    <div className={"content " + (this.state.loaded ? "loaded" : "")}>
                        <List items={this.state.items} />
                        {this.deleteButton()}
                    </div>
                </div>
            </div>
        );
    }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
