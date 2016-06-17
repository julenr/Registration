let Window = {
  location: function() {
    return window.location;
  },
  redirect: function(url) {
    window.location = url;
  }
};

export {Window as default};