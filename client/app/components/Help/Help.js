import React, {useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {L10nContext} from '../../services/l10n';
import {SIDEBAR_HELP} from '../../state/actions/uiStateActions';
import {getCurrentSidebarIfAny} from '../../state/ui/uiSelectors';
import Changelog from '../common/Changelog';
import appConfig from '../../services/appConfig';

import {StyledHelp, StyledHelpInner} from './_styled';
import {StyledSection} from '../common/_styled';

/**
 */
const Help = ({shown}) => {
  const {t} = useContext(L10nContext);
  return (
    <StyledHelp $shown={shown}>
      <h4>{t('help')}</h4>

      <StyledHelpInner>
        <StyledSection>
          <h5>User manual & Feedback</h5>
          If you need help, please checkout the{' '}
          <a
            href="https://github.com/winterrific/poinz/blob/master/docu/manual.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            User Manual
          </a>{' '}
          or get <a href="mailto:ruben@winterrific.net">in touch!</a>
          <p>
            Also, I&apos;m always interested in your feedback. Please open a{' '}
            <a
              href="https://github.com/winterrific/poinz/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discussion on github.
            </a>
          </p>
        </StyledSection>

        <StyledSection>
          <Changelog changelog={appConfig.changeLog} />
        </StyledSection>
      </StyledHelpInner>
    </StyledHelp>
  );
};

Help.propTypes = {
  shown: PropTypes.bool
};

export default connect((state) => ({
  shown: getCurrentSidebarIfAny(state) === SIDEBAR_HELP
}))(Help);
