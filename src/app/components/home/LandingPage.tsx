import { FaqElement } from 'app/components/home/FaqElement';
import { Footer } from 'app/components/home/Footer';
import * as styles from 'app/styles/LandingPage.module.css';
import * as LandingPageInterfaces from 'app/types/LandingPage';
import classnames from 'classnames';
import * as React from 'react';
import { NavBar, NavPage } from './Navbar';

export class LandingPage extends React.Component<LandingPageInterfaces.Props, {}> {
  private faq = [
    {
      answer:
        'Codecharacter is a great place to delve into the world of programming! The fun and competitive community couped with the instructive docs is a great starting place for someone learning to code .',
      question: 'Do I have to know programming to play CodeCharacter?',
    },
    {
      answer: "Simply follow the signup link and you'll be on your way!",
      question: 'How do I participate?',
    },
    {
      answer:
        'Yes! Code Character is played completely on the web. However, we provide functionality for you to write code offline on your own text editor and compile the code. For more details, check out the player docs <a href="https://code.pragyan.org/docs/">code.pragyan.org/docs/</a>',
      question: 'Is the event completely online?',
    },
    {
      answer:
        'All players can match up against other players of their choice and the match results cause corresponding rating changes. The top 20 players are considered to be in Div 1. For these players, every 6 hours, matches are simulated between all Div 1 players to normalize the leaderboard. ',
      question: 'What is the tournament format?',
    },
    {
      answer: `
      The Latest versions of Chrome and Firefox can be used play CodeCharacter!`,
      question: 'What are the supported browsers?',
    },
  ];

  public constructor(props: LandingPageInterfaces.Props) {
    super(props);
  }

  public render() {
    return (
      <div className={classnames(styles.root)}>
        <NavBar isLoggedIn={this.props.isLoggedIn} page={NavPage.HOME} />
        <div className={classnames(styles.head, 'container-fluid')}>
          <div className={classnames('col-lg-6', styles.head_img)}>
            <img src="./assets/img/bot_dashboard.png" className={styles.img_big} />
            <img src="./assets/img/bot_dashboard_mob.png" className={styles.img_mob} />
          </div>
          <div className={classnames(styles['landing-heading'], 'col-lg-6')}>
            <h1 className="row">Code Character</h1>
            <p>AI programming challenge</p>
          </div>
        </div>
        <div className={classnames('container-fluid', styles['first-cont'])}>
          <div className={classnames('row', styles['about-container'])} id={'about'}>
            <div className={classnames('col-md', styles['about-codechar'])}>
              <h1>About</h1>
              <p>
                {' '}
                Code Character is an online AI programming competition, where you write C++ code for
                a real time strategy game. Test your code against yourself, against the computer,
                against your previous versions and then against everyone else on multiple maps!{' '}
              </p>
              <p> Challenge others to improve your rating as you climb up the leaderboard!</p>
              <ul>
                <li>Integrated code editor and development environment</li>
                <li>
                  View your AI play with different versions of itself and with existing AI Bots
                </li>
                <li>Live leaderboard, challenge anyone.</li>
                <li>Active discussion forum for any game related questions</li>
                <li>Extensive tutorials and documentation</li>
              </ul>
              <p>
                Go through the{' '}
                <a href="https://code.pragyan.org/docs/" target="_blank">
                  docs
                </a>{' '}
                and start playing!
              </p>
              <p>
                In case of any queries, discuss at the{' '}
                <a
                  href="https://discord.gg/fgT7ejYk"
                  target="_blank"
                >
                  CodeCharacter Forum
                </a>{' '}
                .
              </p>
              <h1>Prizes</h1>
              <p>A total of 15K INR up for grabs for acing the leaderboard.</p>
              <ul>
                <li>First Place - 7.5K INR</li>
                <li>Second Place - 4.5K INR</li>
                <li>Third Place - 3K INR</li>
              </ul>
            </div>
            <div className={classnames(styles['codechar-video'], 'col-lg-5')}>
              <img width="auto" height="auto" src="./assets/img/bot_hi.png" />
            </div>
          </div>

          <div className="row justify-content-center" id={'faq'}>
            <img src="./assets/img/faq.jpg" height={200} />
          </div>
          <div className={classnames('row', styles.faq_section)}>
            <div className="col-lg-6 col-sm-12">
              {this.faq.map((element, index) => {
                if (index % 2 === 0) {
                  return (
                    <FaqElement key={index} question={element.question} answer={element.answer} />
                  );
                }
                return null;
              })}
            </div>
            <div className="col-lg-6 col-sm-12">
              {this.faq.map((element, index) => {
                if (index % 2 === 1) {
                  return (
                    <FaqElement key={index} question={element.question} answer={element.answer} />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="position-sticky align-bottom" id={'contact'}>
          <Footer />
        </div>
      </div>
    );
  }
}
