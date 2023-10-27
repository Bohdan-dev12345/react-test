import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { dateFormat } from "../../utils/format";
import { ITimeSheet } from "../../interfaces/ITimeSheet";

const TimeSheet: React.FC<{}> = () => {
  const { activeTimeSheets, activeUser } = useContext(UserContext);
  const [filteredSheets, setFilteredSheets] = useState<ITimeSheet[]>(activeTimeSheets);
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredSheets(activeTimeSheets);
  }, [activeTimeSheets]);

  const handleSelectMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMonth(value);

    if (value) {
      const filteredSheets = activeTimeSheets.filter((sheet) => {
        const sheetMonth = new Date(sheet.startTime).getMonth() + 1; // Months are 0-based
        return sheetMonth === Number(value);
      });
      setFilteredSheets(filteredSheets);
    } else {
      setFilteredSheets(activeTimeSheets);
    }
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <a className="btn btn-primary" href="/">Back</a>
        <select
          className="form-select mt-4 mb-4"
          aria-label="Default select example"
          value={selectedMonth}
          onChange={handleSelectMonthChange}
        >
          <option value="">Select a month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              {new Date(0, i).toLocaleString(undefined, { month: "short" })}
            </option>
          ))}
        </select>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Position</th>
              <th>Assessment</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSheets.map((timesheet) => (
              <tr key={timesheet.id}>
                <td>{`${activeUser?.firstName} ${activeUser?.lastName}`}</td>
                <td>{activeUser?.email}</td>
                <td>{activeUser?.position}</td>
                <td>{timesheet.assessment}</td>
                <td>{dateFormat(timesheet.startTime, "yyyy-MM-dd HH:mm:ss")}</td>
                <td>{dateFormat(timesheet.endTime, "yyyy-MM-dd HH:mm:ss")}</td>
                <td>{timesheet.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSheet;
