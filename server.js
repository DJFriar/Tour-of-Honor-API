var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const config = require("./common/config")
const db = require("./models")
var appRouter = require('./routes/index');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appRouter);
require("./routes/memorials.js")(app);
require("./routes/users.js")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

db.sequelize.sync({ force: false })
.then(() => {
    
});
//    .then(() => {
//     if (!config.cfauth){
//       throw "Fatal error, no CFAUTH value set.";
//     }
    
//     if (config.activeagent == "false") {
//       console.log("Agent inactive. Running in GUI only mode.")
//     } else {
//       console.log("Start your engines....");
      
//       /*  FIREWALL GRABBER */
//       cron.schedule('*/3 * * * * *', () => {
//         db.Zone.findOne({
//           where: {
//             locked: 0,
//             fw_enabled: 1
//           },
//           order: [['fw_start', 'ASC']],
//         }).then(data => {
//           loopyGrabber(data);
//         });
//       });

//       /*  HTTP GRABBER */
//       cron.schedule('*/3 * * * * *', () => {
//         db.Zone.findOne({
//           where: {
//             locked: 0,
//             http_enabled: 1
//           },
//           order: [['http_start', 'ASC']],
//         }).then(data => {
//           if (!data) {return}

//           helpers.getHTTPLogs(data)
//           .catch(err => helpers.errHandler(err));
//           //loopyGrabber(data);
//         });
//       });
//       /* CLEAN DATABASE OF QUERY LOGS */
//        cron.schedule('*/1 * * * *', () => {
//         const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

//         db.Qlog.destroy({
//           where: {
//             createdAt: {
//               [Op.lt]: thirtyDaysAgo
//             }
//           }
//         }).catch(err => helpers.errHandler(err));
//       });
//       /*  LOCK FIX */
//       cron.schedule('*/5 * * * *', () => {
//         db.Zone.findAll({
//           where: {
//             locked: 1,
//           },
//           order: [['http_start', 'ASC']],
//         }).then(data => {
//           if (!data) {return}
//           if (data.length > 0){
//             data.forEach(function(e){
//               //console.log(e.http_start);
//               var a = moment().utc().subtract(1,"minute");
//               var d = moment.duration(a.diff(e.updatedAt));
//               //console.log(d.asMinutes());
//               if (d.asMinutes() > 5){
//                 console.log(e.name +" locked for > 5 minutes. Unlocking.");
//                 helpers.unlockZone(e.tag).catch(err => helpers.errHandler(err))
//               }
//             });
//           }
//         });
//       });
//     }
// }).catch(err=>helpers.errHandler(err));
