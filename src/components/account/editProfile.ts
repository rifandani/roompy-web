import { toast } from 'react-toastify';
// files
import { FireUser } from '../../utils/interfaces';
import { emailAuthProvider } from '../../configs/firebaseConfig';

export async function reauthenticate(
  user: FireUser,
  email: string,
  currentPassword: string,
) {
  // get the user credentials
  const credential = emailAuthProvider.credential(email, currentPassword);

  // check if user valid
  try {
    await user.reauthenticateWithCredential(credential);
    console.log('Reauthenticate success');
  } catch (err) {
    console.error('Reauthenticate error => ', err);
    return toast.error(err.message);
  }
}

export async function updateProfileItems(
  user: FireUser,
  name: string,
  email: string,
  newPassword: string,
) {
  try {
    // update user displayName, email, password
    await user.updateProfile({
      displayName: name,
    });
    await user.updateEmail(email);

    if (newPassword) {
      await user.updatePassword(newPassword);
    }
  } catch (err) {
    console.error('Update profile items error => ', err);
    return toast.error(err.message);
  }
}
