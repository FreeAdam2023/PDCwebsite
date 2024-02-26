import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Dropdown,
  TextArea,
  Checkbox,
  Grid,
} from "semantic-ui-react";
import axios from "axios";
import { Helmet } from "react-helmet";
import useReactRouter from "use-react-router";
import moment from "moment";
import { UserContext } from "../../../common/context/UserProvider";
import AdminSideBar from "../Admin Dashboard/AdminSideBar";

// import UploadFile from "./UploadFile";

const CreateEvent = (props) => {
  const [time, setTime] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
  });

  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [isOnline, setOnline] = useState(false);
  const { user } = userInfo;

  // project information
  const [event, setEvent] = useState({
    name: { html: "" },
    start: { timezone: "America/Toronto", utc: "" },
    end: { timezone: "America/Toronto", utc: "" },
    currency: "USD",
    online_event: false,
    description: { html: "" },
    logo_id: "108521843",
  });

  const timeOptions = [
    { key: "6am", text: "6:00 AM", value: "06:00:00" },
    { key: "6.30am", text: "6:30 AM", value: "06:30:00" },
    { key: "7am", text: "7:00 AM", value: "07:00:00" },
    { key: "7.30am", text: "7:30 AM", value: "07:30:00" },
    { key: "8am", text: "8:00 AM", value: "08:00:00" },
    { key: "8.30am", text: "8:30 AM", value: "08:30:00" },
    { key: "9am", text: "9:00 AM", value: "09:00:00" },
    { key: "9.30am", text: "9:30 AM", value: "09:30:00" },
    { key: "10am", text: "10:00 AM", value: "10:00:00" },
    { key: "10.30am", text: "10:30 AM", value: "10:30:00" },
    { key: "11am", text: "11:00 AM", value: "11:00:00" },
    { key: "11.30am", text: "11:30 AM", value: "11:30:00" },
    { key: "12pm", text: "12:00 PM", value: "12:00:00" },
    { key: "12.30pm", text: "12:30 PM", value: "12:30:00" },
    { key: "1pm", text: "1:00 PM", value: "13:00:00" },
    { key: "1.30pm", text: "1:30 PM", value: "13:30:00" },
    { key: "2pm", text: "2:00 PM", value: "14:00:00" },
    { key: "2.30pm", text: "2:30 PM", value: "14:30:00" },
    { key: "3pm", text: "3:00 PM", value: "15:00:00" },
    { key: "3.30pm", text: "3:30 PM", value: "15:30:00" },
    { key: "4pm", text: "4:00 PM", value: "16:00:00" },
    { key: "4.30pm", text: "4:30 PM", value: "16:30:00" },
    { key: "5pm", text: "5:00 PM", value: "17:00:00" },
    { key: "5.30pm", text: "5:30 PM", value: "17:30:00" },
    { key: "6pm", text: "6:00 PM", value: "18:00:00" },
    { key: "6.30pm", text: "6:30 PM", value: "18:30:00" },
    { key: "7pm", text: "7:00 PM", value: "19:00:00" },
    { key: "7.30pm", text: "7:30 PM", value: "19:30:00" },
    { key: "8pm", text: "8:00 PM", value: "20:00:00" },
    { key: "8.30pm", text: "8:30 PM", value: "20:30:00" },
    { key: "9pm", text: "9:00 PM", value: "21:00:00" },
    { key: "9.30pm", text: "9:30 PM", value: "21:30:00" },
    { key: "10pm", text: "10:00 PM", value: "22:00:00" },
    { key: "10.30pm", text: "10:30 PM", value: "22:30:00" },
    { key: "11pm", text: "11:00 PM", value: "23:00:00" },
    { key: "11.30pm", text: "11:30 PM", value: "23:30:00" },
  ];

  // handle dropdown category
  const handleStartTimeChange = (e, data) => {
    let localTime = time.startDate + "T" + data.value;
    let utcTime = moment(localTime).add(4, "hours").format();
    utcTime = utcTime.slice(0, 19);
    setTime({
      ...time,
      startTime: data.value,
    });
    setEvent({
      ...event,
      start: { timezone: "America/Toronto", utc: utcTime + "Z" },
    });
  };

  const handleEndTimeChange = (e, data) => {
    console.log(time.endDate);
    if (
      time.endDate < time.startDate ||
      (time.endDate == time.startDate && time.startTime > data.value)
    ) {
      alert("End time cannot before the start time!!");
      setTime({
        ...time,
        endDate: "",
      });
    }
    let localTime = time.endDate + "T" + data.value;
    let utcTime = moment(localTime).add(4, "hours").format();
    utcTime = utcTime.slice(0, 19);
    setEvent({
      ...event,
      end: { timezone: "America/Toronto", utc: utcTime + "Z" },
    });
  };

  const handleEndDateChange = (e, data) => {
    if (dates.endDate < dates.startDate) {
      alert("End Date cannot be before the start Date!!");
      setDates({
        ...dates,
        endDate: "",
      });
    }
  };

  const { history } = useReactRouter();
  // post project info to server
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const testdata = {
      event: event,
    };

    axios
      .post(
        "https://www.eventbriteapi.com/v3/organizations/464741062423/events/?token=2SWITQPH72SPNCSRK7OW",
        testdata
      )
      .then((response) => {
        const path = {
          pathname: "/create-ticket",
          state: [response.data.id, event],
        };
        console.log(response);
        alert("Your event is saved and please fill up ticket information");
        history.push(path);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // when click cancel, go back to the project list page
  const handleFormCancel = () => {
    props.history.push("/admin-dashboard");
  };

  // handle form field change
  const handleFormChange = ({ target: { name, value } }) => {
    if (name == "name" || name == "description") {
      setEvent({
        ...event,
        [name]: { html: value },
      });
    } else {
      setEvent({
        ...event,
        [name]: value,
      });
    }
  };

  const handleTimeChange = ({ target: { name, value } }) => {
    setTime({
      ...time,
      [name]: value,
    });
    console.log(name, value);
    if (name === "startDate") {
      let currentDate = new Date();
      // console.log("this is the startDate")
      if (
        value.slice(0, 4) < currentDate.getFullYear() ||
        (value.slice(0, 4) == currentDate.getFullYear() &&
          value.slice(5, 7) < currentDate.getMonth() + 1) ||
        (value.slice(0, 4) == currentDate.getFullYear() &&
          value.slice(5, 7) == currentDate.getMonth() + 1 &&
          value.slice(8, 10) < currentDate.getUTCDate())
      ) {
        alert("End Time cannot be before the Start Time!!");
        setTime({
          ...time,
          [name]: "",
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Event | Professional Development Club</title>
      </Helmet>
      <>
        {user && user.admin ? (
          <div className="admin-dashboard">
            <AdminSideBar />
            <div className="admin-home">
              <h3 className="admin-h3">
                Create New Event
              </h3>
              <Form onSubmit={handleFormSubmit} autoComplete="off">
                <Form.Field>
                  <label>Event title</label>
                  <input
                    name="name"
                    value={event.name.html}
                    onChange={handleFormChange}
                    placeholder="Event title"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <Grid style={{ paddindBottom: "10px" }}>
                    <Grid.Column width={8}>
                      <label>Event start date</label>
                      <input
                        name="startDate"
                        value={time.startDate}
                        onChange={handleTimeChange}
                        type="date"
                        placeholder="Start Date"
                        required
                      />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <label>Start time</label>
                      <Dropdown
                        id="selectStart"
                        onChange={handleStartTimeChange}
                        placeholder="select start time"
                        fluid
                        selection
                        options={timeOptions}
                        required
                      />
                    </Grid.Column>
                  </Grid>
                  <Grid>
                    <Grid.Column width={8}>
                      <label>Event end date</label>
                      <input
                        name="endDate"
                        value={time.endDate}
                        onChange={handleEndDateChange}
                        type="date"
                        placeholder="End Date"
                        required
                      />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <label>End time</label>
                      <Dropdown
                        name={"endTime"}
                        onChange={handleEndTimeChange}
                        placeholder="select end time"
                        fluid
                        selection
                        options={timeOptions}
                        required
                      />
                    </Grid.Column>
                  </Grid>
                </Form.Field>
                {/* <Form.Field>
          <label>Summary</label>
          <input
            name="summary"
            value={event.summary}
            onChange={handleFormChange}
            placeholder="Enter the Event summary"
          />
        </Form.Field> */}
                <Form.Field>
                  <Checkbox
                    onClick={() => setOnline(!isOnline)}
                    label="Set it as an online event"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Description</label>
                  <TextArea
                    name="description"
                    rows={3}
                    value={event.description.html}
                    onChange={handleFormChange}
                    placeholder="Enter description of the event"
                  />
                </Form.Field>
                <Button positive type="submit">
                  Save and continue
                  {/* {state ? "Update" : "Submit"} */}
                </Button>
                <Button onClick={handleFormCancel} type="button">
                  Cancel
                </Button>
              </Form>
            </div>
          </div>
        ) : (
          <>
            <center className="page-not-found"s>
              <h1>Oops, Page Not Found!</h1>
              <h3>Please login as an admin to view this page!</h3>
            </center>
          </>
        )}
      </>
    </>
  );
};

export default CreateEvent;
