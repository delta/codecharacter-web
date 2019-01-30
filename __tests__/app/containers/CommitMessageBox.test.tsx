import { CommitMessageBox } from 'app/components/SubmitBar/CommitMessageBox';
import { mount } from 'enzyme';
import * as React from 'react';

describe('CommitMessageBox Container', () => {
  const props = {
    commitMessage: 'Inital Commit',
    handleCommit: () => {
      return;
    },
    isCommitMessageBoxOpen: true,
    updateCommitMessage: (commitMessage: string) => {
      return;
    },
  };
  const wrapper = mount(<CommitMessageBox {...props} />);
  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
