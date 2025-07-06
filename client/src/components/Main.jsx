import React from 'react';
import {useSelector} from 'react-redux';
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

const getNormalizedRoomId = (pathname) => (pathname ? pathname.substr(1) : '');

/** Inti Tracker for sending usage data */
import react_umami from 'react-umami';
const tracker = new react_umami(
  '48fd90bc-bb45-49cf-b40d-2ce65dd0b405',
  window.location.hostname,
  'https://umami.winterrific.net'
);

/**
 * The Main component switches between top-level views (somewhat a basic routing).
 */
const Main = () => {
  const roomId = useSelector(getRoomId);
  const userCount = useSelector(getUserCount);
  const ownUserId = useSelector(getOwnUserId);
  const roomDataIsLoaded = roomId && userCount > 0 && !!ownUserId;

  const joinUserdata = useSelector(getJoinUserdata);
  const joinRoomId = useSelector(getJoinRoomId);
  const failedAuth = useSelector(hasJoinFailedAuth);
  const pathname = useSelector((state) => state.ui.pathname);
  const isAppStatusUrlPath = getNormalizedRoomId(pathname) === appConfig.APP_STATUS_IDENTIFIER;

  if (isAppStatusUrlPath) {
    tracker.trackView('/appstatus');
    return <AppStatus />;
  } else if (failedAuth) {
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

export default Main;
