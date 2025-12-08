import { ProfileContent, ProfileHeader } from './components/index';

function page() {
  return (
    <div className="relative w-full min-h-[calc(100vh-12rem)] px-4 pb-8">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}

export default page;
