import * as style from 'app/styles/Dashboard.css';
import * as React from 'react';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';

export class Dashboard extends React.Component<{}, Dashboard.State> {
  constructor(props: {}, context?: any) {
    super(props, context);
    this.state = {
      code: '',
    };
  }

  public render() {
    return (
      <SplitPane split="vertical" minSize={50} defaultSize={100} resizerClassName={style.vertical}>
        <div />
        <SplitPane split="horizontal" resizerClassName={style.horizontal}>
          <div />
          <div />
        </SplitPane>
      </SplitPane>
    );
  }
}

export namespace Dashboard {
  export interface State {
    code: string;
  }
}
