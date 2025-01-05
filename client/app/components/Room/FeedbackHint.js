import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '../common/Avatar';
import {hideNewUserHints} from '../../state/actions/uiStateActions';

import {StyledFeedbackHint} from './_styled';

const FeedbackHint = ({hintsHidden, hideNewUserHints}) => {
  if (hintsHidden) {
    return null;
  }

  return (
    <StyledFeedbackHint>
      <i className="icon-cancel hide-hints" onClick={() => hideNewUserHints()}></i>
      <div style={{width: '45px'}}>
        <Avatar
          user={{email: 'ruben@winterrific.net', emailHash: '40e0b3663ee7891194258415c3dff4bcf2ecdbe1d9fac95fc8c9d0cb1469bced'}}
          index={0}
        />
      </div>
      <div>
        Hey there! Do you use Poinz on a regular basis? I would be very interested in your{' '}
        <a href="https://github.com/winterrific/poinz/issues" target="_blank" rel="noopener noreferrer">
          feedback!
        </a>
      </div>
    </StyledFeedbackHint>
  );
};

FeedbackHint.propTypes = {
  hintsHidden: PropTypes.bool,
  hideNewUserHints: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    hintsHidden: state.ui.newUserHintHidden
  }),
  {hideNewUserHints}
)(FeedbackHint);
