import { Route, Routes } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { TagsPage } from "../Tags/TagsPage";
import { ProjectsPage } from "../Projects/ProjectsPage";
import { TimersPage } from "../Timers/TimersPage";
import { ProjectPage } from "../Projects/Project/ProjectPage";

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
              <ProjectsPage />
            </Header>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Header>
              <ProjectPage />
            </Header>
          }
        />
        <Route
          path="/tags"
          element={
            <Header>
              <TagsPage />
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
