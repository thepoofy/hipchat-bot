var Notifier = require('ac-koa-hipchat-notifier').Notifier;
var Commands = require('./lib/commands');

var ack = require('ac-koa').require('hipchat');
var pkg = require('./package.json');
var app = ack(pkg);


var addon = app.addon()
  .hipchat()
  .allowRoom(true)
  .scopes('send_notification');

if (process.env.DEV_KEY) {
  addon.key(process.env.DEV_KEY);
}

var notifier = Notifier({format: 'html', dir: __dirname + '/messages'});
var commands = Commands(notifier);

addon.webhook('room_message', /^\/beerme$/, function *() {

    yield this.roomClient.sendNotification('Hi, ' + this.sender.name + '!  Looking for recent untappd checkins within 1km...');

    yield commands.beerme();

});

app.listen();
