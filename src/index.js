import dva from 'dva';
import 'font-awesome/css/font-awesome.min.css';
import './index.less';
import './utils/func';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
