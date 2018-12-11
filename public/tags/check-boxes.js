riot.tag2('check-boxes', '<h3 class="center-align">{opts.title}</h3> <div class="container"> <p each="{opts.options}"> <label> <input if="{checked == false}" type="checkbox" class="filled-in" onclick="{parent.toggle}"> <input if="{checked == true}" type="checkbox" class="filled-in" checked="checked" onclick="{parent.toggle}"> <span>{label}</span> </label> </p> <div class="container"> <button ref="thebutton" class="btn waves-effect waves-light right" type="submit" name="action">Update <i class="material-icons right">done</i> </button> </div> </div>', '', '', function(opts) {
    let self = this;
    self.options = opts.options;

    self.toggle = function (e) {
      var item = e.item;
      item.checked = !item.checked;
    }

    let onFormSubmit = function(evt) {
      evt.preventDefault();
      let url = `https://the3dwin-tag-along.glitch.me/people/update/` + opts.title.toLowerCase();

      let body = {
        data: self.options.filter(opt => opt.checked).map(opt => opt.label)
      }

      fetch(url, body).then(res => res.json()).then(res => console.log('res', res));
      console.log('options', self.options);
    }

    self.on('mount', function(eventName) {
      self.refs.thebutton.onclick = onFormSubmit;
    });
});