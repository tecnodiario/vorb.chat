import * as React from 'react';

import { BrowserRouter as Router, Switch, Route, useParams, Link } from 'react-router-dom';

import { Button } from '@rmwc/button';
import '@rmwc/button/styles';


import { RTCSignaling, useSignalingState } from './rtc_signaling';
import { Room } from './room';

const RoomRoute: React.SFC<{}> = () => {
  const { room_name } = useParams();
  if(!room_name){
    return null;
  }
  return <Room room_name={room_name} />
}

export const ConnectionHandler: React.SFC = ({ children }) => {
  const state = useSignalingState();

  if(state == null) {
    return null;
  }

  switch(state) {
    case "idle":
    case "connecting":
      return <div>Connecting ...</div>;

    case "connected":
      return <>{children}</>;

    case "closed":
      return <div>Connection lost</div>;

    case "failed":
      return <div>Unable to connect</div>;
  }
}

export const App: React.SFC = () => {
  return <Router>
    <RTCSignaling address="wss://calling.innovailable.eu">
      <ConnectionHandler>
        <Switch>
          <Route path="/c/:room_name">
            <RoomRoute />
          </Route>
          <Route path="/">
            <div className="app">
              <h1>Welcome to UWP - the universal WebRTC Project</h1>
              <div>
                <input type="text" placeholder="Room name" />
                <Button type="button" label="Join"  outlined />
                <Link to={"/c/asdf"} >{"asdf"}</Link>
              </div>
            </div>
          </Route>
        </Switch>
      </ConnectionHandler>
    </RTCSignaling>
  </Router>
}
