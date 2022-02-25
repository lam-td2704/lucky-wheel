import "./App.css";
import Homepage from "./pages/homepage/homepage.page";
import {
  Routes,
  Route,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";

import Header from "./components/header/header.component";
import SignInPage from "./pages/sign-in/sign-in.page.jsx";

const User = (props) => {
  const [search, setSearch] = useSearchParams();
  return (
    <div>
      <h1>User List {search.get("id")}</h1>
    </div>
  );
};

const UserDetail = (props) => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <h1>User Deital</h1>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
