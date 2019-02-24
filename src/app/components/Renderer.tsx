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
    const {
      height,
      logFile,
      player1DebugLog,
      player2DebugLog,
      matchPlayerId,
      clearLog,
      updateLog,
    } = this.props;

    return (
      <div style={{ height, display: 'block', width: '100%' }}>
        {logFile !== '' ? (
          <CodecharacterRenderer
            // @ts-ignore
            logFile={zlib.gunzipSync(Buffer.from(JSON.parse(logFile)))}
            options={{
              logClearFunction: clearLog,
              logFunction: updateLog,
              player1Log: String.fromCharCode.apply(
                null,
                // @ts-ignore
                zlib.gunzipSync(Buffer.from(JSON.parse(player1DebugLog))),
              ),
              player2Log: String.fromCharCode.apply(
                null,
                // @ts-ignore
                zlib.gunzipSync(Buffer.from(JSON.parse(player2DebugLog))),
              ),
              playerID: { matchPlayerId },
            }}
            style={{ position: 'relative' }}
          />
        ) : null}
      </div>
    );
  }
}
