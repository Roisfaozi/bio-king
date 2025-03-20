'use client';

import LocationPermissionModal from './location-permission-modal';
import LoginModal from './login-modal';
import SignupModal from './signup-modal';

interface ModalsContainerProps {
  showLoginModal: boolean;
  showSignupModal: boolean;
  showLocationModal: boolean;
  onCloseLoginModal: () => void;
  onCloseSignupModal: () => void;
  onCloseLocationModal: () => void;
  onSwitchToSignup: () => void;
  onSwitchToLogin: () => void;
  onLocationPermissionGranted: (
    latitude: number,
    longitude: number,
    accuracy: number,
  ) => void;
}

export default function ModalsContainer({
  showLoginModal,
  showSignupModal,
  showLocationModal,
  onCloseLoginModal,
  onCloseSignupModal,
  onCloseLocationModal,
  onSwitchToSignup,
  onSwitchToLogin,
  onLocationPermissionGranted,
}: ModalsContainerProps) {
  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={onCloseLoginModal}
        onSwitchToSignup={onSwitchToSignup}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={onCloseSignupModal}
        onSwitchToLogin={onSwitchToLogin}
      />

      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={onCloseLocationModal}
        onPermissionGranted={onLocationPermissionGranted}
      />
    </>
  );
}
