import * as styles from 'app/styles/FaqElement.module.css';
import classnames from 'classnames';
import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

interface FaqElementProps {
  answer: string;
  question: string;
}
interface FaqElementState {
  isFaqBarDown: boolean;
}

export class FaqElement extends React.Component<FaqElementProps, FaqElementState> {
  private menuIconRef = React.createRef<HTMLDivElement>();
  private faqBodyRef = React.createRef<HTMLDivElement>();
  public constructor(props: FaqElementProps) {
    super(props);
    this.state = {
      isFaqBarDown: false,
    };
  }

  public expandFAQ = () => {
    const element = this.faqBodyRef.current;

    this.setState(
      (state) => ({ isFaqBarDown: !state.isFaqBarDown }),
      () => {
        if (this.state.isFaqBarDown && element) {
          element.style.maxHeight = '500px';
        } else {
          if (element) element.style.maxHeight = '0';
        }
        if (this.menuIconRef.current) {
          this.menuIconRef.current.classList.toggle(classnames(styles.change));
        }
      },
    );
  };

  public render() {
    const { answer, question } = this.props;
    return (
      <div
        className={
          !this.state.isFaqBarDown
            ? classnames(styles['faq-element'])
            : classnames(styles['faq-element'], styles['faq-down'])
        }
      >
        <div className={classnames(styles['faq-heading'])} onClick={this.expandFAQ}>
          <div className={classnames(styles.cont)} ref={this.menuIconRef}>
            <div className={classnames(styles.bar1)}></div>
            <div className={classnames(styles.bar2)}></div>
            <div className={classnames(styles.bar3)}></div>
          </div>
          <div className={classnames(styles['heading-text'])}>{question}</div>
        </div>

        <div className={classnames(styles['faq-body'])}>
          <div className={classnames(styles['faq-body-inactive'])} ref={this.faqBodyRef}>
            {answer}
          </div>
        </div>
      </div>
    );
  }
}
