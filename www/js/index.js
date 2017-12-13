'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = function (_React$Component) {
  _inherits(Todo, _React$Component);

  function Todo(props) {
    _classCallCheck(this, Todo);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      item: [{ id: 1, do: 'Food shopping', done: false }, { id: 2, do: 'Prepare dinner', done: false }, { id: 3, do: 'Yoga class', done: true }, { id: 4, do: 'Go to theater for Romeo & Juliet play', done: false }]
    };
    return _this;
  }

  Todo.prototype.addItem = function addItem() {
    var l = this.state.item.length;
    console.log(l);
    var inputDo = document.getElementsByTagName('input')[0];
    var newId = 0;
    if (l === 0) {
      newId = 0;
    } else {
      newId = this.state.item[l - 1].id + 1;
    }
    var newItem = [{ id: newId, do: inputDo.value, done: false }];
    var itemCopy = this.state.item.slice();
    itemCopy = itemCopy.concat(newItem);
    this.setState({ item: itemCopy });
  };

  Todo.prototype.deleteItem = function deleteItem(key) {
    var index = this.state.item.findIndex(function (i) {
      return i.id === key;
    });
    var newT = this.state.item.slice();
    var newTab = newT.splice(index, 1);
    this.setState({ item: newT });
  };

  Todo.prototype.done = function done(key) {
    var index = this.state.item.findIndex(function (i) {
      return i.id === key;
    });
    var itemCopy = this.state.item.slice();
    if (this.state.item[index].done === false) {
      itemCopy[index].done = true;
    } else {
      itemCopy[index].done = false;
    }
    this.setState({ item: itemCopy });
  };

  Todo.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Task List'
      ),
      React.createElement('input', { type: 'text', placeholder: 'Create Task...' }),
      React.createElement(
        'button',
        { onClick: function onClick() {
            return _this2.addItem();
          } },
        '+'
      ),
      React.createElement(List, { item: this.state.item, onDelete: function onDelete(key) {
          return _this2.deleteItem(key);
        }, onDone: function onDone(key) {
          return _this2.done(key);
        } })
    );
  };

  return Todo;
}(React.Component);

var List = React.createClass({
  displayName: 'List',
  render: function render() {
    var _this3 = this;

    var itemsToDisplay = this.props.item.map(function (i) {
      return React.createElement(ListItem, { key: i.id, 'do': i.do, done: i.done, onDelete: function onDelete() {
          return _this3.props.onDelete(i.id);
        }, onDone: function onDone() {
          return _this3.props.onDone(i.id);
        } });
    });
    return React.createElement(
      'ul',
      null,
      itemsToDisplay
    );
  }
});

var ListItem = React.createClass({
  displayName: 'ListItem',
  render: function render() {
    var _this4 = this;

    return React.createElement(
      'li',
      { key: this.props.key, className: this.props.done === true ? 'done' : null },
      React.createElement(
        'p',
        null,
        this.props.do
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { className: 'btn', onClick: function onClick() {
              return _this4.props.onDone();
            } },
          this.props.done === true ? 'Finish' : 'Unfinish'
        ),
        React.createElement(
          'button',
          { className: 'btn', onClick: function onClick() {
              return _this4.props.onDelete();
            } },
          'X'
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('toDoList'));