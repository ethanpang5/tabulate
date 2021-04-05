'use strict'; 

const e = React.createElement;

class Widget extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { liked: false };
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    return (
        <div class="widget">
            <div class="widget-header">
                <a class="widget-title">Test</a>
                <div class="widget-control">
                    <a onclick="openAllFavorites()">open all</a>
                        <a data-toggle="modal" data-target="#exampleModal">
                        add
                        </a>
                    <a>delete</a>
                </div>
            </div>
            <div class="widget-grid" id="favorites">
            </div>
        </div>
    );
  }
}

const domContainer = document.querySelector('.test');
ReactDOM.render(e(Widget), domContainer);