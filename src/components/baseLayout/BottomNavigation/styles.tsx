import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      bottom: 0
    }
  });
