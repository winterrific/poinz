import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {changeStory, cancelEditStory} from '../actions';
import {getAllMatchingPendingCommands} from '../services/queryPendingCommands';

/**
 * If a story is in "editMode" this form is displayed (in the backlog)
 */
const StoryEditForm = ({t, story, changeStory, cancelEditStory, pendingChangeCommands}) => {
  const classes = classnames('story story-edit-mode', {
    waiting: pendingChangeCommands.find((cmd) => cmd.payload.storyId === story.id)
  });

  let titleInputField, descriptionInputField;

  return (
    <div className={classes}>
      <div className="pure-form">
        <fieldset className="pure-group">
          <input
            type="text"
            className="pure-input-1"
            defaultValue={story.title}
            ref={(ref) => (titleInputField = ref)}
            onKeyPress={handleTitleKeyEvent}
          />

          <textarea
            className="pure-input-1"
            rows="1"
            placeholder="Description / URL / etc."
            defaultValue={story.description}
            ref={(ref) => (descriptionInputField = ref)}
          />
        </fieldset>

        <StoryEditFormButtonGroup t={t} onSave={triggerChange} onCancel={triggerCancel} />
      </div>
    </div>
  );

  function handleTitleKeyEvent(keyEvent) {
    if (keyEvent.key === 'Enter') {
      triggerChange();
    }
  }

  function triggerChange() {
    if (titleInputField.value) {
      changeStory(story.id, titleInputField.value, descriptionInputField.value);
    }
  }

  function triggerCancel() {
    cancelEditStory(story.id);
  }
};

StoryEditForm.propTypes = {
  t: PropTypes.func.isRequired,
  story: PropTypes.object,
  changeStory: PropTypes.func,
  cancelEditStory: PropTypes.func,
  pendingChangeCommands: PropTypes.array
};

export default connect(
  (state) => ({
    t: state.translator,
    pendingChangeCommands: getAllMatchingPendingCommands(state, 'changeStory')
  }),
  {changeStory, cancelEditStory}
)(StoryEditForm);

const StoryEditFormButtonGroup = ({t, onSave, onCancel}) => (
  <div className="pure-g button-group">
    <div className="pure-u-1-2">
      <button type="button" className="pure-button pure-input-1" onClick={onCancel}>
        {t('cancel')}
        <i className="fa fa-times button-icon-right"></i>
      </button>
    </div>
    <div className="pure-u-1-2">
      <button
        type="button"
        className="pure-button pure-input-1 pure-button-primary"
        onClick={onSave}
      >
        {t('save')}
        <i className="fa fa-save button-icon-right"></i>
      </button>
    </div>
  </div>
);

StoryEditFormButtonGroup.propTypes = {
  t: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};
