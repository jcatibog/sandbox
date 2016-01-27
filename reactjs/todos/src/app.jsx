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
        var fb = new Firebase(rootUrl + 'items/');
        this.bindAsObject(fb, 'items');
        fb.on('value', this.handleDataLoaded);
    },
    getInitialState: function () {
        return {
            items: {},
            loaded: false
        };
    },
    handleDataLoaded: function () {
        this.setState({ loaded: true });
    },
    render: function() {
        return (
            <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                    <h2 className="text-center">
                        To-Do List
                    </h2>
                    <Header itemsStore={this.firebaseRefs.items}/>
                    <div className={"content " + (this.state.loaded ? "loaded" : "")}>
                        <List items={this.state.items} />
                    </div>
                </div>
            </div>
        );
    }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
