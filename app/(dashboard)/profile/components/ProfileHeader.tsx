import { User } from 'lucide-react';

function ProfileHeader() {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">پروفایل کاربری</h1>
          <p className="text-sm text-muted-foreground mt-1">
            مدیریت اطلاعات شخصی و تنظیمات حساب کاربری
          </p>
        </div>
      </div>
    </div>
  );
}

export { ProfileHeader };
