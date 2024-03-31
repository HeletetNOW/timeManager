import { Route, Routes } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { TagList } from "../Tags/TagList";
import { ProjectList } from "../Projects/ProjectList";
import { TimersPage } from "../Timers/TimersPage";

export const MainPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header>Добро пожаловать.</Header>} />
        <Route path="/calendar" element={<Header>Каклендарь</Header>} />
        <Route
          path="/projects"
          element={
            <Header>
              <ProjectList />
            </Header>
          }
        />
        <Route
          path="/tags"
          element={
            <Header>
              <TagList />
            </Header>
          }
        />
        <Route
          path="/timers"
          element={
            <Header>
              <TimersPage />
            </Header>
          }
        />
        <Route path="/settings" element={<Header>Настройки</Header>} />
      </Routes>
    </div>
  );
};
