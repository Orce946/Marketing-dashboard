import { Routes, Route } from 'react-router-dom';
import SOLayout from './layouts/SOLayout';
import ManagerLayout from './layouts/ManagerLayout';
import SOHome from './pages/SO/SOHome';
import SOMap from './pages/SO/SOMap';
import SOAttendance from './pages/SO/SOAttendance';
import SOReports from './pages/SO/SOReports';
import SOTodo from './pages/SO/SOTodo';
import SOChatbot from './pages/SO/SOChatbot';
import SODealerInputs from './pages/SO/SODealerInputs';
import SOTaskCompletion from './pages/SO/SOTaskCompletion';
import ManagerHome from './pages/Manager/ManagerHome';
import ManagerLiveMap from './pages/Manager/ManagerLiveMap';
import ManagerExceptions from './pages/Manager/ManagerExceptions';
import ManagerReports from './pages/Manager/ManagerReports';
import ManagerTeam from './pages/Manager/ManagerTeam';
import ManagerSettings from './pages/Manager/ManagerSettings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SOLayout />}>
        <Route index element={<SOHome />} />
        <Route path="attendance" element={<SOAttendance />} />
        <Route path="todo" element={<SOTodo />} />
        <Route path="chatbot" element={<SOChatbot />} />
        <Route path="map" element={<SOMap />} />
        <Route path="reports" element={<SOReports />} />
        <Route path="dealers" element={<SODealerInputs />} />
        <Route path="task-complete" element={<SOTaskCompletion />} />
      </Route>
      <Route path="/manager" element={<ManagerLayout />}>
         <Route index element={<ManagerHome />} />
         <Route path="map" element={<ManagerLiveMap />} />
         <Route path="exceptions" element={<ManagerExceptions />} />
         <Route path="reports" element={<ManagerReports />} />
         <Route path="team" element={<ManagerTeam />} />
         <Route path="settings" element={<ManagerSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
