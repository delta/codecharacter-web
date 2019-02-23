import { MatchElement } from 'app/components/MatchView/MatchElement';
import { MatchViewTabType } from 'app/types/MatchView';
import { mount } from 'enzyme';
import * as React from 'react';

describe('MatchElement Component', () => {
  const wrapper = mount(
    <MatchElement
      currentUserMatch={false}
      index={1}
      match={{
        avatar1: 'BABOON',
        avatar2: 'BEAR',
        games: [],
        playedAt: 'date string',
        score1: 1,
        score2: 5,
        username1: 'user1',
        username2: 'user2',
        verdict: 1,
      }}
      getGameLogs={(gameId: number) => undefined}
      type={MatchViewTabType.TOP_MATCHES}
    />,
  );

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
