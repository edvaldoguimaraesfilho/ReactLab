import { ProfileCard } from "./components/ProfileCard";

import type { UserProfile } from "./models/UserProfile";

const user: UserProfile = {
  id: 1,
  name: "Edvaldo Guimaraes",
  role: "React Developer",
  email: "edvaldo@company.com",
  department: "Technology",
  status: "Online",
};

function App() {
  return (
    <div className="app-container">
      <ProfileCard user={user} />
    </div>
  );
}

export default App;