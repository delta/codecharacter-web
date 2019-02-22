import { EditPassword } from 'app/components/UserProfileModal/EditPassword';
import { InputName, InputState } from 'app/types/UserProfileModal';
import { mount } from 'enzyme';
import * as React from 'react';

describe('EditPassword Component', () => {
  const wrapper = mount(
    <EditPassword
      handleEditPassword={(e: React.FormEvent<HTMLFormElement>) => {
        return;
      }}
      onInputChange={(inputName: InputName, value: string) => {
        return;
      }}
      inputEnabler={(inputState: InputState, value: boolean) => {
        return;
      }}
      editPasswordRef={React.createRef<HTMLFormElement>()}
      listDisabled={{}}
      oldPassword={'oldPassword'}
      password={'password'}
      repeatPassword={'repeatPassword'}
      userDetails={{
        avatar: '',
        college: '',
        country: 'IN',
        email: '',
        errorMessage: '',
        fullName: '',
        isLoggedIn: true,
        isUserProfileModalOpen: false,
        type: '',
        username: '',
      }}
    />,
  );

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
