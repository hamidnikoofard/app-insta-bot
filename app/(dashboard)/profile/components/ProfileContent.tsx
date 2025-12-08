import { ProfileSettingsCard, ProfileSummaryCard } from './index';
function ProfileContent() {
  return (
    <div className="w-full space-y-6 mt-6 flex flex-col md:flex-row items-start justify-between gap-4">
      <ProfileSummaryCard />
      <ProfileSettingsCard />
    </div>
  );
}

export { ProfileContent };
