import { setAppName } from './config';
import { setAppColors } from './styles/colors';
import routes from './routes/sourceRoutes';
import initializeApp from './index';

/**
 * This serves as the primary entry point to the Media Cloud Source Manager app.
 */

setAppName('sources');

setAppColors({
  light: '#4b9fcb',
  dark: '#3c97bd',
});

initializeApp(routes);