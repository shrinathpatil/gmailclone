import React from "react";
import "./Sidebar.css";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import NearMeIcon from "@mui/icons-material/NearMe";
import NoteIcon from "@mui/icons-material/Note";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarOption from "./SidebarOption";
import PersonIcon from "@mui/icons-material/Person";
import DuoIcon from "@mui/icons-material/Duo";
import PhoneIcon from "@mui/icons-material/Phone";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelected,
  openSendMessage,
  setSelectedSection,
} from "./features/mailSlice";
import { getMails, getSent } from "./features/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const mails = useSelector(getMails);
  const sentmails = useSelector(getSent);
  const selectedSection = useSelector(getSelected);

  console.log(selectedSection);
  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>
      <Link to="/">
        <SidebarOption
          selected={true}
          Icon={InboxIcon}
          title="Inbox"
          number={mails}
        />
      </Link>
      <SidebarOption Icon={StarIcon} title="Starred" number={mails} />
      <SidebarOption Icon={AccessTimeIcon} title="Snoozed" number={mails} />
      <SidebarOption
        Icon={LabelImportantIcon}
        title="Important"
        number={mails}
      />
      <Link to="/sentmail">
        <SidebarOption Icon={NearMeIcon} title="Sent" number={sentmails} />
      </Link>

      <SidebarOption Icon={NoteIcon} title="Drafts" number={mails} />
      <SidebarOption Icon={ExpandMoreIcon} title="More" number={mails} />

      <div className="sidebar-footer">
        <div className="sidebar-footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
