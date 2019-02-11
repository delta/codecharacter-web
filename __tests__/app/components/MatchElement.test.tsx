import { MatchElement } from 'app/components/MatchView/MatchElement';
import { mount } from 'enzyme';
import * as React from 'react';

describe('MatchElement Component', () => {
  const wrapper = mount(
    <MatchElement
      index={1}
      match={{
        playedAt: 'date string',
        userOne: 'user1',
        userOneScore: 1,
        userTwo: 'user2',
        userTwoScore: 5,
        winner: 'user2',
      }}
    />,
  );

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
