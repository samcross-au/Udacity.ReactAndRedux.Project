import TabbedList from "../components/TabbedList";

const Dashboard = ({ categories }) => {
  return (
    <div className="polls">
      <h3 className="center">Polls</h3>
      <TabbedList />
    </div>
  );
};


export default Dashboard;
