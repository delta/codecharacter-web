import { Editor } from 'app/components/code/editor/Editor';
import * as style from 'app/styles/Dashboard.css';
import * as React from 'react';
/* tslint:disable-next-line:import-name */
import SplitPane from 'react-split-pane';

export class Dashboard extends React.Component<{}, Dashboard.State> {
  constructor(props: {}, context?: any) {
    super(props, context);
    this.state = {
      code: '',
      width: 500,
    };
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const width = this.state.width;
    return (
      <SplitPane
        split="vertical"
        minSize={50}
        defaultSize={500}
        resizerClassName={style.vertical}
        onChange={this.onChange}>
        <Editor editorWidth={width}/>
        <SplitPane split="horizontal" resizerClassName={style.horizontal}>
          <div />
          <div />
        </SplitPane>
      </SplitPane>
    );
  }

  private onChange(size: number) {
    this.setState({
      width:size,
    });
  }
}

export namespace Dashboard {
  export interface State {
    code: string;
    width: number;
  }
}
