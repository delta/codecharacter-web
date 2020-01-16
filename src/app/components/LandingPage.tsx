import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
/* tslint:disable-next-line */
import MenuIcon from '@material-ui/icons/Menu';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import * as React from 'react';

const styles = (theme: Theme) => ({
  appBar: {
    backgroundColor: 'black',
    color: '#e3b04b',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
});

class LandingPage extends React.Component<
  LandingPageInterfaces.Props,
  LandingPageInterfaces.State
> {
  // public constructor(props: LandingPageInterfaces.Props) {
  //   super(props);
  // }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Code Character
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const landingPageContainer = withStyles(styles)(LandingPage);

export default landingPageContainer;
