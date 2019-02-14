import * as RendererInterfaces from 'app/types/Renderer';
import * as React from 'react';
import * as zlib from 'zlib';

// @ts-ignore
// tslint:disable-next-line:import-name
import CodecharacterRenderer from 'codecharacter-renderer';

export default class Renderer extends React.Component<RendererInterfaces.Props, {}> {
  constructor(props: RendererInterfaces.Props) {
    super(props);
  }

  public render() {
    return (
      <div style={{ display: 'block', width: '100%', height: this.props.height }}>
        {this.props.logFile !== '' ? (
          <CodecharacterRenderer
            // @ts-ignore
            logFile={zlib.gunzipSync(Buffer.from(JSON.parse(this.props.logFile)))}
            options={{
              logClearFunction: this.props.clearLog,
              logFunction: this.props.updateLog,
              player1Log: String.fromCharCode.apply(
                null,
                // @ts-ignore
                zlib.gunzipSync(Buffer.from(JSON.parse(this.props.player1DebugLog))),
              ),
              player2Log: String.fromCharCode.apply(
                null,
                // @ts-ignore
                zlib.gunzipSync(Buffer.from(JSON.parse(this.props.player2DebugLog))),
              ),
              playerID: 1,
            }}
            style={{ position: 'relative' }}
          />
        ) : null}
      </div>
    );
  }
}
