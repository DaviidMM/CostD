import { useState } from 'react';
import { toast } from 'react-toastify';
import useUserPrefs from '../../hooks/useUserPrefs';
import { updateUserPrefs } from '../../services/users';
import SettingCard from '../SettingCard';
import userPreferencesDict from '../../dict/userPreferences';

export default function UserPreferences() {
  const [userPrefs, setUserPref] = useUserPrefs();

  const handleUpdatePref = async ({ preference, value }) => {
    updateUserPrefs({ preference, value })
      .then((res) => {
        if (res.status === 200) toast.success('Preferencias actualizadas 👍');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error al actualizar preferencias');
      });
  };

  return (
    userPrefs !== null && (
      <div className="flex flex-col gap-4">
        {Object.keys(userPreferencesDict).map((pref) => {
          return (
            <SettingCard
              key={pref}
              description={userPreferencesDict[pref].description}
              handleSave={handleUpdatePref}
              preference={pref}
              setValue={setUserPref}
              title={userPreferencesDict[pref].title}
              type={userPreferencesDict[pref].type}
              value={userPrefs[pref] || false}
            />
          );
        })}
      </div>
    )
  );
}
