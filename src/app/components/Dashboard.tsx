import Editor from 'app/containers/code/Editor';
import * as style from 'app/styles/Dashboard.css';
import * as React from 'react';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';

export class Dashboard extends React.Component<{}, Dashboard.State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      code: '',
      leftPartitionWidth: 500,
    };
  }

  public render() {
    const { leftPartitionWidth } = this.state;

    return (
      <SplitPane
        split="vertical"
        minSize={400}
        defaultSize={500}
        resizerClassName={style.vertical}
        onChange={this.onChange}
      >
        <Editor editorWidth={leftPartitionWidth} theme="monokai" fontSize={16} />
        <SplitPane split="horizontal" resizerClassName={style.horizontal}>
          <div />
          <div />
        </SplitPane>
      </SplitPane>
    );
  }

  private onChange = (size: number): void => {
    this.setState({
      leftPartitionWidth: size,
    });
  };
}

export namespace Dashboard {
  export interface State {
    code: string;
    leftPartitionWidth: number;
  }
}
