import 'babel-polyfill';
import dva from 'dva';
import Loading from 'dva-loading';

import './index.less';

// 1. Initialize
const app = dva({
  initialState: {
  }
});

// 2. Plugins
app.use(Loading({
  namespace: 'loading'
  // effects: enable effects level loading state
}));

// 3. Model 
app.model(require('./models/index.js'));

app.model(require("./models/main"));

app.model(require("./models/registration"));

// 4. Router
app.router(require('./router.js'));

// 5. Start
app.start('#root');
