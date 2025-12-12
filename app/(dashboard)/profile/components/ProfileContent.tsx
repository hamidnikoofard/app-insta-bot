import { ProfileSettingsCard, ProfileSummaryCard } from './index';
function ProfileContent() {
  return (
    <div className="w-full space-y-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      <ProfileSummaryCard />
      <ProfileSettingsCard />
    </div>
  );
}

export { ProfileContent };
