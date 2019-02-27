import * as RendererInterfaces from 'app/types/Renderer';
import * as pako from 'pako';
import * as React from 'react';

// @ts-ignore
// tslint:disable-next-line:import-name
import CodecharacterRenderer from 'codecharacter-renderer';
import { Col, Row } from 'react-bootstrap';

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
      <div style={{ height, display: 'flex', width: '100%', alignItems: 'center' }}>
        {logFile !== '' ? (
          <CodecharacterRenderer
            // @ts-ignore
            logFile={pako.inflate(Buffer.from(JSON.parse(logFile)))}
            options={{
              logClearFunction: clearLog,
              logFunction: updateLog,
              // @ts-ignore
              player1Log: new TextDecoder('utf-8').decode(
                pako.inflate(Buffer.from(JSON.parse(player1DebugLog))),
              ),
              // @ts-ignore
              player2Log: new TextDecoder('utf-8').decode(
                pako.inflate(Buffer.from(JSON.parse(player2DebugLog))),
              ),
              playerID: matchPlayerId,
            }}
            style={{ position: 'relative' }}
          />
        ) : (
          <div style={{ width: '100%', minWidth: '280px' }}>
            <Row>
              <Col sm={12} className="text-center">
                <div
                  style={{ display: 'inline-block', borderRadius: 120, backgroundColor: '#d3d3d3' }}
                >
                  <img
                    src="assets/img/mascotgif.gif"
                    height={190}
                    width={130}
                    style={{ padding: 10, margin: '10px 40px' }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="text-center">
                <h2 style={{ fontFamily: 'Courier New', color: '#f9ee80', margin: 30 }}>
                  Waiting to run your code...
                </h2>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}
