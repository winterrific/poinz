import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Room from './Room/Room';
import WhoAreYou from './Landing/WhoAreYou';
import AppStatus from './AppStatus/AppStatus';
import Landing from './Landing/Landing';
import appConfig from '../services/appConfig';
import RoomProtected from './Landing/RoomProtected';
import {getOwnUserId, getUserCount} from '../state/users/usersSelectors';
import {getRoomId} from '../state/room/roomSelectors';
import {getJoinRoomId, getJoinUserdata, hasJoinFailedAuth} from '../state/joining/joiningSelectors';
import {react_umami} from 'react-umami';

const getNormalizedRoomId = (pathname) => (pathname ? pathname.substr(1) : '');
/** Inti Tracker for sending usage data */
const tracker = new react_umami(
  UMAMI_ID,
  window.location.hostname,
  UMAMI_URL
);

/**
 * The Main component switches between top-level views (somewhat a basic routing).
 */
const Main = ({
  roomDataIsLoaded,
  roomId,
  hasJoinFailedAuth,
  isAppStatusUrlPath,
  joinUserdata,
  joinRoomId
}) => {
  if (isAppStatusUrlPath) {
    tracker.trackView('/appstatus');
    return <AppStatus />;
  } else if (hasJoinFailedAuth) {
    tracker.trackView('/roomprotected');
    return <RoomProtected />;
  } else if (roomDataIsLoaded) {
    tracker.trackView('/room');
    return <Room roomId={roomId} />;
  } else if (joinRoomId && !joinUserdata.username) {
    tracker.trackView('/user');
    return <WhoAreYou />;
  } else {
    tracker.trackView('/');
    return <Landing />;
  }
};

Main.propTypes = {
  hasJoinFailedAuth: PropTypes.bool,
  joinUserdata: PropTypes.object,
  joinRoomId: PropTypes.string, // roomId during join workflow
  roomId: PropTypes.string, // roomId after successful join
  roomDataIsLoaded: PropTypes.bool,
  isAppStatusUrlPath: PropTypes.bool
};

export default connect((state) => ({
  roomDataIsLoaded: getRoomId(state) && getUserCount(state) > 0 && !!getOwnUserId(state),
  roomId: getRoomId(state),
  joinUserdata: getJoinUserdata(state),
  joinRoomId: getJoinRoomId(state),
  hasJoinFailedAuth: hasJoinFailedAuth(state),
  isAppStatusUrlPath: getNormalizedRoomId(state.ui.pathname) === appConfig.APP_STATUS_IDENTIFIER
}))(Main);
