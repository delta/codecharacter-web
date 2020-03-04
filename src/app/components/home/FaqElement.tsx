import * as styles from 'app/styles/FaqElement.module.css';
import classnames from 'classnames';
import * as React from 'react';

interface FaqElementProps {
  answer: string;
  question: string;
}
interface FaqElementState {
  isFaqBarDown: boolean;
}

export class FaqElement extends React.Component<FaqElementProps, FaqElementState> {
  private faqBodyStyle = {
    maxHeight: '0',
  };

  public constructor(props: FaqElementProps) {
    super(props);
    this.state = {
      isFaqBarDown: false,
    };
  }

  public expandFAQ = () => {
    if (this.state.isFaqBarDown) {
      this.faqBodyStyle = {
        maxHeight: '0',
      };
    } else {
      this.faqBodyStyle = {
        maxHeight: '500px',
      };
    }
    this.setState({ isFaqBarDown: !this.state.isFaqBarDown });
  };

  public render() {
    const { answer, question } = this.props;
    return (
      <div
        className={
          !this.state.isFaqBarDown
            ? classnames(styles['faq-element'], 'container-fluid')
            : classnames(styles['faq-element'], styles['faq-down'], 'container-fluid')
        }
      >
        <div className={classnames(styles['faq-heading'], 'row')} onClick={this.expandFAQ}>
          <div
            className={
              this.state.isFaqBarDown
                ? classnames(styles.cont, 'col-1', styles.change, 'justify-content-start')
                : classnames(styles.cont, 'col-1')
            }
          >
            <div className={classnames(styles.bar1)}></div>
            <div className={classnames(styles.bar2)}></div>
            <div className={classnames(styles.bar3)}></div>
          </div>
          <h3 className={classnames(styles['heading-text'], 'col-11')}>{question}</h3>
        </div>

        <div className={classnames(styles['faq-body'])}>
          <div
            className={classnames(styles['faq-body-inactive'])}
            style={this.faqBodyStyle}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></div>
        </div>
      </div>
    );
  }
}
