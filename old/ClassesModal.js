'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { liked: false };
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    return (
        <div class="modal fade" id="classesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <div class="form-group">
                        <label>Website Name</label>
                        <input id="website-name" type="text" class="form-control" placeholder=""/>
                    </div>
                    <div class="form-group">
                        <label>URL</label>
                        <input id="website-url" type="text" class="form-control" placeholder=""/>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onclick="addFavorite()" type="button" class="btn btn-primary" data-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

const domContainer = document.querySelector('#classes-modal');
ReactDOM.render(e(LikeButton), domContainer);