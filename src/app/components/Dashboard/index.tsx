import * as React from 'react';
import * as style from './index.css';
import SplitPane from 'react-split-pane';
import { Editor } from './Code/editor';

export namespace Dashboard {
  export interface Props {}

  export interface State {
    code: String;
  }
}

export class Dashboard extends React.Component<Dashboard.Props, Dashboard.State> {
  constructor(props: Dashboard.Props, context?: any) {
    super(props, context);
    this.state = {
      code: ''
    };
  }

  render() {
    return (
      <SplitPane split="vertical" minSize={50} defaultSize={100} resizerClassName={style.vertical}>
        <Editor />
        <SplitPane split="horizontal" resizerClassName={style.horizontal}>
          <div />
          <div />
        </SplitPane>
      </SplitPane>
    );
  }
}
