const app = new Vue({
  data: {
    msg: 'Hello, world!'
  },
  template: '<div id="app"><h1>{{ msg }}</h1><input v-model="msg" /><input v-model="msg" /></div>'
  /*
  render: function (h) {
    return h('div', { attrs: { id: 'app' } }, [
      h('h1', { props: { msg: this.msg } }),
      h('input', { domProps: { value: this.msg }, on: { input: function (e) { this.msg = e.target.value }.bind(this) } }),
      h('input', { domProps: { value: this.msg }, on: { input: function (e) { this.msg = e.target.value }.bind(this) } })
    ])
  }
  */
})

app.$mount(document.querySelector('#app'))
