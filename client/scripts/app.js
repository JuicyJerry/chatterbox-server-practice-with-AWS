// YOUR CODE HERE:

const app = {
  server: 'http://localhost:3000/classes',
  init: () => {
    app.addEventHandlers();
    app.fetch((json) => {
      json.results.forEach(app.renderMessage);
    });
  },
  fetchAndRender: () => {
    app.fetch(data => {
      data.results.forEach(app.renderMessage);
    });
  },
  addEventHandlers: () => {
    let submit = document.querySelector('#send .submit');
    if (submit) {
      submit.addEventListener('submit', app.handleSubmit);
    }
  },
  fetch: callback => {
    window
      .fetch(app.server+'/messages')
      .then(resp => {
        return resp.json();
      })
      .then(callback);
  },
  send: async (data, callback) => {
    console.log('데이터베이스에 등록된 유저정보를 가져옵니다.')
    let users = await window.fetch(app.server+'/users').then(res => res.json())
    
    let isUsernameInDB = false;

    for (const row of users){
      if(row.username == data.username) isUsernameInDB = true;
    }

    if(!isUsernameInDB){
      console.log('데이터베이스에 유저정보가 등록되어 있지 않습니다. \n유저정보를 등록합니다.');

      await window.fetch(app.server+'/users', {
        method: 'POST',
        body: JSON.stringify({ username: data.username }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    window
      .fetch(app.server+'/messages', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(resp => {
        return resp.json();
      })
      .then(callback);
  },
  clearMessages: () => {
    document.querySelector('#chats').innerHTML = '';
  },
  clearForm: () => {
    document.querySelector('.inputUser').value = '';
    document.querySelector('.inputChat').value = '';
  },
  renderMessage: ({ username, text, date, roomname }) => {
    const tmpl = `<div class="chat">
      <div class="username">${username
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</div>
      <div>${text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</div>
      <div>${date}</div>
      <div>${roomname
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')}</div>
    </div>`;

    document.querySelector('#chats').innerHTML =
      tmpl + document.querySelector('#chats').innerHTML;
  },
  handleSubmit: e => {
    e.preventDefault();
    app.clearMessages();
    app.send(
      {
        username: document.querySelector('.inputUser').value,
        text: document.querySelector('.inputChat').value,
        roomname: '코드스테이츠'
      },
      () => {
        app.fetchAndRender();
        app.clearForm();
      }
    );
  }
};

app.init();
