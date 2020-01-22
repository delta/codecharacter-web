import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
/* tslint:disable-next-line */
import MenuIcon from '@material-ui/icons/Menu';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import * as React from 'react';

/* tslint:disable-next-line */
const styles = (theme: any) => ({
  appBar: {
    backgroundColor: '#f6f9fc',
    borderBottom: '3px solid #ecf0fb',
    boxShadow: 'none',
    color: '#6b7c93',
    height: '100px',
    position: 'fixed' as 'fixed',
  },
  menuButton: {
    height: '100px',
    marginRight: theme.spacing(2),
  },
  navBarDown: {
    backgroundColor: 'white',
    boxShadow: '10px',
    color: '#6b7c93',
    height: '110px',
    position: 'fixed' as 'fixed',
  },
  root: {
    backgroundColor: '#f6f9fc',
    flexGrow: 1,
    height: '200vh',
  },
  title: {
    flexGrow: 1,
  },
});

class LandingPage extends React.Component<
  LandingPageInterfaces.Props,
  LandingPageInterfaces.State
> {
  public constructor(props: LandingPageInterfaces.Props) {
    super(props);
    this.state = {
      isNavBarDown: false,
    };
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // alert(document.body.scrollTop);
    // document.body.scrollTop=200;
  }

  public handleScroll = (): void => {
    if (window.pageYOffset > 100) {
      this.setState({ isNavBarDown: true });
    } else {
      this.setState({ isNavBarDown: false });
    }
  };

  public render() {
    const { classes } = this.props;
    const { isNavBarDown } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={isNavBarDown ? classes.navBarDown : classes.appBar}>
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
            <Button color="inherit">Register</Button>
            <Button color="inherit">Dashboard</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
/* tslint:disable-next-line */
const landingPageContainer = withStyles(styles)(LandingPage);

export default landingPageContainer;
