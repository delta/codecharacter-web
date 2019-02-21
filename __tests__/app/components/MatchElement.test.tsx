import { MatchElement } from 'app/components/MatchView/MatchElement';
import { mount } from 'enzyme';
import * as React from 'react';

describe('MatchElement Component', () => {
  const wrapper = mount(
    <MatchElement
      index={1}
      match={{
        playedAt: 'date string',
        score1: 1,
        score2: 5,
        username1: 'user1',
        username2: 'user2',
        verdict: 1,
      }}
    />,
  );

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
