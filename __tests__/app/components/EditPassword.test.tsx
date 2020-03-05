import { EditPassword } from 'app/components/UserProfileModal/EditPassword';
import { UserType } from 'app/types/User';
import { InputName } from 'app/types/UserProfileModal';
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
      editPasswordRef={React.createRef<HTMLFormElement>()}
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
        isAuthenticationOpen: true,
        isFirstLogin: true,
        isLoggedIn: false,
        isLoginLoading: false,
        isNotificationPresent: false,
        isSocketPresent: false,
        isUserProfileModalOpen: false,
        notification: '',
        socketMessage: '',
        userId: 0,
        userType: UserType.STUDENT,
        username: '',
      }}
    />,
  );

  it('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
